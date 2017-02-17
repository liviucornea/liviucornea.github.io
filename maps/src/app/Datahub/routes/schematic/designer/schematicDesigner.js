System.register(["@angular/core", "../schematicService", "../../../../ReusableServices/appSettingsService", "../../../../ReusableServices/alertService", "../../../../ReusableServices/componentsConfigService", "../../../../ReusableComponents/typeahead/typeahead", "../../../../ReusableServices/appSettings", "../../../../ReusableComponents/jsonEdit/json.edit.component"], function(exports_1, context_1) {
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
    var core_1, schematicService_1, appSettingsService_1, alertService_1, componentsConfigService_1, typeahead_1, appSettings_1, json_edit_component_1;
    var SchematicDesigner, SchematicItem;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (schematicService_1_1) {
                schematicService_1 = schematicService_1_1;
            },
            function (appSettingsService_1_1) {
                appSettingsService_1 = appSettingsService_1_1;
            },
            function (alertService_1_1) {
                alertService_1 = alertService_1_1;
            },
            function (componentsConfigService_1_1) {
                componentsConfigService_1 = componentsConfigService_1_1;
            },
            function (typeahead_1_1) {
                typeahead_1 = typeahead_1_1;
            },
            function (appSettings_1_1) {
                appSettings_1 = appSettings_1_1;
            },
            function (json_edit_component_1_1) {
                json_edit_component_1 = json_edit_component_1_1;
            }],
        execute: function() {
            SchematicDesigner = (function () {
                function SchematicDesigner(processService, elementRef, appSettings, compConfigService, alert) {
                    this.processService = processService;
                    this.elementRef = elementRef;
                    this.appSettings = appSettings;
                    this.compConfigService = compConfigService;
                    this.alert = alert;
                    this.IsAddpage = false;
                    this.isPreviewClicked = false;
                    this.ConfigValueJson = { ConfigValueId: 0, SchematicId: 0, StepNumber: 0, ConfigValueTypeId: 0, Value: "", VersionStamp: "" };
                    this.allSteps = new Array();
                    this.sequence = 1;
                    this.controlConfig = this.compConfigService.ProcessDesignerConfig;
                    this.allSchematicConfigurationVM = new Array();
                    this.addConfigVisibility = false;
                    this.apiIsLoaded = false;
                    this.unitFrozen = false;
                    this.showAdd = false;
                    this.addSchematicVisibility = false;
                    this.deleteSchematicVisibility = false;
                    this.deleteStepVisibility = false;
                    this.schematicIndex = 0;
                    this.addStepVisibility = false;
                    this.self = this;
                    this.appSettingsService = appSettings;
                    this.elemRef = elementRef;
                    this.processApi = processService;
                }
                SchematicDesigner.prototype.ngOnInit = function () {
                    this.setPageType(false); //edit page
                    this.autocompleteInput = new Object();
                    this.autocompleteInput.searchSchematics = this.searchSchematics();
                };
                SchematicDesigner.prototype.setPageType = function (boolValue) {
                    this.IsAddpage = boolValue;
                    this.apiIsLoaded = false;
                    this.allSteps = new Array();
                    this.getSchematicsDetails();
                    this.sequence = 1;
                };
                SchematicDesigner.prototype.getSchematicsDetails = function () {
                    var _this = this;
                    this.processApi.fetchMultipleForSchematics().subscribe(function (res) {
                        _this.allSchematics = res[0];
                        _this.allUnits = res[1];
                        _this.allConfigValueTypes = res[2];
                        _this.allUnitTypes = res[3];
                        _this.loadSchematicDesigner();
                    }, function (error) {
                        console.log("Error getting schematic details:", error);
                        _this.alert.error("Error getting schematic details:" + error.message);
                    }, function () { });
                };
                SchematicDesigner.prototype.loadSchematicDesigner = function () {
                    this.apiIsLoaded = true;
                    this.allUnitsVM = this.buildAllUnitsVM();
                    this.selectedUnit = this.allUnitsVM[0];
                    this.allConfigValueTypesVM = this.buildConfigValueTypesVM();
                    this.selectedConfigType = this.allConfigValueTypesVM[0];
                    this.allSchematicsVM = this.buildSchematicsVM();
                    this.selectedSchematic = this.allSchematicsVM[0];
                    // this.allConfigValueTypesVM = this.buildAllConfigValueTypesVM();
                    if (this.selectedProcessName && this.selectedProcessName.length > 0) {
                        var schematicName = this.selectedProcessName;
                        var k = this.allSchematicsVM.findIndex((function (x) { return x.description === schematicName; }));
                        this.schematicIndex = k;
                    }
                    else {
                        this.schematicIndex = 0;
                    }
                    this.selectedProcessName = "";
                    if (this.selectedSchematic.schematicId) {
                        this.SchematicSelected(this.selectedSchematic.schematicId);
                    }
                    ;
                };
                // endregion build
                SchematicDesigner.prototype.buildAllUnitsVM = function () {
                    var newVM = new Array();
                    this.allUnits.forEach(function (x) {
                        newVM.push({
                            id: x.UnitId,
                            description: x.LookupKey
                        });
                    });
                    return newVM;
                };
                SchematicDesigner.prototype.buildConfigValueTypesVM = function () {
                    var unitId = this.selectedUnit.id;
                    var newconfigs = new Array();
                    this.allConfigValueTypes.forEach(function (x) {
                        if (x.UnitId === unitId) {
                            var newObj = {
                                id: x.ConfigValueTypeId,
                                unitId: x.UnitId,
                                description: x.LookupKey
                            };
                            newconfigs.push(newObj);
                        }
                    });
                    return newconfigs;
                };
                SchematicDesigner.prototype.buildSchematicsVM = function () {
                    var newVM = new Array();
                    this.allSchematics.forEach(function (x) {
                        if (x.hasOwnProperty('SchematicId')) {
                            var schematic = new SchematicItem(x.SchematicId, x.LookupKey, x.IsActive == 0 ? " (InActive)" : "", x.IsActive == 0 ? false : true);
                            newVM.push(schematic);
                        }
                    });
                    return newVM;
                };
                SchematicDesigner.prototype.SchematicSelected = function (schematicValue) {
                    this.previewCancelClicked();
                    var schematicId = schematicValue;
                    this.selectedSchematic = this.allSchematicsVM.find(function (x) {
                        return (x.schematicId === schematicId);
                    });
                    this.GetSchematicConfiguration();
                };
                SchematicDesigner.prototype.configValueTypeSelected = function (configValueType, step) {
                    var result = "";
                    this.allConfigValueTypesVM.forEach(function (x) {
                        var v1 = x.description.toLowerCase().replace(/\s+/g, '');
                        var v2 = configValueType.toLowerCase().replace(/\s+/g, '');
                        if (v1 === v2) {
                            result = x;
                        }
                    });
                    // this.selectedConfigType = result;
                    step.selectedConfigType = result;
                };
                SchematicDesigner.prototype.unitSelected = function (unitName) {
                    var result = "";
                    this.allUnitsVM.forEach(function (x) {
                        var v1 = x.description.toLowerCase().replace(/\s+/g, '');
                        var v2 = unitName.toLowerCase().replace(/\s+/g, '');
                        if (v1 === v2) {
                            result = x;
                        }
                    });
                    this.selectedUnit = result;
                    this.allConfigValueTypesVM = this.buildConfigValueTypesVM();
                    this.selectedConfigType = this.allConfigValueTypesVM[0];
                };
                SchematicDesigner.prototype.inlineEditClicked = function (sequenceNo) {
                    var match = this.visiblityMatrix.find(function (x) { return x.Sequence === sequenceNo; });
                    if (match) {
                        match.isVisible = !match.isVisible;
                    }
                };
                SchematicDesigner.prototype.inlineEditSave = function (asset) {
                    var _this = this;
                    var configValueId = asset.ConfigValueId;
                    var schematicId = this.selectedSchematic.schematicId;
                    if (configValueId) {
                        var obj = this.allConfigValues.find(function (x) {
                            if (x.ConfigValueId === configValueId)
                                return x;
                        });
                        if (obj) {
                            obj.Value = asset.ConfigurationValue;
                            this.processApi.updateConfigValues(obj, "ConfigValueId").subscribe(function (res) {
                                _this.getSchematicStepsBySchematicId(schematicId);
                                //this.buildSchematicSteps();
                                if (!asset.isJSON)
                                    _this.inlineEditClicked(asset.Sequence);
                            }, function (error) {
                                _this.alert.error("Error in updating ConfigValue " + error.Status);
                            });
                        }
                    }
                };
                SchematicDesigner.prototype.getJson = function (eventData, asset) {
                    asset.ConfigurationValue = eventData.value;
                    this.inlineEditSave(asset);
                };
                SchematicDesigner.prototype.buildSchematicSteps = function () {
                    var sequence = 0;
                    var visMatrix = new Array();
                    var schematicId = this.selectedSchematic.schematicId;
                    this.getSchematicStepsBySchematicId(schematicId);
                    this.allSchematicConfiguration.forEach(function (x) {
                        x.Sequence = sequence;
                        var visiblitybj = { Sequence: sequence, isVisible: false, Editable: false };
                        visMatrix.push(visiblitybj);
                        sequence++;
                    });
                    this.visiblityMatrix = visMatrix;
                    this.allStepsVM = new Array();
                    var maxStepNo = 1;
                    var self = this;
                    while (maxStepNo <= this.lastStepNumber) {
                        var assets = this.allSchematicConfiguration.filter(function (x) { return x.StepNumber === maxStepNo; });
                        if (assets) {
                            assets.forEach(function (x) {
                                var configValue = x.ConfigurationValue.trim();
                                var isJson = configValue.startsWith("{") || configValue.startsWith("[");
                                x.isJSON = isJson;
                                if (isJson) {
                                    x.Template = self.getTemplateByAsset(x);
                                }
                            });
                        }
                        this.allStepsVM.push({ StepNumber: maxStepNo, UnitName: assets[0].UnitLookupKey, isVisible: false, StepAssets: assets, StepActive: assets[0].StepActive, StepAddingConfiguration: false });
                        maxStepNo++;
                    }
                };
                SchematicDesigner.prototype.getSchematicStepsBySchematicId = function (schematicID) {
                    var _this = this;
                    this.processApi.getSchematicStepsBySchematicId(schematicID).subscribe(function (res) {
                        _this.allSchematicSteps = res[0];
                        _this.allConfigValues = res[1].DataTable;
                    }, function (error) { _this.alert.error(" Error in getting Schematic Steps " + error.status); }, function () { });
                };
                SchematicDesigner.prototype.getConfigUnitNameByConfigValueType = function (ConfigValueTypeDescription) {
                    var result;
                    this.allSchematicConfiguration.forEach(function (x) {
                        var v1 = x.ConfigValueTypeLookupKey.toLowerCase().replace(/\s+/g, '');
                        var v2 = ConfigValueTypeDescription.toLowerCase().replace(/\s+/g, '');
                        if (v1 === v2) {
                            result = x;
                        }
                    });
                    return result.UnitLookupKey;
                };
                SchematicDesigner.prototype.getConfigValueType = function (configValueTypeId) {
                    var result;
                    this.allConfigValueTypesVM.forEach(function (x) {
                        var v1 = x.id;
                        var v2 = configValueTypeId;
                        if (v1 === v2) {
                            result = x;
                        }
                    });
                    return result;
                };
                SchematicDesigner.prototype.addClicked = function () {
                    if (!this.selectedConfigValue) {
                        return;
                    }
                    var newObj = { ConfigurationTypeName: this.selectedConfigType.description, ConfigurationTypeValue: this.selectedConfigValue, ConfigValueId: 0, ShowEdit: false };
                    var currentStep = this.allSteps.pop();
                    this.showAdd = true;
                    if (currentStep.UnitName === "") {
                        currentStep.UnitName = this.selectedUnit.description;
                    }
                    currentStep.StepAssets.push(newObj);
                    this.allSteps.push(currentStep);
                    this.unitFrozen = true;
                    this.selectedConfigValue = "";
                };
                SchematicDesigner.prototype.addNewStep = function () {
                    this.showAdd = false;
                    this.addAStep();
                    this.unitFrozen = false;
                    this.selectedConfigValue = "";
                };
                SchematicDesigner.prototype.addAStep = function () {
                    var stepObj = { StepNo: this.sequence, UnitName: "", StepAssets: [], ShowAdd: false };
                    this.allSteps.push(stepObj);
                    this.sequence++;
                };
                SchematicDesigner.prototype.lowerStep = function (step) {
                    var location = this.allStepsVM.indexOf(step);
                    if (location === this.allStepsVM.length - 1) {
                        return;
                    }
                    var objStepNumber = location + 1;
                    var currentSchematicStep = this.allSchematicSteps.find(function (x) {
                        if (x.StepNumber == objStepNumber) {
                            return x;
                        }
                    });
                    var nextSchematicStep = this.allSchematicSteps.find(function (x) {
                        if (x.StepNumber == (objStepNumber + 1)) {
                            return x;
                        }
                    });
                    if (currentSchematicStep != undefined) {
                        currentSchematicStep.StepNumber++;
                    }
                    if (nextSchematicStep != undefined) {
                        nextSchematicStep.StepNumber--;
                    }
                    var currentObj = JSON.stringify(this.allStepsVM[location + 1]);
                    var nextObj = this.allStepsVM[location];
                    var nextObjCopy = JSON.stringify(nextObj);
                    this.allStepsVM[location + 1] = JSON.parse(nextObjCopy);
                    this.allStepsVM[location] = JSON.parse(currentObj);
                    this.allStepsVM[location + 1].StepNumber++;
                    this.allStepsVM[location].StepNumber--;
                    this.saveSchematicStepNumber(currentSchematicStep, nextSchematicStep);
                };
                SchematicDesigner.prototype.higherStep = function (step) {
                    var location = this.allStepsVM.indexOf(step);
                    if (location === 0) {
                        return;
                    }
                    var objStepNumber = location + 1;
                    var currentSchematicStep = this.allSchematicSteps.find(function (x) {
                        if (x.StepNumber == objStepNumber) {
                            return x;
                        }
                    });
                    var nextSchematicStep = this.allSchematicSteps.find(function (x) {
                        if (x.StepNumber == (objStepNumber - 1)) {
                            return x;
                        }
                    });
                    if (currentSchematicStep != undefined) {
                        currentSchematicStep.StepNumber--;
                    }
                    if (nextSchematicStep != undefined) {
                        nextSchematicStep.StepNumber++;
                    }
                    var currentObj = JSON.stringify(this.allStepsVM[location]);
                    var nextObj = this.allStepsVM[location - 1];
                    var nextObjCopy = JSON.stringify(nextObj);
                    this.allStepsVM[location] = JSON.parse(nextObjCopy);
                    this.allStepsVM[location - 1] = JSON.parse(currentObj);
                    this.allStepsVM[location - 1].StepNumber--;
                    this.allStepsVM[location].StepNumber++;
                    this.saveSchematicStepNumber(currentSchematicStep, nextSchematicStep);
                };
                SchematicDesigner.prototype.saveSchematicStepNumber = function (currentobj, nextobj) {
                    var _this = this;
                    var primaryKeyColumn = "SchematicStepId";
                    var schematicId = this.selectedSchematic.schematicId;
                    this.processApi.updateSchematicStep(currentobj, primaryKeyColumn).subscribe(function (res) {
                        _this.processApi.updateSchematicStep(nextobj, primaryKeyColumn).subscribe(function (res) {
                            _this.getSchematicStepsBySchematicId(schematicId);
                        }, function (error) { _this.alert.error(" Error in getting Schematic Steps " + error.status); }, function () { });
                    }, function (error) { _this.alert.error(" Error in getting Schematic Steps " + error.status); }, function () { });
                };
                SchematicDesigner.prototype.deleteStep = function (step) {
                    var location = this.allSteps.indexOf(step);
                    this.allSteps.splice(location, 1);
                    this.sequence--;
                    this.allSteps.forEach(function (x) {
                        x.StepNo = x.StepNo - 1;
                    });
                    if (this.allSteps.length === 0) {
                        this.allUnitsVM = this.buildAllUnitsVM();
                        this.allConfigValueTypesVM = this.buildConfigValueTypesVM();
                        this.addAStep();
                    }
                };
                SchematicDesigner.prototype.SortStepNumber = function (a, b) {
                    if (a.StepNumber < b.StepNumber)
                        return -1;
                    else if (a.StepNumber > b.StepNumber)
                        return 1;
                    else
                        return 0;
                };
                SchematicDesigner.prototype.editConfigType = function (asset) {
                    asset.ShowEdit = true;
                };
                SchematicDesigner.prototype.cancelClicked = function (asset) {
                    asset.ShowEdit = false;
                };
                SchematicDesigner.prototype.saveConfigValue = function (asset) {
                    if (!this.IsAddpage) {
                        if (asset.ConfigValueId > 0) {
                            var configValueModified = asset.ConfigurationTypeValue;
                            var configValueobj = this.getConfigValueObject(asset.ConfigValueId);
                            if (configValueobj != undefined) {
                                configValueobj.Value = configValueModified;
                                this.processApi.updateConfigValues(configValueobj, "ConfigValueId").subscribe(function (res) {
                                    asset.ShowEdit = false;
                                }, function (error) { alert("error"); }, function () { });
                            }
                        }
                    }
                    else {
                        asset.ShowEdit = false;
                    }
                };
                SchematicDesigner.prototype.deleteConfigType = function (asset) {
                    var _this = this;
                    if (!this.IsAddpage) {
                        var configValueModified = asset.ConfigurationTypeValue;
                        var configValueobj = this.getConfigValueObject(asset.ConfigValueId);
                        if (configValueobj != undefined) {
                            configValueobj.Value = configValueModified;
                            this.processApi.deleteConfigValues(configValueobj, "ConfigValueId").subscribe(function (res) {
                                _this.getSchematicsDetails();
                                asset.ShowEdit = false;
                            }, function (error) {
                                alert("error");
                            }, function () {
                            });
                        }
                    }
                    else {
                        if (this.allSteps[this.sequence - 2].StepAssets.length <= 0) {
                            return;
                        }
                        var location = this.allSteps[this.sequence - 2].StepAssets.indexOf(asset);
                        this.allSteps[this.sequence - 2].StepAssets.splice(location, 1);
                    }
                };
                SchematicDesigner.prototype.getConfigValueObject = function (configValueId) {
                    var result;
                    if (this.allConfigValues.length > 0) {
                        this.allConfigValues.forEach(function (x) {
                            var v1 = x.ConfigValueId;
                            var v2 = configValueId;
                            if (v1 === v2) {
                                result = x;
                            }
                        });
                    }
                    return result;
                };
                SchematicDesigner.prototype.addStepClicked = function () {
                    this.addStepVisibility = true;
                };
                SchematicDesigner.prototype.cancelAddStepClicked = function () {
                    this.addStepVisibility = false;
                };
                SchematicDesigner.prototype.addConfigClicked = function (step) {
                    //       this.addConfigVisibility=true;
                    step.StepAddingConfiguration = true;
                    this.selectedConfigType = "";
                    this.stepSelected(step);
                };
                SchematicDesigner.prototype.stepSelected = function (step) {
                    var unitName = step.UnitName;
                    var result = "";
                    this.allUnitsVM.forEach(function (x) {
                        var v1 = x.description.toLowerCase().replace(/\s+/g, '');
                        var v2 = unitName.toLowerCase().replace(/\s+/g, '');
                        if (v1 === v2) {
                            result = x;
                        }
                    });
                    this.selectedUnit = result;
                    this.allConfigValueTypesVM = this.buildConfigValueTypesVM();
                    step.allConfigValueTypesVM = this.buildConfigValueTypesVM();
                    this.selectedConfigType = this.allConfigValueTypesVM[0];
                };
                SchematicDesigner.prototype.cancelConfigClicked = function (step) {
                    //this.addConfigVisibility=false;
                    step.StepAddingConfiguration = false;
                };
                SchematicDesigner.prototype.saveConfigClicked = function (step, configValueTypeEntry) {
                    var _this = this;
                    // execute next line if user landed on page and did not make any selection from drop down( took default one....)
                    if (step.selectedConfigType === undefined)
                        this.configValueTypeSelected(configValueTypeEntry, step);
                    var configValueTypeId = step.selectedConfigType.id;
                    var data = step.StepAssets.find(function (x) {
                        if (x.ConfigValueTypeId == configValueTypeId) {
                            return x;
                        }
                    });
                    if (data) {
                        this.alert.error("This configValue Type already exists for the step. Please select different ConfigValueType");
                        return;
                    }
                    var schematicStepId = 0;
                    var objSchematicStep = this.allSchematicSteps.find(function (x) {
                        if (x.StepNumber === step.StepNumber)
                            return x;
                    });
                    if (objSchematicStep) {
                        schematicStepId = objSchematicStep.SchematicStepId;
                    }
                    var obj = { ConfigValueTypeId: step.selectedConfigType.id, Value: step.selectedConfigValue, SchematicStepId: schematicStepId };
                    this.processApi.createConfigValues(obj).subscribe(function (res) {
                        _this.addConfigVisibility = false;
                        _this.selectedConfigValue = "";
                        _this.GetSchematicConfiguration();
                    }, function (error) {
                        _this.alert.error(" Error in getting Schematic Steps " + error.status);
                    });
                };
                SchematicDesigner.prototype.inlineDeleteClicked = function (asset) {
                    var _this = this;
                    this.alert.addAlertAndRequestAnswer(appSettings_1.AppNotificationsMSG.deletionQuestionMsg);
                    this.alert.requestConfirmationAnswer$.subscribe(function (answer) {
                        _this.alert.askConfirmation = false;
                        if (answer != "OK")
                            return;
                        var configValueId = asset.ConfigValueId;
                        if (configValueId) {
                            var obj = _this.allConfigValues.find(function (x) {
                                if (x.ConfigValueId === configValueId)
                                    return x;
                            });
                            if (obj) {
                                _this.processApi.deleteConfigValues(obj, "ConfigValueId").subscribe(function (res) {
                                    _this.GetSchematicConfiguration();
                                }, function (error) { _this.alert.error(" Error in deleting ConfigValues " + error.status); });
                            }
                        }
                    });
                };
                SchematicDesigner.prototype.cancelSaveConfigClicked = function () {
                    this.addConfigVisibility = false;
                };
                SchematicDesigner.prototype.stepcheckboxClicked = function (step) {
                    var _this = this;
                    var isStepActivated = false;
                    var oldStepActive = step.StepActive;
                    isStepActivated = step.StepActive ? false : true;
                    var stepMsg = "Do you want to activate the step";
                    if (!isStepActivated) {
                        stepMsg = "Do you want to remove the step?";
                    }
                    this.alert.addAlertAndRequestAnswer(stepMsg);
                    this.alert.requestConfirmationAnswer$.subscribe(function (item) {
                        _this.alert.askConfirmation = false;
                        if (item != "OK") {
                            step.StepActive = oldStepActive;
                            return;
                        }
                        _this.inactivateSchematicStep(step);
                    });
                };
                SchematicDesigner.prototype.inactivateSchematicStep = function (step) {
                    var _this = this;
                    var schematicId = this.selectedSchematic.schematicId;
                    var obj = this.allSchematicSteps.find(function (x) {
                        if (x.SchematicStepId == step.StepAssets[0].SchematicStepId) {
                            return x;
                        }
                    });
                    if (obj) {
                        obj.Active = step.StepActive;
                        this.processApi.updateSchematicStep(obj, "SchematicStepId").subscribe(function (res) {
                            _this.getSchematicStepsBySchematicId(schematicId);
                        }, function (error) { _this.alert.error(" Error in getting Schematic Steps " + error.status); }, function () { });
                    }
                };
                SchematicDesigner.prototype.saveStepClicked = function () {
                    this.addStepVisibility = false;
                    var see = this.allStepsVM;
                    var reverseList = this.allStepsVM.sort(function (a, b) { return b.StepNumber - a.StepNumber; });
                    var newStepNumber = 1;
                    if (reverseList[0]) {
                        newStepNumber = reverseList[0].StepNumber + 1;
                    }
                    var ob = {
                        StepNumber: newStepNumber,
                        StepAssets: [],
                        UnitName: this.selectedUnit.description,
                        isVisible: false,
                    };
                    this.allStepsVM.push(ob);
                    this.allStepsVM.sort(function (a, b) { return a.StepNumber - b.StepNumber; });
                    this.createSchematicStep(newStepNumber);
                };
                SchematicDesigner.prototype.createSchematicStep = function (stepNumber) {
                    var _this = this;
                    var schematicId = this.selectedSchematic.schematicId;
                    var unitId = this.selectedUnit.id;
                    var obj = { SchematicId: schematicId, UnitId: unitId, StepNumber: stepNumber, Active: 1 };
                    this.processApi.createSchematicStep(obj).subscribe(function (res) {
                        _this.getSchematicStepsBySchematicId(schematicId);
                    }, function (error) {
                        _this.alert.error(" Error in creating Schematic Steps " + error.status);
                    });
                };
                SchematicDesigner.prototype.cancellAddStepClicked = function () {
                    this.addStepVisibility = false;
                };
                SchematicDesigner.prototype.confirmDeleteStepClicked = function () {
                    this.deleteStepVisibility = false;
                };
                SchematicDesigner.prototype.addConfigValueToStep = function (step) {
                    var _this = this;
                    var stepNo = step.StepNo - 1;
                    if (this.selectedConfigType != null && this.selectedConfigValue != "") {
                        if (this.allSteps[stepNo] != undefined) {
                            if (this.IsAddpage) {
                                var newObj = { ConfigurationTypeName: this.selectedConfigType.description, ConfigurationTypeValue: this.selectedConfigValue, ConfigValueId: 0, ShowEdit: false };
                                this.allSteps[stepNo].StepAssets.push(newObj);
                                step.ShowAdd = false;
                            }
                            else {
                                var newconfigValueObject = this.ConfigValueJson;
                                newconfigValueObject.ConfigValueTypeId = this.selectedConfigType.id;
                                newconfigValueObject.StepNumber = step.StepNo;
                                newconfigValueObject.SchematicId = this.selectedSchematic.id;
                                newconfigValueObject.Value = this.selectedConfigValue;
                                this.processApi.createConfigValues(newconfigValueObject).subscribe(function (res) {
                                    //updated
                                    _this.GetSchematicConfiguration();
                                    step.ShowAdd = false;
                                }, function (error) { alert("error"); }, function () { });
                            }
                        }
                    }
                };
                SchematicDesigner.prototype.populateConfigTypesFromUnitStep = function () {
                };
                // region Schematic functions
                SchematicDesigner.prototype.saveSchematicClicked = function () {
                    var _this = this;
                    if (!this.selectedProcessName) {
                        return;
                    }
                    this.addSchematicVisibility = false;
                    var obj = { LookupKey: this.selectedProcessName, IsActive: true };
                    this.processApi.createSchematic(obj).subscribe(function (res) {
                        _this.setPageType(false);
                    }, function (error) { alert("error"); }, function () { });
                };
                SchematicDesigner.prototype.addSchematicClicked = function () {
                    if (this.deleteSchematicVisibility) {
                        return;
                    }
                    this.addSchematicVisibility = true;
                };
                SchematicDesigner.prototype.deleteSchematicClicked = function () {
                    var _this = this;
                    this.alert.addAlertAndRequestAnswer(this.appSettingsService.appNotificationsMsg.deactivateSchematicMsg);
                    this.alert.requestConfirmationAnswer$.subscribe(function (item) {
                        _this.alert.askConfirmation = false;
                        if (item != "OK")
                            return;
                        _this.deleteSchematic();
                    });
                };
                SchematicDesigner.prototype.deleteSchematic = function () {
                    var _this = this;
                    if (this.selectedSchematic.schematicId) {
                        var schematicId = this.selectedSchematic.schematicId;
                        var obj = this.allSchematics.find(function (x) {
                            if (x.SchematicId == schematicId) {
                                return x;
                            }
                        });
                        if (obj) {
                            obj.IsActive = false;
                            this.processApi.updateSchematic(obj, "SchematicId").subscribe(function (res) {
                                //updated
                                _this.allSchematicsVM = [];
                                _this.alert.addAlert(_this.appSettingsService.appNotificationsMsg.saveConfirmedMsg);
                                _this.setPageType(false);
                            }, function (error) { _this.alert.error(" Error in deleting Schematic" + error.status); }, function () { });
                        }
                    }
                };
                SchematicDesigner.prototype.cancelDeleteClicked = function () {
                    this.deleteSchematicVisibility = false;
                };
                SchematicDesigner.prototype.cancelSchematicClicked = function () {
                    this.addSchematicVisibility = false;
                    this.selectedProcessName = "";
                };
                SchematicDesigner.prototype.GetSchematicConfiguration = function () {
                    var _this = this;
                    this.allStepsVM = new Array();
                    this.processApi.getSchematicConfiguartionById(this.selectedSchematic.schematicId).subscribe(function (res) {
                        _this.allSchematicConfiguration = res.sort(function (a, b) { return a.StepNumber - b.StepNumber; });
                        var reverseList = res.sort(function (a, b) { return b.StepNumber - a.StepNumber; });
                        if (reverseList) {
                            _this.lastStepNumber = reverseList[0].StepNumber;
                        }
                        _this.buildSchematicSteps();
                    }, function (error) {
                        console.log("Error getting schematic configuration:", error);
                        _this.alert.error("API error : processApi.getSchematicConfiguartionById:" + error._body);
                    }, function () { });
                };
                SchematicDesigner.prototype.previewCancelClicked = function () {
                    this.isPreviewClicked = false;
                };
                SchematicDesigner.prototype.updateJsonValueToModel = function (asset, updatedValue) {
                    var configValueId = asset.ConfigValueId;
                    var configValueTypeId = asset.ConfigValueTypeId;
                    if (configValueId) {
                        var obj = this.allConfigValues.find(function (x) {
                            if (x.ConfigValueId === configValueId)
                                return x;
                        });
                        if (obj) {
                            obj.Value = updatedValue;
                            asset.ConfigurationValue = updatedValue;
                        }
                    }
                };
                SchematicDesigner.prototype.jsonCanceled = function (event, asset) {
                    if (event)
                        asset.isVisible = false;
                };
                SchematicDesigner.prototype.getTemplateByAsset = function (asset) {
                    var configValueTypeId = asset.ConfigValueTypeId;
                    if (configValueTypeId) {
                        var obj = this.allConfigValueTypes.find(function (x) {
                            if (x.ConfigValueTypeId === configValueTypeId)
                                return x;
                        });
                        if (obj) {
                            return obj.Template;
                        }
                    }
                };
                SchematicDesigner.prototype.onSchematicSelected = function (schematic) {
                    this.SchematicSelected(schematic.id);
                };
                /// this method provide seeds input for typeahead component and it will be passed via autocompleteInput object
                SchematicDesigner.prototype.searchSchematics = function () {
                    var _this = this;
                    return function (filter) {
                        return new Promise(function (resolve, reject) {
                            var subscription = _this.processApi.getallSchematics().subscribe(function (res) {
                                _this.allSchematics = res;
                                var outputList = new Array();
                                _this.allSchematics.forEach(function (x) {
                                    if (x.LookupKey.toUpperCase().indexOf(filter.toUpperCase()) > -1 || x.SchematicId == filter || filter.trim() === '')
                                        outputList.push({
                                            'id': x.SchematicId,
                                            'text': x.LookupKey,
                                        });
                                });
                                resolve(outputList);
                                subscription.unsubscribe();
                            }, function (err) { return console.log("Error in search schematics", err); });
                        });
                    };
                };
                SchematicDesigner = __decorate([
                    core_1.Component({
                        templateUrl: '../../../..//Datahub/routes/schematic/designer/schematicDesigner.html',
                        styleUrls: ['../../../../../../resources/Datahub/assets/default.css'],
                        directives: [json_edit_component_1.JsonEdit, typeahead_1.TypeAhead],
                        providers: [schematicService_1.SchematicApiService]
                    }), 
                    __metadata('design:paramtypes', [schematicService_1.SchematicApiService, core_1.ElementRef, appSettingsService_1.AppSettingsService, componentsConfigService_1.ComponentsConfigService, alertService_1.AlertService])
                ], SchematicDesigner);
                return SchematicDesigner;
            }());
            exports_1("SchematicDesigner", SchematicDesigner);
            SchematicItem = (function () {
                function SchematicItem(schematicId, description, Status, isActive) {
                    if (isActive === void 0) { isActive = true; }
                    this.schematicId = schematicId;
                    this.description = description;
                    this.Status = Status;
                    this.isActive = isActive;
                }
                return SchematicItem;
            }());
        }
    }
});
//# sourceMappingURL=schematicDesigner.js.map