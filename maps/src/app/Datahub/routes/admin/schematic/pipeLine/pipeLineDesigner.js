"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var schematicService_1 = require("../schematicService");
var alertService_1 = require("../../../../../ReusableServices/alertService");
var pipeLineUtils_1 = require('./pipeLineUtils');
var Observable_1 = require('rxjs/Observable');
var router_1 = require('@angular/router');
var PipeLineDesigner = (function () {
    function PipeLineDesigner(processService, alert, router) {
        this.processService = processService;
        this.alert = alert;
        this.router = router;
        this.status = 'editing';
        this.allSchematics = [];
        this.allSchematicsForUI = [];
        this.hasPipeline = false;
        this.autocompleteInput = new Object();
        this.autocompleteInput.searchPipelines = this.searchPipeLines();
    }
    PipeLineDesigner.prototype.ngOnInit = function () {
        var self = this;
        self.hasPipeline = false;
        this.getAllSchematics();
    };
    PipeLineDesigner.prototype.navigateToSchematic = function (id) {
        this.router.navigate(['Datahub/Admin/Schematic/SchematicDesigner', { 'id': id }]);
    };
    PipeLineDesigner.prototype.insertSchematicIntoPipeLine = function (schematic) {
        var self = this;
        var pipeLineSchematic = new pipeLineUtils_1.PipelineSchematic(self.currentPipeLine.pipelineId, schematic.id);
        pipeLineSchematic.description = schematic.description;
        pipeLineSchematic.stopPipelineOnFailure = true;
        pipeLineSchematic.sequenceNumber = (self.currentPipeLine.pipeLineSchematics.length + 1).toString();
        self.currentPipeLine.pipeLineSchematics.push(pipeLineSchematic);
    };
    PipeLineDesigner.prototype.getAllSchematics = function () {
        var self = this;
        var subscription = self.processService.getallSchematics().subscribe(function (res) {
            res.forEach(function (x) {
                var schematicForList = new pipeLineUtils_1.Schematic(x.SchematicId, x.LookupKey);
                self.allSchematics.push(schematicForList);
            });
            self.allSchematics.sort(pipeLineUtils_1.sortById);
            self.allSchematicsForUI = self.allSchematics.slice();
            subscription.unsubscribe();
        }, function (err) { return console.log("Error in search schematics", err); });
    };
    PipeLineDesigner.prototype.doSave = function (pipeline) {
        var self = this;
        var allRequired = true;
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
            self.processService.createPipeline(pipelineForAPI).flatMap(function (data) {
                return self.processService.getPipelineByDescription(pipeline.description);
            }).subscribe(function (res) {
                pipeline.pipeLineSchematics.forEach(function (x) {
                    x.pipeLineId = res.PipelineId;
                });
                pipeline.pipelineId = res.PipelineId;
                pipeline.VersionStamp = res.VersionStamp;
                self.savePipeLineSchematicsByPipeline(pipeline);
            }, function (error) {
                self.alert.error('Error when saving NEW pipeline #:' + pipeline.description + ' -  ' + error.status);
            });
        }
        else {
            self.processService.updatePipeline(pipelineForAPI, "PipelineId").subscribe(function (res) {
                // save the childrens (schematics)
                self.savePipeLineSchematicsByPipeline(pipeline);
            }, function (error) {
                self.alert.error('Error when saving pipeline #:' + pipeline.pipelineId + ' -  ' + error.status);
            });
        }
    };
    PipeLineDesigner.prototype.savePipeLineSchematicsByPipeline = function (pipeline) {
        var self = this;
        var pipeLineSchematics = pipeline.pipeLineSchematics;
        var schematicsToBeUpdated = [];
        var schematicsToBeInserted = [];
        var schematicsToBeDeleted = [];
        pipeline.pipeLineSchematicsAPI.forEach(function (x) {
            var objFounded = pipeLineSchematics.find(function (y) {
                return y.id === x.Id && y.schematicId == x.SchematicId;
            });
            if (!objFounded) {
                schematicsToBeDeleted.push(x);
            }
        });
        pipeLineSchematics.forEach(function (schematic) {
            // if schematic id than you do update
            if (schematic.id) {
                var schematicObj = pipeline.pipeLineSchematicsAPI.find(function (x) { return x.SchematicId == schematic.schematicId && x.Id == schematic.id; });
                if (schematicObj) {
                    schematicObj.SequenceNumber = schematic.sequenceNumber;
                    schematicObj.StopPipelineOnFailure = schematic.stopPipelineOnFailure ? 1 : 0;
                    schematicObj.IsActive = schematic.isActive ? 1 : 0;
                    schematicsToBeUpdated.push(schematicObj);
                }
            }
            else {
                var newSchematicObj = {
                    IsActive: schematic.isActive ? 1 : 0,
                    PipelineId: schematic.pipeLineId,
                    SchematicId: schematic.schematicId,
                    SequenceNumber: schematic.sequenceNumber,
                    StopPipelineOnFailure: schematic.stopPipelineOnFailure ? 1 : 0
                };
                schematicsToBeInserted.push(newSchematicObj);
            }
        });
        var subscription = Observable_1.Observable.forkJoin(self.processService.updateMultiplePipelineSchematics(schematicsToBeUpdated), self.processService.insertMultiplePipelineSchematics(schematicsToBeInserted), self.processService.deleteMultiplePipelineSchematics(schematicsToBeDeleted)).subscribe(function (res) {
            // do refresh if all went well
            self.onPipeLineSelected({
                id: pipeline.pipelineId,
                text: pipeline.description,
                isActive: pipeline.isActive,
                VersionStamp: pipeline.VersionStamp
            });
            self.alert.addAlert("Pipeline has been been saved!");
            subscription.unsubscribe();
        }, function (error) {
            self.alert.error('Error when saving pipeline #:' + pipeline.pipelineId + ' -  ' + error.status);
            subscription.unsubscribe();
        });
    };
    PipeLineDesigner.prototype.removePipeLineSchematic = function (pipeLineSchematic, currentPipeLine) {
        var self = this;
        currentPipeLine.pipeLineSchematics.splice(currentPipeLine.pipeLineSchematics.indexOf(pipeLineSchematic), 1);
        self.reindexSequenceNbr(currentPipeLine.pipeLineSchematics);
    };
    PipeLineDesigner.prototype.newPipeline = function () {
        var self = this;
        self.currentPipeLine = new pipeLineUtils_1.Pipeline('0', '', false);
        self.currentPipeLine.isNew = true;
        self.currentPipeLine.isActive = true;
        self.hasPipeline = true;
    };
    PipeLineDesigner.prototype.cancel = function () {
        var self = this;
        self.hasPipeline = false;
    };
    PipeLineDesigner.prototype.searchPipeLines = function () {
        var _this = this;
        return function (filter) {
            return new Promise(function (resolve, reject) {
                var subscription = _this.processService.getallPipelines().subscribe(function (res) {
                    _this.allPipelines = res;
                    var outputList = new Array();
                    _this.allPipelines.forEach(function (x) {
                        if (x.LookupKey.toUpperCase().indexOf(filter.toUpperCase()) > -1 || x.PipelineId == filter || filter.trim() === '')
                            outputList.push({
                                'id': x.PipelineId,
                                'text': x.LookupKey,
                                'isActive': x.IsActive,
                                'VersionStamp': x.VersionStamp
                            });
                    });
                    resolve(outputList);
                    subscription.unsubscribe();
                }, function (err) { return console.log("Error in pipline search", err); });
            });
        };
    };
    PipeLineDesigner.prototype.onPipeLineSelected = function (pipeLineObj) {
        var self = this;
        var pipeLineId = pipeLineObj.id;
        self.currentPipeLine = new pipeLineUtils_1.Pipeline(pipeLineObj.id, pipeLineObj.text, pipeLineObj.isActive);
        self.currentPipeLine.VersionStamp = pipeLineObj.VersionStamp;
        self.getSchematicsForPipelineById(pipeLineId);
        self.hasPipeline = true;
    };
    PipeLineDesigner.prototype.getSchematicsForPipelineById = function (pipeLineId) {
        var self = this;
        var subscription = this.processService.getSchematicsForPipelineById(pipeLineId).subscribe(function (res) {
            var pipeLineSchematics = new Array();
            res.forEach(function (x) {
                var pipeLineSchematic = new pipeLineUtils_1.PipelineSchematic(x.PipelineId, x.SchematicId);
                pipeLineSchematic.isActive = x.IsActive;
                pipeLineSchematic.sequenceNumber = x.SequenceNumber;
                pipeLineSchematic.stopPipelineOnFailure = x.StopPipelineOnFailure;
                pipeLineSchematic.id = x.Id;
                // bellow code is getting description of schematic but it is wrong approach, it should come from API.....
                self.allSchematics.find(function (s) {
                    if (s.id == pipeLineSchematic.schematicId) {
                        pipeLineSchematic.description = s.description;
                        return true;
                    }
                    else {
                        return false;
                    }
                });
                pipeLineSchematics.push(pipeLineSchematic);
            });
            self.currentPipeLine.pipeLineSchematics = pipeLineSchematics;
            self.currentPipeLine.pipeLineSchematicsAPI = res;
            subscription.unsubscribe();
        }, function (err) { return console.log("Error getting pipelineschematics for pipelind ID :" + pipeLineId, err); });
    };
    PipeLineDesigner.prototype.moveRow = function (schematic, table, direction) {
        var self = this;
        self.moveItemInArray(table, schematic, direction);
        self.reindexSequenceNbr(table);
    };
    PipeLineDesigner.prototype.moveItemInArray = function (arr, item, direction) {
        var position = arr.indexOf(item);
        if (direction === 'up' && arr[position - 1]) {
            arr[position - 1] = [arr[position], arr[position] = arr[position - 1]][0];
        }
        if (direction === 'down' && arr[position + 1]) {
            arr[position + 1] = [arr[position], arr[position] = arr[position + 1]][0];
        }
    };
    PipeLineDesigner.prototype.reindexSequenceNbr = function (arr) {
        arr.forEach(function (x) { return x.sequenceNumber = (arr.indexOf(x) + 1).toString(); });
    };
    PipeLineDesigner = __decorate([
        core_1.Component({
            template: require('./pipeLineDesigner.html'),
        }), 
        __metadata('design:paramtypes', [schematicService_1.SchematicApiService, alertService_1.AlertService, router_1.Router])
    ], PipeLineDesigner);
    return PipeLineDesigner;
}());
exports.PipeLineDesigner = PipeLineDesigner;
//# sourceMappingURL=pipeLineDesigner.js.map