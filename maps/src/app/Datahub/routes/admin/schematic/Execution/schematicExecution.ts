import {Component, OnInit, ViewChild, OnDestroy} from "@angular/core";
import {SchematicApiService} from '../schematicService';
import {SchematicPreview} from "../schematicpreview/schematicpreview";
import {signalr, connectionMsg} from '../../../../services/signalr';
import {TypeAhead} from "../../../../../ReusableComponents/typeahead/typeahead";
import {AlertService} from "../../../../../ReusableServices/alertService";
import {Pipeline, Schematic} from './executionUtils';
import {ExecutionDialogService} from './executionDialogService';
import {Subscription}   from 'rxjs/Subscription';
import {InterFormsService} from "../../../../../ReusableServices/interFormsService";

@Component({
    template: require('./schematicExecution.html'),
    providers: [SchematicApiService, signalr, ExecutionDialogService]
})
export class SchematicExecution implements OnInit, OnDestroy {
    connectionStatus: string = "connecting to server";
    allSchematics: Array<any>;
    allPipelines: Array<any>;
    autocompleteInput: any;
    pageContentType: string = "schematic";
    hasContent: boolean = false;
    selectedPipeline: Pipeline = new Pipeline(null, null);
    selectedSchematic: Schematic = new Schematic(null, null);
    executeStatus: boolean = true;
    allMessages: Array<any> = [];
    signalRSubscription: Subscription;
    msgSubscription: Subscription;
    runtimeValue: Subscription;
    executionStatusMsg: string = '';
    isExecuting: boolean = false;

    @ViewChild(SchematicPreview)
    private schematicPreview: SchematicPreview;
    @ViewChild(TypeAhead)
    private typeAhead: TypeAhead;


    constructor(private processApi: SchematicApiService, private signalr: signalr, private alert: AlertService, private channelService: ExecutionDialogService, private intFormSvc: InterFormsService) {
        let self = this;
        self.msgSubscription = channelService.sendExecutionMessage$.subscribe(answer => {
            if (!answer.hasOwnProperty('lastMsg')) {
                answer.forEach(x => {
                    if (self.allMessages.indexOf(x) == -1) {
                        self.allMessages.push(x);
                    }
                    ;
                })
            } else {
                //   self.alert.error(answer.lastMsg);
                self.intFormSvc.stopSpinner();
                self.executionStatusMsg = answer.lastMsg;
                self.isExecuting = false;
            }
        });

        self.runtimeValue = channelService.schematicRuntimeValue$.subscribe(answer => {
            self.execute(answer);
        })
    }

    ngOnInit() {
        let self = this;
        self.autocompleteInput = new Object();
        self.autocompleteInput.searchPipelineAndSchematics = this.searchPipelineAndSchematics();
        self.signalrDialogChannel();
    }

    ngOnDestroy() {
        this.signalr = null;
        this.signalRSubscription.unsubscribe();
        this.msgSubscription.unsubscribe();
    }

    signalrDialogChannel() {
        this.signalRSubscription = this.signalr.connectionEstablished.subscribe(data => {
            this.showConnectionStatus(data);
        });
    }

    showConnectionStatus(data: connectionMsg) {
        let msg;
        if (data.connectionID.length > 0) {
            msg = "Connection established, connection id " + data.connectionID;
            this.executeStatus = true;
        } else {
            msg = "Connection failed, " + data.message;
            this.executeStatus = false;
        }
        this.connectionStatus = msg;
    }

