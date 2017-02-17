System.register(['@angular/core', "@angular/common", "../../../../ReusableServices/alertService", '../../../services/signalr', "../../../../ReusableServices/appSettingsService", '../../../../ReusableDirectives/highlightLast/highlightlast', "./SchematicExecInfo", "../../../../ReusableComponents/spinner/spinner.component", "../../../../ReusableComponents/jsonEdit/json.edit.component"], function(exports_1, context_1) {
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
    var core_1, common_1, alertService_1, signalr_1, appSettingsService_1, highlightlast_1, SchematicExecInfo_1, spinner_component_1, json_edit_component_1;
    var SchematicPreview;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (alertService_1_1) {
                alertService_1 = alertService_1_1;
            },
            function (signalr_1_1) {
                signalr_1 = signalr_1_1;
            },
            function (appSettingsService_1_1) {
                appSettingsService_1 = appSettingsService_1_1;
            },
            function (highlightlast_1_1) {
                highlightlast_1 = highlightlast_1_1;
            },
            function (SchematicExecInfo_1_1) {
                SchematicExecInfo_1 = SchematicExecInfo_1_1;
            },
            function (spinner_component_1_1) {
                spinner_component_1 = spinner_component_1_1;
            },
            function (json_edit_component_1_1) {
                json_edit_component_1 = json_edit_component_1_1;
            }],
        execute: function() {
            SchematicPreview = (function () {
                function SchematicPreview(schematicExecInfo1, appSetting, alert, signalr, elementRef) {
                    this.schematicExecInfo1 = schematicExecInfo1;
                    this.appSetting = appSetting;
                    this.alert = alert;
                    this.signalr = signalr;
                    this.elementRef = elementRef;
                    this.connectionStatus = "connecting to server";
                    this.isExecutePage = false;
                    this.isInputPageTypeExecute = false;
                    this.showMsg = false;
                    //schematicResult: string = "";
                    this.runtimeMask = "";
                    this.runtimeValue = "";
                    this.isSpinnerRunning = false;
                    this.executeStatus = true;
                    this.schematic = schematicExecInfo1;
                    this.appSettingService = appSetting;
                    this.elemRef = elementRef;
                    // this.schematicID = params.get('id');
                }
                SchematicPreview.prototype.ngOnInit = function () {
                    this.displayConnectionStatus();
                };
                SchematicPreview.prototype.displayConnectionStatus = function () {
                    var _this = this;
                    //if (this.isExecutePage)
                    //{
                    this.signalr.connectionEstablished.subscribe(function (data) {
                        _this.showConnectionStatus(data);
                    });
                    this.signalr.msgReceived.subscribe(function (data) {
                        _this.showMessage(data);
                        if (data.indexOf("Complete") > -1) {
                            _this.isSpinnerRunning = false;
                            _this.schematic.schematicState = "Finished";
                        }
                    }, function (error) {
                        _this.alert.error(_this.appSettingService.appNotificationsMsg.apiMsg.apiGetSchematicDetails + error.status);
                        _this.connectionStatus = error.status;
                        _this.executeStatus = false;
                    });
                    //}
                };
                SchematicPreview.prototype.showConnectionStatus = function (data) {
                    var msg;
                    if (data.connectionID.length > 0) {
                        msg = "Connection estabished, connection id " + data.connectionID;
                    }
                    else {
                        msg = "Connection failed, " + data.message;
                        this.executeStatus = false;
                    }
                    this.connectionStatus = msg;
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
                        //this.connectionStatus = "";
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
                SchematicPreview.prototype.showMessage = function (data) {
                    this.schematic.receiveMsg(data);
                };
                SchematicPreview.prototype.executeSchematicClicked = function () {
                    // do nothing here as disabled attribut is not blocking click....
                    // if (this.executeStatus === 'disabled') return;
                    if (this.schematicId) {
                        this.isSpinnerRunning = true;
                        //clear previous result
                        this.schematic.resetSteps();
                        this.showMsg = true;
                        //execute
                        this.signalr.executeSchematic(String(this.schematicId), this.schematic.getUserRunTimeValues());
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
                SchematicPreview.prototype.getJson = function (eventData, asset) {
                    asset.RuntimeConfigurationValue = eventData.value;
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
                SchematicPreview = __decorate([
                    core_1.Component({
                        templateUrl: "../../../..//Datahub/routes/schematic/schematicpreview/schematicpreview.html",
                        styles: [".Warn{color: orange;}    .Error{color: red;}"],
                        selector: 'schematicPreview',
                        directives: [common_1.FORM_DIRECTIVES, common_1.NgClass, highlightlast_1.highlightlast, json_edit_component_1.JsonEdit, spinner_component_1.SpinnerComponent],
                        providers: [SchematicExecInfo_1.SchematicExecInfo]
                    }), 
                    __metadata('design:paramtypes', [SchematicExecInfo_1.SchematicExecInfo, appSettingsService_1.AppSettingsService, alertService_1.AlertService, signalr_1.signalr, core_1.ElementRef])
                ], SchematicPreview);
                return SchematicPreview;
            }());
            exports_1("SchematicPreview", SchematicPreview);
        }
    }
});
//# sourceMappingURL=schematicpreview.js.map