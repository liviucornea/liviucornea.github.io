import {Component, OnInit} from "@angular/core";
import {SchematicApiService} from "../schematicService";
import {AlertService} from "../../../../../ReusableServices/alertService";
import {Pipeline, Schematic, PipelineSchematic, sortById} from './pipeLineUtils';
import {Observable}   from 'rxjs/Observable';
import { Router } from '@angular/router';
import {SchematicFilter} from './Schematics.pipe'

@Component({
    template: require('./pipeLineDesigner.html'),
})

export class PipeLineDesigner implements OnInit {
    public status:string = 'editing';
    private allSchematics:Schematic[] = [];
    public allSchematicsForUI:Schematic[] = [];
    public currentPipeLine:Pipeline;
    public hasPipeline:boolean = false;
    public autocompleteInput:any;
    public allPipelines:Array<any>

    constructor(private processService:SchematicApiService, private alert:AlertService, private router: Router) {
        this.autocompleteInput = new Object();
        this.autocompleteInput.searchPipelines = this.searchPipeLines();
    }

    ngOnInit() {
        var self = this;
        self.hasPipeline = false;
        this.getAllSchematics();
    }

    navigateToSchematic(id: string) {
        this.router.navigate(['Datahub/Admin/Schematic/SchematicDesigner', {'id':id}]);
    }


    insertSchematicIntoPipeLine(schematic:Schematic) {
        var self = this;
        let pipeLineSchematic = new PipelineSchematic(self.currentPipeLine.pipelineId, schematic.id);
        pipeLineSchematic.description = schematic.description;
        pipeLineSchematic.stopPipelineOnFailure = true;
        pipeLineSchematic.sequenceNumber = (self.currentPipeLine.pipeLineSchematics.length + 1).toString();
        self.currentPipeLine.pipeLineSchematics.push(pipeLineSchematic);
    }

    getAllSchematics() {
        var self = this;
        let subscription = self.processService.getallSchematics().subscribe(
            res => {
                res.forEach(function (x) {
                    let schematicForList = new Schematic(x.SchematicId, x.LookupKey)
                    self.allSchematics.push(schematicForList);
                });
                self.allSchematics.sort(sortById);
                self.allSchematicsForUI = [...self.allSchematics];
                subscription.unsubscribe();

            },
            err => console.log("Error in search schematics", err)
        );
    }

    doSave(pipeline:Pipeline) {
        var self = this;
        let allRequired = true;
        if (pipeline.description.length == 0) {
            self.alert.error('You must enter pipeline description in order to save it!');
            allRequired = false;
        }
        if (pipeline.pipeLineSchematics.length == 0) {
            self.alert.error('Pipeline must have at least one shematic!');
            allRequired = false;
        }
        if (!allRequired) {
            return;
        }
        var pipelineForAPI = {
            'IsActive': pipeline.isActive ? 1 : 0,
            'LookupKey': pipeline.description,
            'PipelineId': pipeline.pipelineId, 'VersionStamp': pipeline.VersionStamp
        };

        if (pipeline.isNew) {
            // insert
            self.processService.createPipeline(pipelineForAPI).flatMap(data => {
                return self.processService.getPipelineByDescription(pipeline.description);
            }).subscribe(
                res => {
                    pipeline.pipeLineSchematics.forEach(x => {
                        x.pipeLineId = res.PipelineId;
                    });
                    pipeline.pipelineId = res.PipelineId;
                    pipeline.VersionStamp = res.VersionStamp;
                    self.savePipeLineSchematicsByPipeline(pipeline);
                }
                , error => {
                    self.alert.error('Error when saving NEW pipeline #:' + pipeline.description + ' -  ' + error.status);
                });
        } else { // when you update schematic
            self.processService.updatePipeline(pipelineForAPI, "PipelineId").subscribe(
                res => {
                    // save the childrens (schematics)
                    self.savePipeLineSchematicsByPipeline(pipeline);
                }
                , error => {
                    self.alert.error('Error when saving pipeline #:' + pipeline.pipelineId + ' -  ' + error.status);
                });


        }

    }

    savePipeLineSchematicsByPipeline(pipeline:Pipeline) {
        var self = this;
        var pipeLineSchematics = pipeline.pipeLineSchematics;
        var schematicsToBeUpdated = [];
        var schematicsToBeInserted = [];
        var schematicsToBeDeleted = [];
        pipeline.pipeLineSchematicsAPI.forEach((x)=> {
            let objFounded = pipeLineSchematics.find(y => {
                return y.id === x.Id && y.schematicId == x.SchematicId
            });
            if (!objFounded) {
                schematicsToBeDeleted.push(x);
            }
        })
        pipeLineSchematics.forEach((schematic) => {
            // if schematic id than you do update
            if (schematic.id) {
                let schematicObj = pipeline.pipeLineSchematicsAPI.find((x)=> x.SchematicId == schematic.schematicId && x.Id == schematic.id);
                if (schematicObj) {
                    schematicObj.SequenceNumber = schematic.sequenceNumber;
                    schematicObj.StopPipelineOnFailure = schematic.stopPipelineOnFailure ? 1 : 0;
                    schematicObj.IsActive = schematic.isActive ? 1 : 0;
                    schematicsToBeUpdated.push(schematicObj);
                }
            } else {
                let newSchematicObj = {
                    IsActive: schematic.isActive ? 1 : 0,
                    PipelineId: schematic.pipeLineId,
                    SchematicId: schematic.schematicId,
                    SequenceNumber: schematic.sequenceNumber,
                    StopPipelineOnFailure: schematic.stopPipelineOnFailure ? 1 : 0
                };
                schematicsToBeInserted.push(newSchematicObj);
            }
        });

        var subscription = Observable.forkJoin(self.processService.updateMultiplePipelineSchematics(schematicsToBeUpdated), self.processService.insertMultiplePipelineSchematics(schematicsToBeInserted),
            self.processService.deleteMultiplePipelineSchematics(schematicsToBeDeleted)).subscribe(
            res => {
                // do refresh if all went well
                self.onPipeLineSelected({
                    id: pipeline.pipelineId,
                    text: pipeline.description,
                    isActive: pipeline.isActive,
                    VersionStamp: pipeline.VersionStamp
                });
                self.alert.addAlert("Pipeline has been been saved!");
                subscription.unsubscribe();
            }
            , error => {
                self.alert.error('Error when saving pipeline #:' + pipeline.pipelineId + ' -  ' + error.status);
                subscription.unsubscribe();
            });

    }

