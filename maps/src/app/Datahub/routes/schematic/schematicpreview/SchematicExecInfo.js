System.register(['@angular/core', '../schematicService', "../../../../ReusableServices/alertService", "../../../../ReusableServices/appSettingsService"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, schematicService_1, alertService_1, appSettingsService_1;
    var SchematicExecInfo, UserRunTimeValues, ConfigValue, Runtimevalue, Step, StepConfig;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (schematicService_1_1) {
                schematicService_1 = schematicService_1_1;
            },
            function (alertService_1_1) {
                alertService_1 = alertService_1_1;
            },
            function (appSettingsService_1_1) {
                appSettingsService_1 = appSettingsService_1_1;
            }],
        execute: function() {
            SchematicExecInfo = (function () {
                function SchematicExecInfo(processApi, appSetttingService, alert) {
                    this.processApi = processApi;
                    this.appSetttingService = appSetttingService;
                    this.alert = alert;
                    this.showAllStepConfig = false; //toggle to show all config for each step
                    this.showAllStepMessage = true; //toggle to show execution message for each step
                    this.toggleListMessage = true;
                    this.schematicState = ""; //state of this schematic
                    this.userRunTimeValues = new UserRunTimeValues(); //user runtime overwrite values    
                }
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
                SchematicExecInfo.prototype.receiveMsg = function (data) {
                    var messages = data.split("|");
                    var logLevel = messages[0];
                    var timeStampValue = messages[1];
                    var schematicID = messages[2];
                    var stepID = messages[3];
                    var msg = messages[4];
                    var step = this.allStepsVM.find(function (x) { return x.StepNumber.toString() === stepID; });
                    if (step != null) {
                        this.updateStepState(stepID, logLevel, msg);
                        var msgResult = new Array();
                        if (step.ExecutionMessage.length > 0) {
                            msgResult = step.ExecutionMessage;
                        }
                        // bellow line is coverting ticksfrom C# to Date available for JavaScript
                        var mcString = Number(timeStampValue.slice(0, timeStampValue.indexOf('.')));
                        var epochMicrotimeDiff = 621355824000000000;
                        var theDate = new Date((mcString - epochMicrotimeDiff) / 10000);
                        msgResult.push({
                            'stepId': stepID,
                            'timestamp': timeStampValue,
                            'message': msg,
                            'class': logLevel,
                            'date': theDate
                        });
                        msgResult.sort(function (n1, n2) {
                            if (n1.timestamp > n2.timestamp) {
                                return 1;
                            }
                            if (n1.timestamp < n2.timestamp) {
                                return -1;
                            }
                            return 0;
                        });
                        step.ExecutionMessage = msgResult;
                    }
                    else if (stepID === "0" && msg.startsWith("Schematic Completed with state ")) {
                        this.schematicState = msg;
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
                    this.allStepsVM = new Array();
                    var maxStepNo = 1;
                    while (maxStepNo <= this.lastStepNumber) {
                        var assets = this.allSchematicConfiguration.filter(function (x) { return x.StepNumber === maxStepNo; });
                        var stepConfigs = new Array();
                        assets.forEach(function (x) {
                            var configValue = x.ConfigurationValue.trim();
                            var isJson = configValue.startsWith("{") || configValue.startsWith("[");
                            //TODO: we can use the comment out line when api call is modified
                            stepConfigs.push(new StepConfig(x.ConfigValueId, configValue, configValue, x.ConfigValueTypeLookupKey, x.ConfigValueTypeId, x.Template, isJson, isJson ? false : true));
                            //stepConfigs.push(new StepConfig(x.ConfigValueId, configValue, "", x.ConfigValueTypeLookupKey, x.ConfigValueTypeId));
                        });
                        var step = new Step(maxStepNo, assets[0].UnitLookupKey, stepConfigs);
                        this.allStepsVM.push(step);
                        maxStepNo++;
                    }
                };
                SchematicExecInfo.prototype.updateStepState = function (stepNumber, logLevel, msg) {
                    var step = this.allStepsVM.find(function (x) { return x.StepNumber.toString() == stepNumber; });
                    if (step != null) {
                        var state = step.StepState;
                        if (state == "") {
                            step.StepStateDisplay = "<label style='font:bold;'>Running</label>";
                            step.StepState = "Running";
                        }
                        if (logLevel == "Error" || msg.endsWith("continue False")) {
                            step.StepStateDisplay = "<label style='color:red; font:bold;'>Error</label>";
                            step.StepState = "Error";
                        }
                        else if (logLevel == "Fatal" || msg.endsWith("continue False")) {
                            step.StepStateDisplay = "<label style='color:red; font: bold;'>Fatal</label>";
                            step.StepState = "Fatal";
                        }
                        else if (logLevel == "Warn" && state != "Error") {
                            step.StepStateDisplay = "<label style='color:Orange; font:bold;'>Warn</label>";
                            step.StepState = "Warn";
                        }
                        else if (msg.endsWith("continue True") && (state == "" || state == "Running")) {
                            step.StepStateDisplay = "<label style='color:green; font:bold;'>Succeeded</label>";
                            step.StepState = "Succeeded";
                        }
                    }
                    if (this.allStepsVM.find(function (x) { return x.StepState == "Running"; }))
                        this.schematicState = "Running";
                };
                SchematicExecInfo = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [schematicService_1.SchematicApiService, appSettingsService_1.AppSettingsService, alertService_1.AlertService])
                ], SchematicExecInfo);
                return SchematicExecInfo;
            }());
            exports_1("SchematicExecInfo", SchematicExecInfo);
            UserRunTimeValues = (function () {
                function UserRunTimeValues() {
                    this.BusinessDate = new Date(); //.toLocaleDateString();
                    this.StepsToSkip = [];
                    this.RuntimeValues = [];
                    this.ConfigValues = [];
                }
                return UserRunTimeValues;
            }());
            exports_1("UserRunTimeValues", UserRunTimeValues);
            ConfigValue = (function () {
                function ConfigValue(ConfigID, ConfigValue) {
                    this.ConfigID = ConfigID;
                    this.ConfigValue = ConfigValue;
                }
                return ConfigValue;
            }());
            exports_1("ConfigValue", ConfigValue);
            Runtimevalue = (function () {
                function Runtimevalue(Key, Value) {
                    this.Key = Key;
                    this.Value = Value;
                }
                return Runtimevalue;
            }());
            exports_1("Runtimevalue", Runtimevalue);
            Step = (function () {
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
            exports_1("Step", Step);
            StepConfig = (function () {
                function StepConfig(ConfigvalueId, ConfigurationValue, RuntimeConfigurationValue, ConfigValueTypeLookupKey, ConfigValueTypeId, Template, isJSON, isVisible) {
                    if (Template === void 0) { Template = ""; }
                    if (isJSON === void 0) { isJSON = false; }
                    if (isVisible === void 0) { isVisible = true; }
                    this.ConfigvalueId = ConfigvalueId;
                    this.ConfigurationValue = ConfigurationValue;
                    this.RuntimeConfigurationValue = RuntimeConfigurationValue;
                    this.ConfigValueTypeLookupKey = ConfigValueTypeLookupKey;
                    this.ConfigValueTypeId = ConfigValueTypeId;
                    this.Template = Template;
                    this.isJSON = isJSON;
                    this.isVisible = isVisible;
                }
                return StepConfig;
            }());
            exports_1("StepConfig", StepConfig);
        }
    }
});
//# sourceMappingURL=SchematicExecInfo.js.map