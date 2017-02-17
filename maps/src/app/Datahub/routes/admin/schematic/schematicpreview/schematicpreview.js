"use strict";
var core_1 = require('@angular/core');
var alertService_1 = require("../../../../../ReusableServices/alertService");
var signalr_1 = require('../../../../services/signalr');
var appSettingsService_1 = require("../../../../../ReusableServices/appSettingsService");
var SchematicExecInfo_1 = require("./SchematicExecInfo");
var executionDialogService_1 = require("../Execution/executionDialogService");
var SchematicPreview = (function () {
    function SchematicPreview(schematicExecInfo, appSetting, alert, signalr, elementRef, channelService) {
        this.schematicExecInfo = schematicExecInfo;
        this.appSetting = appSetting;
        this.alert = alert;
        this.signalr = signalr;
        this.elementRef = elementRef;
        this.channelService = channelService;
        this.connectionStatus = "connecting to server";
        this.isExecutePage = false;
        this.isInputPageTypeExecute = false;
        this.showMsg = false;
        this.runtimeMask = "";
        this.runtimeValue = "";
        this.isSpinnerRunning = false;
        this.executeStatus = true;
        this.schematic = schematicExecInfo;
        this.appSettingService = appSetting;
        this.elemRef = elementRef;
    }
    SchematicPreview.prototype.ngOnDestroy = function () {
        var self = this;
        self.signalr = null;
        self.subcriptRuntimeValues.unsubscribe();
        self.messagesSubscription.unsubscribe();
    };
    SchematicPreview.prototype.ngOnInit = function () {
        var _this = this;
        var self = this;
        self.subscribeForMessages();
        self.populateWithSchematicDetails(this.schematicId, true);
        self.subcriptRuntimeValues = self.channelService.askForSchematicsRuntimeValue$.subscribe(function (answer) {
            if (answer) {
                _this.executeSchematicClicked();
            }
        });
    };
    SchematicPreview.prototype.subscribeForMessages = function () {
        var _this = this;
        var self = this;
        self.messagesSubscription = self.signalr.msgReceived.subscribe(function (data) {
            //  self.showMessage(data);
            self.schematic.receiveMsg(data, self.Id);
            if (data.indexOf("Complete") > -1) {
                _this.isSpinnerRunning = false;
                _this.schematic.schematicState = "Finished";
            }
        }, function (error) {
            self.alert.error(self.appSettingService.appNotificationsMsg.apiMsg.apiGetSchematicDetails + error.status);
            self.connectionStatus = error.status;
            self.executeStatus = false;
            self.isSpinnerRunning = false;
        });
    };
    SchematicPreview.prototype.populateWithSchematicDetails = function (schematicId, isExecutionPage) {
        if (isExecutionPage === void 0) { isExecutionPage = false; }
        this.reset();
        if (schematicId > 0) {
            this.isInputPageTypeExecute = isExecutionPage;
            this.schematicId = schematicId;
            this.isExecutePage = isExecutionPage;
            this.schematic.getSchematicConfiguration(schematicId, isExecutionPage);
        }
    };
    SchematicPreview.prototype.reset = function () {
        this.showMsg = false;
        this.runtimeMask = "";
        this.runtimeValue = "";
    };
    SchematicPreview.prototype.setExecutePageChanges = function () {
        if (this.schematic.allStepsVM.length > 0) {
            this.isExecutePage = this.isInputPageTypeExecute;
        }
        else {
            this.isExecutePage = false;
        }
    };
    SchematicPreview.prototype.createUserConfigurationValue = function (assets) {
        var userConfigurationValue = [];
        assets.forEach(function (x) {
            userConfigurationValue.push({ ConfigID: x.ConfigValueId, ConfigValue: "" });
        });
        return userConfigurationValue;
    };
    /*
        showMessage(data: any) {
            this.schematic.receiveMsg(data);
        }
    */
    SchematicPreview.prototype.executeSchematicClicked = function () {
        var self = this;
        if (this.schematicId) {
            this.isSpinnerRunning = true;
            //clear previous result
            this.schematic.resetSteps();
            this.showMsg = true;
            //execute
            //this.signalr.executeSchematic(String(this.schematicId), this.schematic.getUserRunTimeValues());
            this.channelService.schematicRuntimeValue$.emit({ 'runtimeValue': this.schematic.getUserRunTimeValues(), 'id': self.Id ? self.Id : '' });
        }
    };
    SchematicPreview.prototype.getStepConfigName = function (configValueTypeLookupKey) {
        var pos = configValueTypeLookupKey.indexOf(":");
        if (pos > 0)
            return configValueTypeLookupKey.substring(pos + 1).trim();
        else
            return configValueTypeLookupKey;
    };
    SchematicPreview.prototype.getColumnWith = function () {
        if (this.isExecutePage)
            return "40%";
        else
            return "80%";
    };
    SchematicPreview.prototype.updateJsonValueToModel = function (asset, updatedValue) {
        asset.RuntimeConfigurationValue = updatedValue;
    };
    SchematicPreview.prototype.getJson = function (eventData, asset, step) {
        var _this = this;
        var self = this;
        asset.RuntimeConfigurationValue = eventData.value;
        try {
            var targetAsset_1 = step.StepAssets.find(function (x) {
                if (x.editByComponent && x.componentType == 'ARRAYLIKE') {
                    return true;
                }
                ;
                return false;
            });
            if (targetAsset_1 && asset.componentType.toUpperCase() == "JSONLIKE") {
                var jsonFromEvent = JSON.parse(eventData.value);
                var targetConfigValue = JSON.parse(targetAsset_1.ConfigurationValue);
                var settedSections_1 = [];
                var existingSections_1 = [];
                jsonFromEvent.forEach(function (x) {
                    settedSections_1.push('DocPart' + ' - ' + x.DocPart);
                });
                targetConfigValue.forEach(function (x) {
                    existingSections_1.push('DocPart' + ' - ' + x[0].DocPart);
                });
                existingSections_1.forEach(function (x) {
                    if (settedSections_1.indexOf(x) == -1) {
                        targetAsset_1.isVisible = true;
                        self.alert.addAlertAndRequestAnswer('Do you want to delete section : ' + x + ' in Column Mapping?', null, 'Delete Section');
                        var subscription = self.alert.requestConfirmationAnswer$.subscribe(function (answer) {
                            subscription.unsubscribe();
                            if (answer != "OK") {
                                targetAsset_1.isVisible = false;
                                return;
                            }
                            setTimeout(function () {
                                _this.alert.sendSectionForDelete$.emit(x);
                            }, 300);
                        });
                    }
                });
            }
        }
        catch (Exception) {
            console.log("Unable to delete corresponding section from Column mapping");
        }
    };
    SchematicPreview.prototype.jsonCanceled = function (event, asset) {
        if (event)
            asset.isVisible = false;
    };
    SchematicPreview.prototype.assetChanged = function (asset) {
        if (asset.ConfigurationValue !== asset.RuntimeConfigurationValue) {
            asset.isChanged = true;
        }
        else {
            asset.isChanged = false;
        }
    };
    SchematicPreview.prototype.checkIt = function (event, asset) {
        if (event.keyCode == 27 && asset.ConfigurationValue !== asset.RuntimeConfigurationValue) {
            asset.RuntimeConfigurationValue = asset.ConfigurationValue;
            asset.isChanged = false;
        }
    };
    __decorate([
        core_1.Input("schematicId"), 
        __metadata('design:type', Number)
    ], SchematicPreview.prototype, "schematicId", void 0);
    __decorate([
        core_1.Input("Id"), 
        __metadata('design:type', Number)
    ], SchematicPreview.prototype, "Id", void 0);
    SchematicPreview = __decorate([
        core_1.Component({
            template: require('./schematicpreview.html'),
            styles: [require('./schematicpreview.scss')],
            selector: 'schematicPreview',
            providers: [SchematicExecInfo_1.SchematicExecInfo]
        }), 
        __metadata('design:paramtypes', [SchematicExecInfo_1.SchematicExecInfo, appSettingsService_1.AppSettingsService, alertService_1.AlertService, signalr_1.signalr, core_1.ElementRef, executionDialogService_1.ExecutionDialogService])
    ], SchematicPreview);
    return SchematicPreview;
}());
exports.SchematicPreview = SchematicPreview;
//# sourceMappingURL=schematicpreview.js.map