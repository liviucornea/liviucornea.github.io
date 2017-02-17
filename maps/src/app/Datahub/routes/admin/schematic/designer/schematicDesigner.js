"use strict";
var core_1 = require("@angular/core");
var schematicService_1 = require("../schematicService");
var appSettingsService_1 = require("../../../../../ReusableServices/appSettingsService");
var alertService_1 = require("../../../../../ReusableServices/alertService");
var schematicDesignerUtils_1 = require("./schematicDesignerUtils");
var appSettings_1 = require("../../../../../Configuration/appSettings");
var router_1 = require('@angular/router');
var Subject_1 = require('rxjs/Subject');
var SchematicDesigner = (function (_super) {
    __extends(SchematicDesigner, _super);
    function SchematicDesigner(processService, elementRef, appSettings, alert, route) {
        _super.call(this);
        this.processService = processService;
        this.elementRef = elementRef;
        this.appSettings = appSettings;
        this.alert = alert;
        this.route = route;
        this.appSettingsService = appSettings;
        this.elemRef = elementRef;
        this.processApi = processService;
    }
    SchematicDesigner.prototype.ngOnInit = function () {
        var self = this;
        self.initialDataAnouncedSource = new Subject_1.Subject();
        self.initialDataAnounced$ = self.initialDataAnouncedSource.asObservable();
        self.autocompleteInput = new Object();
        self.autocompleteInput.searchSchematics = this.searchSchematics();
        self.setPageType(false); //edit page
        var id = undefined;
        self.route.params.forEach(function (params) {
            id = params['id'];
        });
        if (id) {
            var subscription_1 = self.initialDataAnounced$.subscribe(function (x) {
                self.SchematicSelected(id);
                subscription_1.unsubscribe();
            });
        }
    };
    SchematicDesigner.prototype.ngOnDestroy = function () {
        this.initialDataAnouncedSource.unsubscribe();
    };
    SchematicDesigner.prototype.setPageType = function (boolValue) {
        this.IsAddpage = boolValue;
        this.apiIsLoaded = false;
        this.allSteps = new Array();
        // get schematics details(data needed to works with schematics...)
        this.getSchematicsDetails();
        this.sequence = 1;
    };
    SchematicDesigner.prototype.getSchematicsDetails = function () {
        var _this = this;
        var self = this;
        this.processApi.fetchMultipleForSchematics().subscribe(function (res) {
            self.allSchematics = res[0];
            self.allUnits = res[1];
            self.allConfigValueTypes = res[2];
            self.allUnitTypes = res[3];
            // go and make VM  objects
            self.loadSchematicDesigner();
            self.initialDataAnouncedSource.next("DataIsObtained");
        }, function (error) {
            console.log("Error getting schematic details:", error);
            _this.alert.error("Error getting schematic details:" + error.message);
        }, function () {
        });
    };
    SchematicDesigner.prototype.loadSchematicDesigner = function () {
        var self = this;
        self.apiIsLoaded = true;
        // set all units (list of possible steps in case user creates new)
        self.allUnitsVM = self.buildAllUnitsVM();
        self.selectedUnit = self.allUnitsVM[0];
        // create list of step configuration elements/components(when you uses adds step configuration , the values available are  from
        // this list (in fact  will be this list minus whatever steo already have )
        self.allConfigValueTypesVM = self.buildConfigValueTypesVM();
        self.selectedConfigType = self.allConfigValueTypesVM[0];
        self.allSchematicsVM = self.buildSchematicsVM();
        if (!self.selectedSchematic) {
            self.selectedSchematic = new schematicDesignerUtils_1.Schematic(null, null, null, false);
        }
        if (self.isNewSchematic) {
            self.SchematicSelected(self.newSchematicDescription);
            self.isNewSchematic = false;
            return;
        }
        if (self.isClone) {
            self.SchematicSelected(self.cloneID.toString());
            self.isClone = false;
            return;
        }
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
        return newVM.sort(schematicDesignerUtils_1.sortByDesc);
    };
    SchematicDesigner.prototype.buildConfigValueTypesVM = function () {
        var unitId = this.selectedUnit.id;
        var newconfigs = new Array();
        this.allConfigValueTypes.forEach(function (x) {
            if (x.UnitId === unitId) {
                var newObj = new schematicDesignerUtils_1.ConfigValueType(x.ConfigValueTypeId, x.UnitId, x.LookupKey, x.Template ? x.Template : '', x.IsMandatory);
                newconfigs.push(newObj);
            }
        });
        return newconfigs.sort(schematicDesignerUtils_1.sortByDesc);
    };
    SchematicDesigner.prototype.buildSchematicsVM = function () {
        var newVM = new Array();
        this.allSchematics.forEach(function (x) {
            if (x.hasOwnProperty('SchematicId')) {
                var schematic = new schematicDesignerUtils_1.Schematic(x.SchematicId, x.LookupKey, x.IsActive == 0 ? "(InActive)" : "", x.IsActive == 0 ? false : true);
                newVM.push(schematic);
            }
        });
        return newVM;
    };
    SchematicDesigner.prototype.SchematicSelected = function (idOrDescription) {
        var self = this;
        self.schematicState = 'neutral';
        var schematicId = idOrDescription;
        self.selectedSchematic = self.allSchematicsVM.find(function (x) {
            return (x.schematicId == schematicId || x.description === idOrDescription);
        });
        self.GetSchematicConfiguration();
    };
    SchematicDesigner.prototype.configValueTypeSelected = function (selectedValue, step) {
        step.isAddingJSON = false;
        step.selectedConfigValue = null;
        var lcConfigValFounded = this.allConfigValueTypesVM.find(function (x) {
            return x.description.toLowerCase().replace(/\s+/g, '') == selectedValue.toLowerCase().replace(/\s+/g, '');
        });
        if (lcConfigValFounded) {
            try {
                if (!lcConfigValFounded.template || lcConfigValFounded.template.length == 0) {
                    step.selectedConfigValue = '';
                    step.selectedConfigType = lcConfigValFounded;
                }
                else {
                    var type = JSON.parse(lcConfigValFounded.template)['#Type#'];
                    if (type) {
                        step.selectedConfigType = lcConfigValFounded;
                        if (type.toUpperCase() == 'ARRAYLIKE') {
                            step.selectedConfigValue = '[[' + schematicDesignerUtils_1.jsonToDoc(lcConfigValFounded.template, step) + ']]';
                            step.isArrayLike = true;
                        }
                        else {
                            step.selectedConfigValue = schematicDesignerUtils_1.jsonToDoc(lcConfigValFounded.template, step);
                            step.isArrayLike = false;
                        }
                        setTimeout(function () {
                            if (step.selectedConfigValue != '')
                                step.isAddingJSON = true;
                        }, 50);
                    }
                }
            }
            catch (err) {
                console.log('Invalid JSON template with no type defined!');
                this.alert.error("Invalid Template : ConfigValueTypeId:" + err.message);
            }
        }
    };
    SchematicDesigner.prototype.unitSelected = function (unitName) {
        var self = this;
        var result = self.allUnitsVM.find(function (u) {
            return u.description.toLowerCase().replace(/\s+/g, '') === unitName.toLowerCase().replace(/\s+/g, '');
        });
        this.selectedUnit = result ? result : '';
        this.allConfigValueTypesVM = this.buildConfigValueTypesVM();
        this.selectedConfigType = this.allConfigValueTypesVM[0];
    };
    SchematicDesigner.prototype.inlineEditClicked = function (sequenceNo) {
        var match = this.visiblityMatrix.find(function (x) {
            return x.Sequence === sequenceNo;
        });
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
                    if (!asset.editByComponent)
                        _this.inlineEditClicked(asset.Sequence);
                }, function (error) {
                    _this.alert.error("Error in updating ConfigValue " + error.Status);
                });
            }
        }
    };
    // method used when you edit an existing asset of type JSON
    SchematicDesigner.prototype.getJson = function (eventData, asset, step) {
        var _this = this;
        var self = this;
        asset.ConfigurationValue = eventData.value;
        self.inlineEditSave(asset);
        asset.isVisible = false;
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
    // method used when you add new asset of type JSON
    SchematicDesigner.prototype.addNewJson = function (eventData, step) {
        step.selectedConfigValue = eventData.value;
    };
    SchematicDesigner.prototype.buildSchematicSteps = function () {
        var _this = this;
        var sequence = 0;
        var visMatrix = new Array();
        var schematicId = this.selectedSchematic.schematicId;
        var self = this;
        self.processApi.getSchematicStepsBySchematicId(schematicId).subscribe(function (res) {
            self.allSchematicSteps = res[0];
            self.allConfigValues = res[1].DataTable;
            self.allSchematicConfiguration.forEach(function (x) {
                x.Sequence = sequence;
                var visiblityObj = { Sequence: sequence, isVisible: false, Editable: false };
                visMatrix.push(visiblityObj);
                sequence++;
            });
            self.visiblityMatrix = visMatrix;
            self.allStepsVM = new Array();
            var maxStepNo = 1;
            // this method is called only by method  self.GetSchematicConfiguration()
            // and there are populated self.lastStepNumber and self.allSchematicConfiguration
            while (maxStepNo <= self.lastStepNumber) {
                var assets = self.allSchematicConfiguration.filter(function (x) {
                    return x.StepNumber === maxStepNo;
                });
                if (assets) {
                    assets.forEach(function (x) {
                        if (x.ConfigurationValue) {
                            try {
                                if (!x.Template || x.Template.length == 0) {
                                    x.editByComponent = false;
                                }
                                else {
                                    var type = JSON.parse(x.Template)['#Type#'];
                                    if (type) {
                                        x.editByComponent = true;
                                        if (type.toUpperCase() == 'ARRAYLIKE') {
                                            x.componentType = type.toUpperCase();
                                        }
                                        else {
                                            x.componentType = 'JsonLike';
                                        }
                                    }
                                    else {
                                        x.editByComponent = false;
                                    }
                                }
                            }
                            catch (err) {
                                console.log('Invalid JSON template with no type defined!');
                                self.alert.error("Invalid Template : ConfigValueTypeId:" + x.ConfigValueTypeId + " : " + x.Template + " - " + err.message);
                                x.editByComponent = false;
                            }
                        }
                        else {
                            x.editByComponent = false;
                        }
                    });
                }
                // get step description
                var step = self.allSchematicSteps.find(function (x) { return x.StepNumber === maxStepNo; });
                var stepIsVisible = false;
                if (self.updatedStep) {
                    if (self.updatedStep.SchematicStepId == step.SchematicStepId && self.updatedStep.StepNumber == maxStepNo && self.updatedStep.SchematicId == schematicId) {
                        stepIsVisible = true;
                        self.updatedStep = undefined;
                    }
                }
                var stepToAdd = new schematicDesignerUtils_1.Step(step.SchematicStepId, maxStepNo, step.StepDescription, schematicId, assets[0].UnitLookupKey);
                stepToAdd.isVisible = stepIsVisible;
                stepToAdd.StepAssets = assets;
                stepToAdd.StepActive = assets[0].StepActive;
                stepToAdd.isComplete = true;
                self.stepSelected(stepToAdd);
                self.allStepsVM.push(stepToAdd);
                maxStepNo++;
            }
        }, function (error) {
            _this.alert.error(" Error in getting Schematic Steps , for schematic id : " + schematicId + error.status);
        }, function () {
        });
    };
    SchematicDesigner.prototype.getSchematicStepsBySchematicId = function (schematicID) {
        var _this = this;
        this.processApi.getSchematicStepsBySchematicId(schematicID).subscribe(function (res) {
            _this.allSchematicSteps = res[0];
            _this.allConfigValues = res[1].DataTable;
        }, function (error) {
            _this.alert.error(" Error in getting Schematic Steps " + error.status);
        }, function () {
        });
    };
    SchematicDesigner.prototype.addClicked = function () {
        if (!this.selectedConfigValue) {
            return;
        }
        var newObj = {
            ConfigurationTypeName: this.selectedConfigType.description,
            ConfigurationTypeValue: this.selectedConfigValue,
            ConfigValueId: 0,
            ShowEdit: false
        };
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
        var _this = this;
        var self = this;
        self.alert.addAlertAndRequestAnswer(appSettings_1.AppNotificationsMSG.schematicLowerStepQuestion, null, 'Step position change:');
        var subscription = self.alert.requestConfirmationAnswer$.subscribe(function (item) {
            self.alert.askConfirmation = false;
            subscription.unsubscribe();
            if (item != "OK") {
                return;
            }
            var location = self.allStepsVM.indexOf(step);
            if (location === self.allStepsVM.length - 1) {
                return;
            }
            var objStepNumber = location + 1;
            var currentSchematicStep = self.allSchematicSteps.find(function (x) {
                if (x.StepNumber == objStepNumber) {
                    return x;
                }
            });
            var nextSchematicStep = self.allSchematicSteps.find(function (x) {
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
            var currentObj = JSON.stringify(_this.allStepsVM[location + 1]);
            var nextObj = self.allStepsVM[location];
            var nextObjCopy = JSON.stringify(nextObj);
            self.allStepsVM[location + 1] = JSON.parse(nextObjCopy);
            self.allStepsVM[location] = JSON.parse(currentObj);
            self.allStepsVM[location + 1].StepNumber++;
            self.allStepsVM[location].StepNumber--;
            self.saveSchematicStepNumber(currentSchematicStep, nextSchematicStep);
        });
    }; // end lower step
    SchematicDesigner.prototype.higherStep = function (step) {
        var _this = this;
        var self = this;
        self.alert.addAlertAndRequestAnswer(appSettings_1.AppNotificationsMSG.schematicHigherStepQuestion, null, 'Step position change:');
        var subscription = self.alert.requestConfirmationAnswer$.subscribe(function (item) {
            self.alert.askConfirmation = false;
            subscription.unsubscribe();
            if (item != "OK") {
                return;
            }
            var location = self.allStepsVM.indexOf(step);
            if (location === 0) {
                return;
            }
            var objStepNumber = location + 1;
            var currentSchematicStep = _this.allSchematicSteps.find(function (x) {
                if (x.StepNumber == objStepNumber) {
                    return x;
                }
            });
            var nextSchematicStep = _this.allSchematicSteps.find(function (x) {
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
            var currentObj = JSON.stringify(_this.allStepsVM[location]);
            var nextObj = _this.allStepsVM[location - 1];
            var nextObjCopy = JSON.stringify(nextObj);
            _this.allStepsVM[location] = JSON.parse(nextObjCopy);
            _this.allStepsVM[location - 1] = JSON.parse(currentObj);
            _this.allStepsVM[location - 1].StepNumber--;
            _this.allStepsVM[location].StepNumber++;
            _this.saveSchematicStepNumber(currentSchematicStep, nextSchematicStep);
        });
    };
    SchematicDesigner.prototype.saveSchematicStepNumber = function (currentobj, nextobj) {
        var _this = this;
        var primaryKeyColumn = "SchematicStepId";
        var schematicId = this.selectedSchematic.schematicId;
        this.processApi.updateSchematicStep(currentobj, primaryKeyColumn).subscribe(function (res) {
            _this.processApi.updateSchematicStep(nextobj, primaryKeyColumn).subscribe(function (res) {
                _this.getSchematicStepsBySchematicId(schematicId);
            }, function (error) {
                _this.alert.error(" Error in getting Schematic Steps " + error.status);
            }, function () {
            });
        }, function (error) {
            _this.alert.error(" Error in getting Schematic Steps " + error.status);
        }, function () {
        });
    };
    SchematicDesigner.prototype.SortStepNumber = function (a, b) {
        if (a.StepNumber < b.StepNumber)
            return -1;
        else if (a.StepNumber > b.StepNumber)
            return 1;
        else
            return 0;
    };
    SchematicDesigner.prototype.getConfigValueObject = function (configValueId) {
        var result;
        var self = this;
        if (this.allConfigValues.length > 0) {
            result = self.allConfigValues.find(function (x) {
                return x.ConfigValueId === configValueId;
            });
        }
        return result;
    };
    SchematicDesigner.prototype.addStepClicked = function () {
        this.addStepVisibility = true;
        this.schematicState = "none";
    };
    SchematicDesigner.prototype.cancelAddStepClicked = function () {
        this.addStepVisibility = false;
    };
    // this is for Add Step Configuration button
    SchematicDesigner.prototype.addStepConfiguration = function (step) {
        step.isCollapsed = false;
        step.StepAddingConfiguration = true;
        this.selectedConfigType = "";
        this.stepSelected(step);
        if (step.allConfigValueTypesVM.length == 0) {
            this.alert.addAlert("Configuration is completed for this step!");
        }
    };
    SchematicDesigner.prototype.stepSelected = function (step) {
        var self = this;
        var unitName = step.UnitName;
        var result = self.allUnitsVM.find(function (u) {
            return u.description.toLowerCase().replace(/\s+/g, '') === unitName.toLowerCase().replace(/\s+/g, '');
        });
        this.selectedUnit = result ? result : "";
        this.allConfigValueTypesVM = this.buildConfigValueTypesVM();
        step.allConfigValueTypesVM = [];
        step.allConfigValueTypesVM = this.buildConfigValueTypesVM().filter(function (x) {
            if (step.StepAssets.find(function (y) {
                return (y.UnitId == x.unitId && y.ConfigValueTypeLookupKey && y.ConfigValueTypeLookupKey.toUpperCase() == x.description.toUpperCase());
            }) === undefined) {
                return x;
            }
        });
        step.isComplete = step.allConfigValueTypesVM.find(function (x) {
            return x.isMandatory;
        }) ? false : true;
        this.selectedConfigType = step.allConfigValueTypesVM[0];
        if (this.selectedConfigType)
            this.configValueTypeSelected(this.selectedConfigType.description, step);
    };
    SchematicDesigner.prototype.cancelConfigClicked = function (step) {
        //this.addConfigVisibility=false;
        step.StepAddingConfiguration = false;
    };
    /// bellow method is called when asset is saved for step
    SchematicDesigner.prototype.saveConfigClicked = function (step, configValueTypeEntry) {
        // execute next line if user landed on page and did not make any selection from drop down( took default one....)
        if (step.selectedConfigType === undefined) {
            this.configValueTypeSelected(configValueTypeEntry, step);
        }
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
        var obj = {
            ConfigValueTypeId: step.selectedConfigType.id,
            Value: step.selectedConfigValue,
            SchematicStepId: schematicStepId
        };
        var self = this;
        self.processApi.createConfigValues(obj).subscribe(function (res) {
            self.addConfigVisibility = false;
            self.selectedConfigValue = "";
            self.updatedStep = new schematicDesignerUtils_1.Step(step.SchematicStepId, step.StepNumber, step.StepDescription, self.selectedSchematic.schematicId);
            self.GetSchematicConfiguration();
        }, function (error) {
            self.alert.error(" Error in getting Schematic Steps " + error.status);
        });
    };
    SchematicDesigner.prototype.inlineDeleteClicked = function (asset) {
        var _this = this;
        var self = this;
        self.alert.addAlertAndRequestAnswer(appSettings_1.AppNotificationsMSG.deletionQuestionMsg);
        var subscription = self.alert.requestConfirmationAnswer$.subscribe(function (answer) {
            self.alert.askConfirmation = false;
            subscription.unsubscribe();
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
                        self.updatedStep = new schematicDesignerUtils_1.Step(asset.SchematicStepId, asset.StepNumber, asset.StepDescription, self.selectedSchematic.schematicId);
                        _this.GetSchematicConfiguration();
                    }, function (error) {
                        _this.alert.error(" Error in deleting ConfigValues " + error.status);
                    });
                }
            }
        });
    };
    SchematicDesigner.prototype.cancelSaveConfigClicked = function () {
        this.addConfigVisibility = false;
    };
    SchematicDesigner.prototype.stepDefinitionUpdate = function (step) {
        var self = this;
        var stepMsg = "Do you want to update step definition ?";
        self.alert.addAlertAndRequestAnswer(stepMsg, null, "Step definition update");
        var subscription = self.alert.requestConfirmationAnswer$.subscribe(function (item) {
            self.alert.askConfirmation = false;
            subscription.unsubscribe();
            if (item != "OK") {
                return;
            }
            self.stepUpdate(step);
        });
    };
    // this method is called to delete the step
    SchematicDesigner.prototype.deleteStep = function (step) {
        var self = this;
        var stepId = step.SchematicStepId;
        self.alert.addAlertAndRequestAnswer(appSettings_1.AppNotificationsMSG.deletionStepQuestion);
        var subscription = self.alert.requestConfirmationAnswer$.subscribe(function (item) {
            self.alert.askConfirmation = false;
            subscription.unsubscribe();
            if (item != "OK") {
                return;
            }
            /// if user answer is OK , than do the job
            self.processApi.deleteStepByStepId(stepId).subscribe(function (res) {
                self.alert.addAlert(appSettings_1.AppNotificationsMSG.deletionStepConfirmation);
                self.setPageType(false);
            }, function (error) {
                self.alert.error(" Error when delete the step:" + error.status);
            }, function () {
            });
        });
    };
    // this method is used just to update step description  and is called in stepDefinitionUpdate  ( see above)
    SchematicDesigner.prototype.stepUpdate = function (step) {
        var self = this;
        var schematicId = self.selectedSchematic.schematicId;
        var obj = self.allSchematicSteps.find(function (x) {
            if (x.SchematicStepId == step.StepAssets[0].SchematicStepId) {
                return x;
            }
        });
        if (obj) {
            obj.Active = step.StepActive;
            obj.StepDescription = step.StepDescription;
            self.processApi.updateSchematicStep(obj, "SchematicStepId").subscribe(function (res) {
                self.getSchematicStepsBySchematicId(schematicId);
                self.alert.addAlert('Step updated!');
            }, function (error) {
                self.alert.error(" Error in getting Schematic Steps " + error.status);
            }, function () {
            });
        }
    };
    // bellow method is used when new step is created
    SchematicDesigner.prototype.saveNewStep = function () {
        if (this.newStepDescription.length < 1) {
            this.alert.error("Step description is required!");
            return;
        }
        this.addStepVisibility = false;
        var reverseList = this.allStepsVM.sort(function (a, b) {
            return b.StepNumber - a.StepNumber;
        });
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
        this.allStepsVM.sort(function (a, b) {
            return a.StepNumber - b.StepNumber;
        });
        this.createSchematicStep(newStepNumber);
    };
    SchematicDesigner.prototype.createSchematicStep = function (stepNumber) {
        var _this = this;
        var schematicId = this.selectedSchematic.schematicId;
        var unitId = this.selectedUnit.id;
        var stepDescription = this.newStepDescription;
        var obj = {
            SchematicId: schematicId,
            UnitId: unitId,
            StepNumber: stepNumber,
            Active: 1,
            StepDescription: stepDescription
        };
        this.processApi.createSchematicStep(obj).subscribe(function (res) {
            _this.GetSchematicConfiguration();
        }, function (error) {
            _this.alert.error(" Error in creating Schematic Steps " + error.status);
        });
    };
    // region Schematic functions
    //
    SchematicDesigner.prototype.saveNewSchematic = function (schematicName) {
        var self = this;
        if (!schematicName) {
            self.alert.addAlert("You need to enter schematic name in order to save it!");
            return;
        }
        self.addSchematicVisibility = false;
        var obj = { LookupKey: schematicName, IsActive: true };
        this.processApi.createSchematic(obj).subscribe(function (res) {
            self.isNewSchematic = true;
            self.newSchematicDescription = schematicName;
            self.setPageType(false);
        }, function (error) {
            alert("error");
        }, function () {
        });
    };
    SchematicDesigner.prototype.addSchematicClicked = function () {
        this.addSchematicVisibility = true;
    };
    SchematicDesigner.prototype.activateSchematic = function (schematic) {
        this.schematicChange(schematic, true);
    };
    SchematicDesigner.prototype.deactivateSchematic = function (schematic) {
        this.schematicChange(schematic, false);
    };
    SchematicDesigner.prototype.changeSchematicDescription = function (schematic) {
        this.schematicChange(schematic, schematic.isActive, schematic.description);
    };
    /// this method is used to activate or deactivate schematic or to update schematic description
    SchematicDesigner.prototype.schematicChange = function (schematic, toStatus, description) {
        var _this = this;
        var self = this;
        var actionTitle = "Deactivate Schematic";
        var errorMsg = " Error when deactive Schematic";
        var question = appSettings_1.AppNotificationsMSG.deactivateSchematicMsg;
        if (toStatus) {
            actionTitle = 'Activate Schematic';
            errorMsg = " Error when activate Schematic";
            question = appSettings_1.AppNotificationsMSG.activateSchematicMsg;
        }
        if (description) {
            actionTitle = 'Schematic name changed';
            errorMsg = " Error when changing schematic name";
            question = appSettings_1.AppNotificationsMSG.schematicNameChangedMsg;
        }
        self.alert.addAlertAndRequestAnswer(question, null, actionTitle);
        var subscription = self.alert.requestConfirmationAnswer$.subscribe(function (item) {
            self.alert.askConfirmation = false;
            subscription.unsubscribe();
            if (item != "OK")
                return;
            /// if user answer is OK , than do the job
            if (self.selectedSchematic.schematicId) {
                var schematicId = schematic.schematicId;
                var obj = self.allSchematics.find(function (x) {
                    if (x.SchematicId == schematicId) {
                        return x;
                    }
                });
                if (obj) {
                    obj.IsActive = toStatus;
                    if (description) {
                        obj.LookupKey = description;
                    }
                    self.processApi.updateSchematic(obj, "SchematicId").subscribe(function (res) {
                        //updated
                        // this.allSchematicsVM = [];
                        _this.alert.addAlert(_this.appSettingsService.appNotificationsMsg.saveConfirmedMsg);
                        _this.setPageType(false);
                    }, function (error) {
                        _this.alert.error(errorMsg + error.status);
                    }, function () {
                    });
                }
            }
        });
    };
    SchematicDesigner.prototype.cancelSchematicClicked = function () {
        this.addSchematicVisibility = false;
        this.selectedProcessName = "";
    };
    SchematicDesigner.prototype.GetSchematicConfiguration = function () {
        var self = this;
        self.allStepsVM = new Array();
        self.processApi.getSchematicConfiguartionById(this.selectedSchematic.schematicId).subscribe(function (res) {
            self.allSchematicConfiguration = res.sort(function (a, b) {
                return a.StepNumber - b.StepNumber;
            });
            var reverseList = res.sort(function (a, b) {
                return b.StepNumber - a.StepNumber;
            });
            if (reverseList.length > 0) {
                self.lastStepNumber = reverseList[0].StepNumber;
            }
            self.buildSchematicSteps();
        }, function (error) {
            console.log("Error getting schematic configuration:", error);
            self.alert.error("API error : processApi.getSchematicConfiguartionById:" + error._body);
        }, function () {
        });
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
    SchematicDesigner.prototype.cloneSchematic = function (schematic) {
        var self = this;
        var schematicId = schematic.schematicId;
        var obj = { 'SchematicId': schematicId };
        self.processApi.cloneSchematicbyId(obj).subscribe(function (res) {
            self.cloneID = res;
            self.isClone = true;
            self.setPageType(false);
            self.alert.addAlert("The schematic has been cloned under id: " + res);
        }, function (error) {
            self.alert.error(" Error trying to clone the schematic # " + schematicId + " - " + error.status);
        }, function () {
        });
    };
    SchematicDesigner.prototype.generateSqlScript = function (schematic) {
        var self = this;
        self.addStepVisibility = false;
        var schematicId = schematic.schematicId;
        self.schematicState = "genSQLScript";
        self.processApi.genSQLScriptBySchematicId(schematicId).subscribe(function (res) {
            self.sqlScript = res;
            self.alert.addAlert("The script has been generated !");
        }, function (error) {
            self.alert.error(" Error trying to generate SQL script for schematic # " + schematicId + " - " + error.status);
        }, function () {
        });
    };
    SchematicDesigner.prototype.closeSQLScriptArea = function () {
        var self = this;
        self.schematicState = "none";
        self.sqlScript = '';
    };
    SchematicDesigner.prototype.showCloneStep = function (step) {
        if (step.state === 'doClone') {
            step.state = 'none';
            return;
        }
        step.state = 'doClone';
        step.isCollapsed = false;
    };
    SchematicDesigner.prototype.doStepClone = function (step, cloneToSchematicID) {
        var self = this;
        if (!cloneToSchematicID) {
            self.alert.error("You need schematic id in order to clone a step!");
            return;
        }
        var stepId = step.SchematicStepId;
        /// bellow object is expected by end point
        var obj = { 'SchematicId': cloneToSchematicID, 'StepId': stepId };
        self.processApi.cloneStepToSchematic(obj).subscribe(function (res) {
            if (res) {
                self.alert.addAlert("The step has been cloned!");
                step.state = 'none';
                self.setPageType(false);
            }
            else {
                self.alert.error(" Error trying to clone step # " + stepId + " - " + ' schematic #' + cloneToSchematicID + ' is not found!');
            }
        }, function (error) {
            self.alert.error(" Error trying to clone step # " + stepId + " - " + error.status);
        }, function () {
        });
    };
    SchematicDesigner.prototype.refreshPage = function () {
        this.setPageType(false);
    };
    SchematicDesigner = __decorate([
        core_1.Component({
            template: require('./schematicDesigner.html'),
            styles: [require('./schematicDesigner.scss')],
        }), 
        __metadata('design:paramtypes', [schematicService_1.SchematicApiService, core_1.ElementRef, appSettingsService_1.AppSettingsService, alertService_1.AlertService, router_1.ActivatedRoute])
    ], SchematicDesigner);
    return SchematicDesigner;
}(schematicDesignerUtils_1.BaseSchematicDesigner));
exports.SchematicDesigner = SchematicDesigner;
//# sourceMappingURL=schematicDesigner.js.map