    searchPipelineAndSchematics() {
        let self = this;
        return (filter: string): Promise<Array<{id: string, text: string}>> => {
            return new Promise<Array<{id: string, text: string}>>((resolve, reject) => {
                self.hasContent = false;
                if (self.pageContentType === 'schematic') {
                    let schematicsSubscription = self.processApi.getallSchematics().subscribe(
                        res => {
                            self.allSchematics = res;
                            let outputList = new Array<any>();
                            self.allSchematics.forEach(function (x) {
                                if (x.LookupKey.toUpperCase().indexOf(filter.toUpperCase()) > -1 || x.SchematicId == filter || filter.trim() === '')
                                    outputList.push({
                                        'id': x.SchematicId,
                                        'text': x.LookupKey,
                                        'type': self.pageContentType
                                    })
                            });
                            resolve(outputList);
                            schematicsSubscription.unsubscribe();
                        },
                        err => console.log("Error in search schematics", err)
                    );
                } else {
                    let pipelinesSubscription = self.processApi.getallPipelines().subscribe(
                        res => {
                            self.allPipelines = res;
                            let outputList = new Array<any>();
                            self.allPipelines.forEach(function (x) {
                                if (x.LookupKey.toUpperCase().indexOf(filter.toUpperCase()) > -1 || x.PipelineId == filter || filter.trim() === '')
                                    outputList.push({
                                        'id': x.PipelineId,
                                        'text': x.LookupKey,
                                        'type': self.pageContentType
                                    })
                            });
                            resolve(outputList);
                            pipelinesSubscription.unsubscribe();

                        },
                        err => console.log("Error in search schematics", err)
                    );
                }
            });
        };
    }

    public onObjectContentSelected(contentObj: any) {
        let self = this;
        self.allMessages = [];
        self.hasContent = true;
        if (contentObj.type === 'schematic') {
            this.selectedSchematic = new Schematic(contentObj.id);
            //     self.schematicPreview.populateWithSchematicDetails(contentObj.id, true);
        } else {
            self.selectedPipeline = new Pipeline(contentObj.id, contentObj.text);
            self.getSchematicsForPipelineById(contentObj.id);
        }

    }

    public resetSearch() {
        let self = this;
        self.hasContent = false;
        self.intFormSvc.stopSpinner();
        self.isExecuting = false;
        self.executionStatusMsg = '';
        self.allMessages = [];
        self.typeAhead.reset();
        if (self.pageContentType === 'schematic') {
            self.selectedSchematic = new Schematic();
        } else {
            self.selectedPipeline = new Pipeline();
        }
    }

    getSchematicsForPipelineById(pipeLineId: string) {
        let self = this;
        let subscription = self.processApi.getSchematicsForPipelineById(pipeLineId).subscribe(
            res => {
                res.forEach(function (x) {
                    let pipeLineSchematic = new Schematic(x.Id, x.PipelineId, x.SchematicId, x.SequenceNumber);
                    self.selectedPipeline.schematics.push(pipeLineSchematic);

                });

                subscription.unsubscribe();
            },
            err => console.log("Error getting pipelineschematics for pipelind ID :" + pipeLineId, err)
        );
    }

    callForExecute() {
        let self = this;
        self.isExecuting = true;
        self.executionStatusMsg = "Running..."
        self.intFormSvc.startSpinner('page', 'Executing schematic ' + self.selectedSchematic.id + '...');
        self.allMessages = [];
        self.selectedPipeline.pipelineRuntimeValue = '';
        self.selectedPipeline.idForSchematics = [];
        self.selectedPipeline.schematics.forEach(x => self.selectedPipeline.idForSchematics.push(x.id));
        self.channelService.askForSchematicsRuntimeValue$.emit(true);
    }

    execute(obj: any) {
        let self = this;
        if (self.pageContentType === 'schematic') {
            self.signalr.executeSchematic(self.selectedSchematic.id, obj.runtimeValue);
        } else {
            self.selectedPipeline.pipelineRuntimeValue += '"' + obj.id + '":' + obj.runtimeValue + ',';
            let idToRemove = self.selectedPipeline.idForSchematics.find(x => x == obj.id);
            if (idToRemove) {
                self.selectedPipeline.idForSchematics.splice(self.selectedPipeline.idForSchematics.indexOf(idToRemove), 1)
            }
            if (self.selectedPipeline.idForSchematics.length == 0) {
                let runtimeVal = '{' + self.selectedPipeline.pipelineRuntimeValue.slice(0, self.selectedPipeline.pipelineRuntimeValue.length - 1) + '}'
                //let runtimeVal = self.selectedPipeline.pipelineRuntimeValue.slice(0, self.selectedPipeline.pipelineRuntimeValue.length - 1);
                self.signalr.executePipeline(self.selectedPipeline.id, runtimeVal);
            }
        }

    }

    configToggle(toggleTo: boolean) {
        this.channelService.configToggle$.emit(toggleTo)
    }

    messageToggle(toggleTo: boolean) {
        this.channelService.messageToggle$.emit(toggleTo);
    }

}