"use strict";
var core_1 = require("@angular/core");
var schematicService_1 = require('../schematicService');
var schematicpreview_1 = require("../schematicpreview/schematicpreview");
var signalr_1 = require('../../../../services/signalr');
var typeahead_1 = require("../../../../../ReusableComponents/typeahead/typeahead");
var alertService_1 = require("../../../../../ReusableServices/alertService");
var executionUtils_1 = require('./executionUtils');
var executionDialogService_1 = require('./executionDialogService');
var interFormsService_1 = require("../../../../../ReusableServices/interFormsService");
var SchematicExecution = (function () {
    function SchematicExecution(processApi, signalr, alert, channelService, intFormSvc) {
        this.processApi = processApi;
        this.signalr = signalr;
        this.alert = alert;
        this.channelService = channelService;
        this.intFormSvc = intFormSvc;
        this.connectionStatus = "connecting to server";
        this.pageContentType = "schematic";
        this.hasContent = false;
        this.selectedPipeline = new executionUtils_1.Pipeline(null, null);
        this.selectedSchematic = new executionUtils_1.Schematic(null, null);
        this.executeStatus = true;
        this.allMessages = [];
        this.executionStatusMsg = '';
        this.isExecuting = false;
        var self = this;
        self.msgSubscription = channelService.sendExecutionMessage$.subscribe(function (answer) {
            if (!answer.hasOwnProperty('lastMsg')) {
                answer.forEach(function (x) {
                    if (self.allMessages.indexOf(x) == -1) {
                        self.allMessages.push(x);
                    }
                    ;
                });
            }
            else {
                //   self.alert.error(answer.lastMsg);
                self.intFormSvc.stopSpinner();
                self.executionStatusMsg = answer.lastMsg;
                self.isExecuting = false;
            }
        });
        self.runtimeValue = channelService.schematicRuntimeValue$.subscribe(function (answer) {
            self.execute(answer);
        });
    }
    SchematicExecution.prototype.ngOnInit = function () {
        var self = this;
        self.autocompleteInput = new Object();
        self.autocompleteInput.searchPipelineAndSchematics = this.searchPipelineAndSchematics();
        self.signalrDialogChannel();
    };
    SchematicExecution.prototype.ngOnDestroy = function () {
        this.signalr = null;
        this.signalRSubscription.unsubscribe();
        this.msgSubscription.unsubscribe();
    };
    SchematicExecution.prototype.signalrDialogChannel = function () {
        var _this = this;
        this.signalRSubscription = this.signalr.connectionEstablished.subscribe(function (data) {
            _this.showConnectionStatus(data);
        });
    };
    SchematicExecution.prototype.showConnectionStatus = function (data) {
        var msg;
        if (data.connectionID.length > 0) {
            msg = "Connection established, connection id " + data.connectionID;
            this.executeStatus = true;
        }
        else {
            msg = "Connection failed, " + data.message;
            this.executeStatus = false;
        }
        this.connectionStatus = msg;
    };
    SchematicExecution.prototype.searchPipelineAndSchematics = function () {
        var self = this;
        return function (filter) {
            return new Promise(function (resolve, reject) {
                self.hasContent = false;
                if (self.pageContentType === 'schematic') {
                    var schematicsSubscription_1 = self.processApi.getallSchematics().subscribe(function (res) {
                        self.allSchematics = res;
                        var outputList = new Array();
                        self.allSchematics.forEach(function (x) {
                            if (x.LookupKey.toUpperCase().indexOf(filter.toUpperCase()) > -1 || x.SchematicId == filter || filter.trim() === '')
                                outputList.push({
                                    'id': x.SchematicId,
                                    'text': x.LookupKey,
                                    'type': self.pageContentType
                                });
                        });
                        resolve(outputList);
                        schematicsSubscription_1.unsubscribe();
                    }, function (err) { return console.log("Error in search schematics", err); });
                }
                else {
                    var pipelinesSubscription_1 = self.processApi.getallPipelines().subscribe(function (res) {
                        self.allPipelines = res;
                        var outputList = new Array();
                        self.allPipelines.forEach(function (x) {
                            if (x.LookupKey.toUpperCase().indexOf(filter.toUpperCase()) > -1 || x.PipelineId == filter || filter.trim() === '')
                                outputList.push({
                                    'id': x.PipelineId,
                                    'text': x.LookupKey,
                                    'type': self.pageContentType
                                });
                        });
                        resolve(outputList);
                        pipelinesSubscription_1.unsubscribe();
                    }, function (err) { return console.log("Error in search schematics", err); });
                }
            });
        };
    };
    SchematicExecution.prototype.onObjectContentSelected = function (contentObj) {
        var self = this;
        self.allMessages = [];
        self.hasContent = true;
        if (contentObj.type === 'schematic') {
            this.selectedSchematic = new executionUtils_1.Schematic(contentObj.id);
        }
        else {
            self.selectedPipeline = new executionUtils_1.Pipeline(contentObj.id, contentObj.text);
            self.getSchematicsForPipelineById(contentObj.id);
        }
    };
    SchematicExecution.prototype.resetSearch = function () {
        var self = this;
        self.hasContent = false;
        self.intFormSvc.stopSpinner();
        self.isExecuting = false;
        self.executionStatusMsg = '';
        self.allMessages = [];
        self.typeAhead.reset();
        if (self.pageContentType === 'schematic') {
            self.selectedSchematic = new executionUtils_1.Schematic();
        }
        else {
            self.selectedPipeline = new executionUtils_1.Pipeline();
        }
    };
    SchematicExecution.prototype.getSchematicsForPipelineById = function (pipeLineId) {
        var self = this;
        var subscription = self.processApi.getSchematicsForPipelineById(pipeLineId).subscribe(function (res) {
            res.forEach(function (x) {
                var pipeLineSchematic = new executionUtils_1.Schematic(x.Id, x.PipelineId, x.SchematicId, x.SequenceNumber);
                self.selectedPipeline.schematics.push(pipeLineSchematic);
            });
            subscription.unsubscribe();
        }, function (err) { return console.log("Error getting pipelineschematics for pipelind ID :" + pipeLineId, err); });
    };
    SchematicExecution.prototype.callForExecute = function () {
        var self = this;
        self.isExecuting = true;
        self.executionStatusMsg = "Running...";
        self.intFormSvc.startSpinner('page', 'Executing schematic ' + self.selectedSchematic.id + '...');
        self.allMessages = [];
        self.selectedPipeline.pipelineRuntimeValue = '';
        self.selectedPipeline.idForSchematics = [];
        self.selectedPipeline.schematics.forEach(function (x) { return self.selectedPipeline.idForSchematics.push(x.id); });
        self.channelService.askForSchematicsRuntimeValue$.emit(true);
    };
    SchematicExecution.prototype.execute = function (obj) {
        var self = this;
        if (self.pageContentType === 'schematic') {
            self.signalr.executeSchematic(self.selectedSchematic.id, obj.runtimeValue);
        }
        else {
            self.selectedPipeline.pipelineRuntimeValue += '"' + obj.id + '":' + obj.runtimeValue + ';';
            var idToRemove = self.selectedPipeline.idForSchematics.find(function (x) { return x == obj.id; });
            if (idToRemove) {
                self.selectedPipeline.idForSchematics.splice(self.selectedPipeline.idForSchematics.indexOf(idToRemove), 1);
            }
            if (self.selectedPipeline.idForSchematics.length == 0) {
                var runtimeVal = '{' + self.selectedPipeline.pipelineRuntimeValue.slice(0, self.selectedPipeline.pipelineRuntimeValue.length - 1) + '}';
                //let runtimeVal = self.selectedPipeline.pipelineRuntimeValue.slice(0, self.selectedPipeline.pipelineRuntimeValue.length - 1);
                self.signalr.executePipeline(self.selectedPipeline.id, runtimeVal);
            }
        }
    };
    SchematicExecution.prototype.configToggle = function (toggleTo) {
        this.channelService.configToggle$.emit(toggleTo);
    };
    SchematicExecution.prototype.messageToggle = function (toggleTo) {
        this.channelService.messageToggle$.emit(toggleTo);
    };
    __decorate([
        core_1.ViewChild(schematicpreview_1.SchematicPreview), 
        __metadata('design:type', schematicpreview_1.SchematicPreview)
    ], SchematicExecution.prototype, "schematicPreview", void 0);
    __decorate([
        core_1.ViewChild(typeahead_1.TypeAhead), 
        __metadata('design:type', typeahead_1.TypeAhead)
    ], SchematicExecution.prototype, "typeAhead", void 0);
    SchematicExecution = __decorate([
        core_1.Component({
            template: require('./schematicExecution.html'),
            providers: [schematicService_1.SchematicApiService, signalr_1.signalr, executionDialogService_1.ExecutionDialogService]
        }), 
        __metadata('design:paramtypes', [schematicService_1.SchematicApiService, signalr_1.signalr, alertService_1.AlertService, executionDialogService_1.ExecutionDialogService, interFormsService_1.InterFormsService])
    ], SchematicExecution);
    return SchematicExecution;
}());
exports.SchematicExecution = SchematicExecution;
//# sourceMappingURL=schematicExecution.js.map