    removePipeLineSchematic(pipeLineSchematic:PipelineSchematic, currentPipeLine:Pipeline) {
        var self = this;
        currentPipeLine.pipeLineSchematics.splice(currentPipeLine.pipeLineSchematics.indexOf(pipeLineSchematic), 1);
        self.reindexSequenceNbr(currentPipeLine.pipeLineSchematics);
    }

    newPipeline() {
        var self = this;
        self.currentPipeLine = new Pipeline('0', '', false);
        self.currentPipeLine.isNew = true;
        self.currentPipeLine.isActive = true;
        self.hasPipeline = true;
    }

    cancel() {
        var self = this;
        self.hasPipeline = false;
    }

    searchPipeLines() {
        return (filter:string):Promise<Array<{ id:string, text:string }>> => {
            return new Promise<Array<{ id:string, text:string }>>((resolve, reject) => {
                let subscription = this.processService.getallPipelines().subscribe(
                    res => {
                        this.allPipelines = res;
                        let outputList = new Array<any>();
                        this.allPipelines.forEach(function (x) {
                            if (x.LookupKey.toUpperCase().indexOf(filter.toUpperCase()) > -1 || x.PipelineId == filter || filter.trim() === '')
                                outputList.push({
                                    'id': x.PipelineId,
                                    'text': x.LookupKey,
                                    'isActive': x.IsActive,
                                    'VersionStamp': x.VersionStamp
                                })
                        });
                        resolve(outputList);
                        subscription.unsubscribe();

                    },
                    err => console.log("Error in pipline search", err)
                );
            });
        };
    }

    onPipeLineSelected(pipeLineObj:any) {
        var self = this;
        let pipeLineId = pipeLineObj.id;
        self.currentPipeLine = new Pipeline(pipeLineObj.id, pipeLineObj.text, pipeLineObj.isActive);
        self.currentPipeLine.VersionStamp = pipeLineObj.VersionStamp;
        self.getSchematicsForPipelineById(pipeLineId);
        self.hasPipeline = true;
    }

    getSchematicsForPipelineById(pipeLineId:string) {
        var self = this;
        let subscription = this.processService.getSchematicsForPipelineById(pipeLineId).subscribe(
            res => {
                var pipeLineSchematics = new Array<PipelineSchematic>();
                res.forEach(function (x) {
                    let pipeLineSchematic = new PipelineSchematic(x.PipelineId, x.SchematicId);
                    pipeLineSchematic.isActive = x.IsActive;
                    pipeLineSchematic.sequenceNumber = x.SequenceNumber;
                    pipeLineSchematic.stopPipelineOnFailure = x.StopPipelineOnFailure;
                    pipeLineSchematic.id = x.Id;
                    // bellow code is getting description of schematic but it is wrong approach, it should come from API.....
                    self.allSchematics.find((s)=> {
                        if (s.id == pipeLineSchematic.schematicId) {
                            pipeLineSchematic.description = s.description;
                            return true;
                        } else {
                            return false;
                        }
                    })
                    pipeLineSchematics.push(pipeLineSchematic);
                });
                self.currentPipeLine.pipeLineSchematics = pipeLineSchematics;
                self.currentPipeLine.pipeLineSchematicsAPI = res;
                subscription.unsubscribe();
            },
            err => console.log("Error getting pipelineschematics for pipelind ID :" + pipeLineId, err)
        );
    }

    moveRow(schematic:PipelineSchematic, table:Array<PipelineSchematic>, direction:string) {
        var self = this;
        self.moveItemInArray(table, schematic, direction);
        self.reindexSequenceNbr(table);
    }

    moveItemInArray(arr:Array<PipelineSchematic>, item:PipelineSchematic, direction:string) {
        var position = arr.indexOf(item);
        if (direction === 'up' && arr[position - 1]) {
            arr[position - 1] = [arr[position], arr[position] = arr[position - 1]][0];
        }
        if (direction === 'down' && arr[position + 1]) {
            arr[position + 1] = [arr[position], arr[position] = arr[position + 1]][0];
        }
    }

    reindexSequenceNbr(arr:Array<PipelineSchematic>) {
        arr.forEach(x => x.sequenceNumber = (arr.indexOf(x) + 1).toString());
    }
}