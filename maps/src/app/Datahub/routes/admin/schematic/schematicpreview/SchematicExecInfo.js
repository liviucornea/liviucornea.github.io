"use strict";
var core_1 = require('@angular/core');
var schematicService_1 = require('../schematicService');
var alertService_1 = require("../../../../../ReusableServices/alertService");
var appSettingsService_1 = require("../../../../../ReusableServices/appSettingsService");
var executionDialogService_1 = require('../Execution/executionDialogService');
var SchematicExecInfo = (function () {
    function SchematicExecInfo(processApi, appSetttingService, alert, channelService) {
        this.processApi = processApi;
        this.appSetttingService = appSetttingService;
        this.alert = alert;
        this.channelService = channelService;
        this.showAllStepConfig = false; //toggle to show all config for each step
        this.showAllStepMessage = true; //toggle to show execution message for each step
        this.toggleListMessage = true;
        this.schematicState = ""; //state of this schematic
        this.userRunTimeValues = new UserRunTimeValues(); //user runtime overwrite values    
        var self = this;
        self.subcriptConfigToggle = self.channelService.configToggle$.subscribe(function (answer) {
            self.stepConfigToggleAll(answer);
        });
        self.messageToggle = self.channelService.messageToggle$.subscribe(function (answer) {
            self.stepResultToggleAll(answer);
        });
    }
    SchematicExecInfo.prototype.ngOnDestroy = function () {
        var self = this;
        self.subcriptConfigToggle.unsubscribe();
        self.messageToggle.unsubscribe();
    };
    SchematicExecInfo.prototype.getSchematicConfiguration = function (schematicID, isExecutePage) {
        var _this = this;
        this.reset();
        this.schematicID = schematicID;
        this.isExecutePage = isExecutePage;
        if (this.schematicID > 0) {
            this.processApi.fetchMultipleForSchematicConfiguration(this.schematicID).subscribe(function (res) {
                _this.buildSchematicConfig(res[0]);
                _this.allConfigValueTypes = res[1];
            }, function (error) {
                _this.alert.error(_this.appSetttingService.appNotificationsMsg.apiMsg.apiGetSchematicDetails + error.status);
            }, function () { });
        }
    };
    // if you have Id that means execution is inside of pipeline
    SchematicExecInfo.prototype.receiveMsg = function (data, Id) {
        var self = this;
        // do a little job and make string JSON ready
        var dataJSonReady = data.replace(/\\/g, "\\\\").replace(/\r?\n|\r/g, "").replace(/\t/g, '');
        try {
            var jsonData = JSON.parse(dataJSonReady);
            var step = self.allStepsVM.find(function (x) { return x.StepNumber.toString() === jsonData.stepId; });
            if (step != null) {
                self.updateStepState(jsonData.stepId, jsonData.logLevel, jsonData.message);
                var msgResult = new Array();
                if (step.ExecutionMessage.length > 0) {
                    msgResult = step.ExecutionMessage;
                }
                // bellow line is coverting ticksfrom C# to Date available for JavaScript
                var mcString = Number(jsonData.timeStamp.slice(0, jsonData.timeStamp.indexOf('.')));
                var epochMicrotimeDiff = 621355824000000000;
                var theDate = new Date((mcString - epochMicrotimeDiff) / 10000);
                msgResult.push({
                    'schematicId': jsonData.schematicId,
                    'stepId': jsonData.stepId,
                    'timestamp': jsonData.timeStamp,
                    'message': jsonData.message,
                    'class': jsonData.logLevel,
                    'date': theDate
                });
                msgResult.sort(sortByTimestamp);
                step.ExecutionMessage = msgResult;
                self.channelService.sendExecutionMessage$.emit(msgResult);
                if (jsonData.message.toUpperCase().indexOf('CONTINUE FALSE') > -1) {
                    self.channelService.sendExecutionMessage$.emit({ 'lastMsg': 'Finished - but incomplete !!!!' });
                }
            }
            else {
                if (jsonData.stepId === "0" && jsonData.message.startsWith("Schematic Completed with state ")) {
                    self.schematicState = jsonData.message;
                    self.channelService.sendExecutionMessage$.emit({ 'lastMsg': 'Schematic Completed with state' + jsonData.messge });
                    return;
                }
                if (jsonData.stepId === "0" && jsonData.message.startsWith("Pipeline") && jsonData.message.indexOf('finished with state') > -1) {
                    self.schematicState = jsonData.message;
                    self.channelService.sendExecutionMessage$.emit({ 'lastMsg': jsonData.messge });
                    return;
                }
                if (jsonData.stepId === "0" && jsonData.message.startsWith("Schematic") && jsonData.message.indexOf('finished with state') > -1 && typeof Id == 'undefined') {
                    self.schematicState = jsonData.message;
                    self.channelService.sendExecutionMessage$.emit({ 'lastMsg': jsonData.messge });
                    return;
                }
                if (jsonData.stepId === "0" && jsonData.message.startsWith('Cannot continue to process Pipeline')) {
                    self.schematicState = jsonData.message;
                    self.channelService.sendExecutionMessage$.emit({ 'lastMsg': 'Pipeline finished!' + jsonData.messge });
                    return;
                }
            }
        }
        catch (Exception) {
            console.log('Error when processing SignalR messages:' + "| message is :" + data);
            //    self.alert.error('Error when processing SignalR messages. It is not in expected format!!' + data);
            return;
        }
    };
    SchematicExecInfo.prototype.getStepState = function (stepNumber) {
        if (this.isExecutePage) {
            return this.allStepsVM.find(function (x) { return x.StepNumber == stepNumber; }).StepStateDisplay;
        }
        else {
            return "";
        }
    };
    SchematicExecInfo.prototype.getUserRunTimeValues = function () {
        var userRunTimeValues = new UserRunTimeValues();
        //populate BusinessDate
        userRunTimeValues.BusinessDate = this.userRunTimeValues.BusinessDate;
        //populate overwritten config values, if any
        this.allStepsVM.forEach(function (x) {
            x.StepAssets.forEach(function (item) {
                if (item.RuntimeConfigurationValue != "") {
                    userRunTimeValues.ConfigValues.push(new ConfigValue(item.ConfigvalueId, item.RuntimeConfigurationValue));
                }
            });
        });
        //populate steps to skip, if any
        this.allStepsVM.forEach(function (x) {
            if (!x.Active)
                userRunTimeValues.StepsToSkip.push(x.StepNumber);
        });
        //populate runtime values, if any
        if (this.userRunTimeValues.RuntimeValues.length > 0)
            userRunTimeValues.RuntimeValues = this.userRunTimeValues.RuntimeValues;
        var jsonString = JSON.stringify(userRunTimeValues);
        console.debug("userRunTimeValues: " + jsonString);
        return jsonString;
    };
    SchematicExecInfo.prototype.addRuntimeValue = function (runtimeMask, runtimeValue) {
        if (runtimeMask.trim() != "" && !this.userRunTimeValues.RuntimeValues.find(function (x) { return x.Key == runtimeMask; }))
            this.userRunTimeValues.RuntimeValues.push(new Runtimevalue(runtimeMask, runtimeValue));
    };
    SchematicExecInfo.prototype.removeRuntimeValue = function (runtimeMask) {
        this.userRunTimeValues.RuntimeValues.forEach(function (item, index, object) {
            if (item.Key == runtimeMask) {
                object.splice(index, 1);
            }
        });
    };
    SchematicExecInfo.prototype.stepConfigToggle = function (stepNumber) {
        var match = this.allStepsVM.find(function (x) { return x.StepNumber === stepNumber; });
        if (match) {
            match.StepConfigVisibility = !match.StepConfigVisibility;
        }
    };
    SchematicExecInfo.prototype.stepMessageToggle = function (stepNumber) {
        var match = this.allStepsVM.find(function (x) { return x.StepNumber === stepNumber; });
        if (match) {
            match.StepMessageVisibility = !match.StepMessageVisibility;
        }
    };
    SchematicExecInfo.prototype.stepConfigToggleAll = function (show) {
        this.allStepsVM.forEach(function (x) {
            x.StepConfigVisibility = show;
        });
    };
    SchematicExecInfo.prototype.stepResultToggleAll = function (show) {
        this.toggleListMessage = !this.toggleListMessage;
        this.allStepsVM.forEach(function (x) {
            x.StepMessageVisibility = show;
        });
    };
    SchematicExecInfo.prototype.resetSteps = function () {
        this.allStepsVM.forEach(function (x) {
            x.Reset();
        });
        this.schematicState = "";
    };
    SchematicExecInfo.prototype.reset = function () {
        this.schematicID = 0;
        this.isExecutePage = false;
        this.lastStepNumber = 0;
        this.showAllStepConfig = false;
        this.showAllStepMessage = true;
        this.toggleListMessage = true;
        this.schematicState = "";
        this.allStepsVM = [];
        this.userRunTimeValues = new UserRunTimeValues();
        this.allSchematicConfiguration = [];
        this.allConfigValueTypes = [];
    };
    SchematicExecInfo.prototype.buildSchematicConfig = function (res) {
        if (res.length > 0) {
            this.allSchematicConfiguration = res.sort(function (a, b) {
                return a.StepNumber - b.StepNumber;
            });
            var reverseList = res.sort(function (a, b) {
                return b.StepNumber - a.StepNumber;
            });
            if (reverseList) {
                this.lastStepNumber = reverseList[0].StepNumber;
            }
            this.buildSchematicSteps();
        }
    };
    SchematicExecInfo.prototype.buildSchematicSteps = function () {
        var sequence = 0;
        var self = this;
        self.allStepsVM = new Array();
        var maxStepNo = 1;
        while (maxStepNo <= this.lastStepNumber) {
            var assets = this.allSchematicConfiguration.filter(function (x) { return x.StepNumber === maxStepNo; });
            var stepConfigs = new Array();
            assets.forEach(function (x) {
                var configValue = x.ConfigurationValue.trim();
                var editByComponent = false;
                var componentType = 'JsonLike';
                try {
                    if (!x.Template || x.Template.length == 0) {
                        editByComponent = false;
                    }
                    else {
                        var type = JSON.parse(x.Template)['#Type#'];
                        if (type) {
                            editByComponent = true;
                            if (type.toUpperCase() == 'ARRAYLIKE') {
                                componentType = type.toUpperCase();
                            }
                            else {
                                componentType = 'JsonLike';
                            }
                        }
                        else {
                            editByComponent = false;
                        }
                    }
                }
                catch (err) {
                    console.log('Invalid JSON template with no type defined!');
                    self.alert.error("Invalid Template : ConfigValueTypeId:" + err.message);
                    editByComponent = false;
                }
                var stepConfig = new StepConfig(x.ConfigValueId, configValue, configValue, x.ConfigValueTypeLookupKey, x.ConfigValueTypeId, x.Template, editByComponent, !editByComponent);
                stepConfig.componentType = componentType;
                stepConfigs.push(stepConfig);
                //TODO: we can use the comment out line when api call is modified
                //stepConfigs.push(new StepConfig(x.ConfigValueId, configValue, "", x.ConfigValueTypeLookupKey, x.ConfigValueTypeId));
            });
            var step = new Step(maxStepNo, assets[0].UnitLookupKey, stepConfigs);
            self.allStepsVM.push(step);
            maxStepNo++;
        }
    };
    SchematicExecInfo.prototype.updateStepState = function (stepNumber, logLevel, msg) {
        var step = this.allStepsVM.find(function (x) { return x.StepNumber.toString() == stepNumber; });
        if (step != null) {
            var state = step.StepState;
            if (state == "") {
                step.StepStateDisplay = "<label><strong>Running</strong></label>";
                step.StepState = "Running";
            }
            if (logLevel == "Error" || msg.endsWith("continue False")) {
                step.StepStateDisplay = "<label class='text-danger'><strong>Error</strong></label>";
                step.StepState = "Error";
            }
            else if (logLevel == "Fatal" || msg.endsWith("continue False")) {
                step.StepStateDisplay = "<label class='text-danger'><strong>Fatal</strong></label>";
                step.StepState = "Fatal";
            }
            else if (logLevel == "Warn" && state != "Error") {
                step.StepStateDisplay = "<label class='text-warning'><strong>Warn</strong></label>";
                step.StepState = "Warn";
            }
            else if (msg.endsWith("continue True") && (state == "" || state == "Running")) {
                step.StepStateDisplay = "<label class='text-success'><strong>Succeeded</strong></label>";
                step.StepState = "Succeeded";
            }
        }
        if (this.allStepsVM.find(function (x) { return x.StepState == "Running"; }))
            this.schematicState = "Running";
    };
    SchematicExecInfo = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [schematicService_1.SchematicApiService, appSettingsService_1.AppSettingsService, alertService_1.AlertService, executionDialogService_1.ExecutionDialogService])
    ], SchematicExecInfo);
    return SchematicExecInfo;
}());
exports.SchematicExecInfo = SchematicExecInfo;
var UserRunTimeValues = (function () {
    function UserRunTimeValues() {
        this.BusinessDate = new Date(); //.toLocaleDateString();
        this.StepsToSkip = [];
        this.RuntimeValues = [];
        this.ConfigValues = [];
    }
    return UserRunTimeValues;
}());
exports.UserRunTimeValues = UserRunTimeValues;
var ConfigValue = (function () {
    function ConfigValue(ConfigID, ConfigValue) {
        this.ConfigID = ConfigID;
        this.ConfigValue = ConfigValue;
    }
    return ConfigValue;
}());
exports.ConfigValue = ConfigValue;
var Runtimevalue = (function () {
    function Runtimevalue(Key, Value) {
        this.Key = Key;
        this.Value = Value;
    }
    return Runtimevalue;
}());
exports.Runtimevalue = Runtimevalue;
var Step = (function () {
    function Step(StepNumber, UnitName, StepAssets, ExecutionMessage, StepStateDisplay, StepState, StepMessageVisibility, StepConfigVisibility, Active) {
        if (ExecutionMessage === void 0) { ExecutionMessage = []; }
        if (StepStateDisplay === void 0) { StepStateDisplay = ""; }
        if (StepState === void 0) { StepState = ""; }
        if (StepMessageVisibility === void 0) { StepMessageVisibility = true; }
        if (StepConfigVisibility === void 0) { StepConfigVisibility = false; }
        if (Active === void 0) { Active = true; }
        this.StepNumber = StepNumber;
        this.UnitName = UnitName;
        this.StepAssets = StepAssets;
        this.ExecutionMessage = ExecutionMessage;
        this.StepStateDisplay = StepStateDisplay;
        this.StepState = StepState;
        this.StepMessageVisibility = StepMessageVisibility;
        this.StepConfigVisibility = StepConfigVisibility;
        this.Active = Active;
    }
    Step.prototype.Reset = function () {
        this.ExecutionMessage = [];
        this.StepStateDisplay = "";
        this.StepState = "";
    };
    return Step;
}());
exports.Step = Step;
var StepConfig = (function () {
    function StepConfig(ConfigvalueId, ConfigurationValue, RuntimeConfigurationValue, ConfigValueTypeLookupKey, ConfigValueTypeId, Template, editByComponent, isVisible) {
        if (Template === void 0) { Template = ""; }
        if (editByComponent === void 0) { editByComponent = false; }
        if (isVisible === void 0) { isVisible = true; }
        this.ConfigvalueId = ConfigvalueId;
        this.ConfigurationValue = ConfigurationValue;
        this.RuntimeConfigurationValue = RuntimeConfigurationValue;
        this.ConfigValueTypeLookupKey = ConfigValueTypeLookupKey;
        this.ConfigValueTypeId = ConfigValueTypeId;
        this.Template = Template;
        this.editByComponent = editByComponent;
        this.isVisible = isVisible;
        this.componentType = 'JsonLike';
    }
    return StepConfig;
}());
exports.StepConfig = StepConfig;
function sortByTimestamp(n1, n2) {
    if (n1.timestamp > n2.timestamp) {
        return 1;
    }
    if (n1.timestamp < n2.timestamp) {
        return -1;
    }
    return 0;
}
exports.sortByTimestamp = sortByTimestamp;
//# sourceMappingURL=SchematicExecInfo.js.map