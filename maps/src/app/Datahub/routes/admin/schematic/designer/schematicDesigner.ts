import {Component, ElementRef, OnInit, OnDestroy, ViewChildren, QueryList} from "@angular/core";
import {SchematicApiService} from "../schematicService";
import {AppSettingsService} from "../../../../../ReusableServices/appSettingsService";
import {AlertService} from "../../../../../ReusableServices/alertService";
import {
    BaseSchematicDesigner as ISchematicDesigner,
    Schematic,
    Step,
    ConfigValueType,
    sortByDesc,
    jsonToDoc
} from "./schematicDesignerUtils";
import {AppNotificationsMSG} from "../../../../../Configuration/appSettings";
import {ActivatedRoute, Params} from '@angular/router';
import {Observable}   from 'rxjs/Observable';
import {Subject}    from 'rxjs/Subject';

@Component({
    template: require('./schematicDesigner.html'),
    styles: [require('./schematicDesigner.scss')],
})

export class SchematicDesigner extends ISchematicDesigner implements OnInit, OnDestroy {

    appSettingsService: AppSettingsService;
    elemRef: ElementRef;
    processApi: SchematicApiService;
    initialDataAnouncedSource: Subject<string>;
    initialDataAnounced$: Observable<string>;

    constructor(private processService: SchematicApiService, private elementRef: ElementRef
        , private appSettings: AppSettingsService, private alert: AlertService, private route: ActivatedRoute) {
        super();
        this.appSettingsService = appSettings;
        this.elemRef = elementRef;
        this.processApi = processService;
    }

    ngOnInit() {
        var self = this;
        self.initialDataAnouncedSource = new Subject<string>();
        self.initialDataAnounced$ = self.initialDataAnouncedSource.asObservable();
        self.autocompleteInput = new Object();
        self.autocompleteInput.searchSchematics = this.searchSchematics();
        self.setPageType(false);//edit page
        var id = undefined;
        self.route.params.forEach((params: Params) => {
            id = params['id'];
        });
        if (id) {
            let subscription = self.initialDataAnounced$.subscribe((x) => {
                    self.SchematicSelected(id);
                    subscription.unsubscribe();
                }
            );
        }
    }

    ngOnDestroy() {
        this.initialDataAnouncedSource.unsubscribe();
    }

    setPageType(boolValue) {
        this.IsAddpage = boolValue;
        this.apiIsLoaded = false;
        this.allSteps = new Array<any>();
        // get schematics details(data needed to works with schematics...)
        this.getSchematicsDetails();
        this.sequence = 1;
    }

    getSchematicsDetails() {
        var self = this;
        this.processApi.fetchMultipleForSchematics().subscribe(
            res => {
                self.allSchematics = res[0];
                self.allUnits = res[1];
                self.allConfigValueTypes = res[2];
                self.allUnitTypes = res[3];
                // go and make VM  objects
                self.loadSchematicDesigner();
                self.initialDataAnouncedSource.next("DataIsObtained");
            }
            , error => {
                console.log("Error getting schematic details:", error);
                this.alert.error("Error getting schematic details:" + error.message);
            },
            () => {
            }
        );
    }

    loadSchematicDesigner() {
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
            self.selectedSchematic = new Schematic(null, null, null, false);
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

    }

    // endregion build

    buildAllUnitsVM(): Array<any> {
        var newVM = new Array<any>();
        this.allUnits.forEach(function (x) {
            newVM.push({
                id: x.UnitId,
                description: x.LookupKey
            })
        });
        return newVM.sort(sortByDesc);
    }

    buildConfigValueTypesVM(): Array<any> {
        var unitId = this.selectedUnit.id;
        let newconfigs = new Array<any>();
        this.allConfigValueTypes.forEach(function (x) {
            if (x.UnitId === unitId) {
                let newObj = new ConfigValueType(x.ConfigValueTypeId, x.UnitId, x.LookupKey, x.Template ? x.Template : '', x.IsMandatory);
                newconfigs.push(newObj)
            }
        });
        return newconfigs.sort(sortByDesc);
    }

    buildSchematicsVM(): Array<Schematic> {
        var newVM = new Array<Schematic>();
        this.allSchematics.forEach(function (x) {
            if (x.hasOwnProperty('SchematicId')) {
                let schematic = new Schematic(x.SchematicId, x.LookupKey, x.IsActive == 0 ? "(InActive)" : "", x.IsActive == 0 ? false : true)
                newVM.push(schematic);
            }
        });
        return newVM;
    }

    SchematicSelected(idOrDescription: string) {
        var self = this;
        self.schematicState = 'neutral';
        var schematicId = idOrDescription;
        self.selectedSchematic = self.allSchematicsVM.find(function (x) {
            return (x.schematicId == schematicId || x.description === idOrDescription)
        });
        self.GetSchematicConfiguration();
    }

    configValueTypeSelected(selectedValue: string, step: any) {
        step.isAddingJSON = false;
        step.selectedConfigValue = null;
        var lcConfigValFounded = this.allConfigValueTypesVM.find((x) => {
            return x.description.toLowerCase().replace(/\s+/g, '') == selectedValue.toLowerCase().replace(/\s+/g, '');
        });
        if (lcConfigValFounded) {
            try {
                if (!lcConfigValFounded.template || lcConfigValFounded.template.length == 0) {
                    step.selectedConfigValue = '';
                    step.selectedConfigType = lcConfigValFounded;
                } else {
                    let type = JSON.parse(lcConfigValFounded.template)['#Type#'];
                    if (type) {
                        step.selectedConfigType = lcConfigValFounded;
                        if (type.toUpperCase() == 'ARRAYLIKE') {
                            step.selectedConfigValue = '[[' + jsonToDoc(lcConfigValFounded.template, step) + ']]';
                            step.isArrayLike = true;
                        } else {
                            step.selectedConfigValue = jsonToDoc(lcConfigValFounded.template, step);
                            step.isArrayLike = false;
                        }

                        setTimeout(() => {
                            if (step.selectedConfigValue != '') step.isAddingJSON = true;
                        }, 50);

                    }
                }

            } catch (err) {
                console.log('Invalid JSON template with no type defined!');
                this.alert.error("Invalid Template : ConfigValueTypeId:" + err.message);
            }

        }
    }

    unitSelected(unitName: any) {
        var self = this;
        var result = self.allUnitsVM.find((u) => {
            return u.description.toLowerCase().replace(/\s+/g, '') === unitName.toLowerCase().replace(/\s+/g, '');
        });
        this.selectedUnit = result ? result : '';
        this.allConfigValueTypesVM = this.buildConfigValueTypesVM();
        this.selectedConfigType = this.allConfigValueTypesVM[0];
    }

    inlineEditClicked(sequenceNo) {
        var match = this.visiblityMatrix.find(function (x) {
            return x.Sequence === sequenceNo
        });
        if (match) {
            match.isVisible = !match.isVisible;
        }
    }

    inlineEditSave(asset) {
        var configValueId = asset.ConfigValueId;
        let schematicId = this.selectedSchematic.schematicId;
        if (configValueId) {
            var obj = this.allConfigValues.find(function (x) {
                if (x.ConfigValueId === configValueId)
                    return x;
            });

            if (obj) {
                obj.Value = asset.ConfigurationValue;
                this.processApi.updateConfigValues(obj, "ConfigValueId").subscribe(
                    res => {
                        this.getSchematicStepsBySchematicId(schematicId);
                        if (!asset.editByComponent)
                            this.inlineEditClicked(asset.Sequence);
                    },
                    error => {
                        this.alert.error("Error in updating ConfigValue " + error.Status);
                    });
            }
        }
    }

// method used when you edit an existing asset of type JSON
    getJson(eventData, asset, step) {
        var self = this;
        asset.ConfigurationValue = eventData.value;
        self.inlineEditSave(asset);
        asset.isVisible = false;
        try {
            let targetAsset = step.StepAssets.find((x) => {
                if (x.editByComponent && x.componentType == 'ARRAYLIKE') {
                    return true;
                }
                ;
                return false
            })
            if (targetAsset && asset.componentType.toUpperCase() == "JSONLIKE") {
                let jsonFromEvent = JSON.parse(eventData.value);
                let targetConfigValue = JSON.parse(targetAsset.ConfigurationValue);
                let settedSections = [];
                let existingSections = [];
                jsonFromEvent.forEach((x) => {
                    settedSections.push('DocPart' + ' - ' + x.DocPart);
                });
                targetConfigValue.forEach((x) => {
                    existingSections.push('DocPart' + ' - ' + x[0].DocPart);
                });

                existingSections.forEach((x) => {
                    if (settedSections.indexOf(x) == -1) {
                        targetAsset.isVisible = true;
                        self.alert.addAlertAndRequestAnswer('Do you want to delete section : ' + x + ' in Column Mapping?', null, 'Delete Section');
                        var subscription = self.alert.requestConfirmationAnswer$.subscribe(answer => {
                            subscription.unsubscribe();
                            if (answer != "OK") {
                                targetAsset.isVisible = false;
                                return;
                            }
                            setTimeout(() => {
                                this.alert.sendSectionForDelete$.emit(x);
                            }, 300);

                        });


                    }
                });

            }
        } catch (Exception) {
            console.log("Unable to delete corresponding section from Column mapping");
        }

    }

// method used when you add new asset of type JSON
    addNewJson(eventData, step) {
        step.selectedConfigValue = eventData.value;
    }

    buildSchematicSteps() {
        var sequence = 0;
        var visMatrix = new Array<any>();
        let schematicId = this.selectedSchematic.schematicId;
        var self = this;
        self.processApi.getSchematicStepsBySchematicId(schematicId).subscribe(
            res => {
                self.allSchematicSteps = res[0];
                self.allConfigValues = res[1].DataTable;
                self.allSchematicConfiguration.forEach(function (x) {
                    x.Sequence = sequence;
                    let visiblityObj = {Sequence: sequence, isVisible: false, Editable: false};
                    visMatrix.push(visiblityObj);
                    sequence++;
                });
                self.visiblityMatrix = visMatrix;
                self.allStepsVM = new Array<any>();
                var maxStepNo = 1;
                // this method is called only by method  self.GetSchematicConfiguration()
                // and there are populated self.lastStepNumber and self.allSchematicConfiguration
                while (maxStepNo <= self.lastStepNumber) {
                    var assets = self.allSchematicConfiguration.filter(x => {
                        return x.StepNumber === maxStepNo
                    });
                    if (assets) {
                        assets.forEach(function (x) {
                            if (x.ConfigurationValue) {
                                try {
                                    if (!x.Template || x.Template.length == 0) {
                                        x.editByComponent = false;
                                    } else {
                                        let type = JSON.parse(x.Template)['#Type#'];
                                        if (type) {
                                            x.editByComponent = true;
                                            if (type.toUpperCase() == 'ARRAYLIKE') {
                                                x.componentType = type.toUpperCase();
                                            } else {
                                                x.componentType = 'JsonLike';
                                            }
                                        } else {
                                            x.editByComponent = false;
                                        }
                                    }

                                } catch (err) {
                                    console.log('Invalid JSON template with no type defined!');
                                    self.alert.error("Invalid Template : ConfigValueTypeId:" + x.ConfigValueTypeId + " : " + x.Template + " - " + err.message);
                                    x.editByComponent = false;
                                }

                            } else {
                                x.editByComponent = false;
                            }
                        });
                    }
                    // get step description
                    var step = self.allSchematicSteps.find((x) => x.StepNumber === maxStepNo);
                    var stepIsVisible = false;
                    if (self.updatedStep) {
                        if (self.updatedStep.SchematicStepId == step.SchematicStepId && self.updatedStep.StepNumber == maxStepNo && self.updatedStep.SchematicId == schematicId) {
                            stepIsVisible = true;
                            self.updatedStep = undefined;
                        }
                    }
                    let stepToAdd = new Step(step.SchematicStepId, maxStepNo, step.StepDescription, schematicId, assets[0].UnitLookupKey);
                    stepToAdd.isVisible = stepIsVisible;
                    stepToAdd.StepAssets = assets;
                    stepToAdd.StepActive = assets[0].StepActive;
                    stepToAdd.isComplete = true;

                    self.stepSelected(stepToAdd);
                    self.allStepsVM.push(stepToAdd);
                    maxStepNo++;
                }
            }
            , error => {
                this.alert.error(" Error in getting Schematic Steps , for schematic id : " + schematicId + error.status);
            },
            () => {
            }
        )
    }

    getSchematicStepsBySchematicId(schematicID) {
        this.processApi.getSchematicStepsBySchematicId(schematicID).subscribe(
            res => {
                this.allSchematicSteps = res[0];
                this.allConfigValues = res[1].DataTable;
            }
            , error => {
                this.alert.error(" Error in getting Schematic Steps " + error.status);
            },
            () => {
            }
        )

    }

    addClicked() {
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
            currentStep.UnitName = this.selectedUnit.description
        }
        currentStep.StepAssets.push(newObj);
        this.allSteps.push(currentStep);
        this.unitFrozen = true;
        this.selectedConfigValue = "";
    }

    addNewStep() {
        this.showAdd = false;
        this.addAStep();
        this.unitFrozen = false;
        this.selectedConfigValue = "";
    }

    addAStep() {
        var stepObj = {StepNo: this.sequence, UnitName: "", StepAssets: [], ShowAdd: false};
        this.allSteps.push(stepObj);
        this.sequence++;
    }

    lowerStep(step) {
        var self = this;
        self.alert.addAlertAndRequestAnswer(AppNotificationsMSG.schematicLowerStepQuestion, null, 'Step position change:');
        var subscription = self.alert.requestConfirmationAnswer$.subscribe(item => {
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

            var currentObj = JSON.stringify(this.allStepsVM[location + 1]);
            var nextObj = self.allStepsVM[location];
            var nextObjCopy = JSON.stringify(nextObj);
            self.allStepsVM[location + 1] = JSON.parse(nextObjCopy);
            self.allStepsVM[location] = JSON.parse(currentObj);
            self.allStepsVM[location + 1].StepNumber++;
            self.allStepsVM[location].StepNumber--;
            self.saveSchematicStepNumber(currentSchematicStep, nextSchematicStep);

        });

    } // end lower step

    higherStep(step) {
        var self = this;
        self.alert.addAlertAndRequestAnswer(AppNotificationsMSG.schematicHigherStepQuestion, null, 'Step position change:');
        var subscription = self.alert.requestConfirmationAnswer$.subscribe(item => {
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
        });

    }

    saveSchematicStepNumber(currentobj, nextobj) {
        var primaryKeyColumn = "SchematicStepId";
        let schematicId = this.selectedSchematic.schematicId;
        this.processApi.updateSchematicStep(currentobj, primaryKeyColumn).subscribe(
            res => {
                this.processApi.updateSchematicStep(nextobj, primaryKeyColumn).subscribe(
                    res => {
                        this.getSchematicStepsBySchematicId(schematicId);
                    }
                    , error => {
                        this.alert.error(" Error in getting Schematic Steps " + error.status);
                    },
                    () => {
                    });
            }
            , error => {
                this.alert.error(" Error in getting Schematic Steps " + error.status);
            },
            () => {
            }
        );
    }


    SortStepNumber(a, b) {
        if (a.StepNumber < b.StepNumber)
            return -1;
        else if (a.StepNumber > b.StepNumber)
            return 1;
        else
            return 0;
    }

    getConfigValueObject(configValueId) {
        var result;
        var self = this;
        if (this.allConfigValues.length > 0) {
            result = self.allConfigValues.find((x) => {
                return x.ConfigValueId === configValueId;
            })
        }
        return result;
    }

    addStepClicked() {
        this.addStepVisibility = true;
        this.schematicState = "none";
    }

    cancelAddStepClicked() {
        this.addStepVisibility = false;

    }

    // this is for Add Step Configuration button
    addStepConfiguration(step) {
        step.isCollapsed = false;
        step.StepAddingConfiguration = true;
        this.selectedConfigType = "";
        this.stepSelected(step);
        if (step.allConfigValueTypesVM.length == 0) {
            this.alert.addAlert("Configuration is completed for this step!");
        }
    }

    stepSelected(step: any) {
        var self = this;
        var unitName = step.UnitName;
        var result = self.allUnitsVM.find((u) => {
            return u.description.toLowerCase().replace(/\s+/g, '') === unitName.toLowerCase().replace(/\s+/g, '');
        });

        this.selectedUnit = result ? result : "";
        this.allConfigValueTypesVM = this.buildConfigValueTypesVM();
        step.allConfigValueTypesVM = [];
        step.allConfigValueTypesVM = this.buildConfigValueTypesVM().filter((x) => {
                if (step.StepAssets.find((y) => {
                        return (y.UnitId == x.unitId && y.ConfigValueTypeLookupKey && y.ConfigValueTypeLookupKey.toUpperCase() == x.description.toUpperCase() )
                    }) === undefined) {
                    return x;
                }
            }
        );
        step.isComplete = step.allConfigValueTypesVM.find((x) => {
            return x.isMandatory;
        }) ? false : true;
        this.selectedConfigType = step.allConfigValueTypesVM[0];
        if (this.selectedConfigType)
            this.configValueTypeSelected(this.selectedConfigType.description, step);
    }

    cancelConfigClicked(step) {
        //this.addConfigVisibility=false;
        step.StepAddingConfiguration = false;
    }

/// bellow method is called when asset is saved for step
    saveConfigClicked(step: any, configValueTypeEntry: any) {
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
        self.processApi.createConfigValues(obj).subscribe(
            res => {
                self.addConfigVisibility = false;
                self.selectedConfigValue = "";
                self.updatedStep = new Step(step.SchematicStepId, step.StepNumber, step.StepDescription, self.selectedSchematic.schematicId);
                self.GetSchematicConfiguration();
            },
            error => {
                self.alert.error(" Error in getting Schematic Steps " + error.status);
            }
        );
    }

    inlineDeleteClicked(asset) {
        var self = this;
        self.alert.addAlertAndRequestAnswer(AppNotificationsMSG.deletionQuestionMsg);
        var subscription = self.alert.requestConfirmationAnswer$.subscribe(answer => {
            self.alert.askConfirmation = false;
            subscription.unsubscribe();
            if (answer != "OK")
                return;
            var configValueId = asset.ConfigValueId;
            if (configValueId) {
                var obj = this.allConfigValues.find(function (x) {
                    if (x.ConfigValueId === configValueId)
                        return x;
                });

                if (obj) {
                    this.processApi.deleteConfigValues(obj, "ConfigValueId").subscribe(
                        res => {
                            self.updatedStep = new Step(asset.SchematicStepId, asset.StepNumber, asset.StepDescription, self.selectedSchematic.schematicId);
                            this.GetSchematicConfiguration();
                        },
                        error => {
                            this.alert.error(" Error in deleting ConfigValues " + error.status);
                        }
                    );
                }
            }
        })

    }

    cancelSaveConfigClicked() {
        this.addConfigVisibility = false;
    }

    stepDefinitionUpdate(step: Step) {
        var self = this;
        var stepMsg = "Do you want to update step definition ?";
        self.alert.addAlertAndRequestAnswer(stepMsg, null, "Step definition update");
        var subscription = self.alert.requestConfirmationAnswer$.subscribe(item => {
            self.alert.askConfirmation = false;
            subscription.unsubscribe();
            if (item != "OK") {
                return;
            }
            self.stepUpdate(step);
        });
    }

// this method is called to delete the step
    deleteStep(step: Step) {
        var self = this;
        let stepId = step.SchematicStepId;
        self.alert.addAlertAndRequestAnswer(AppNotificationsMSG.deletionStepQuestion);
        var subscription = self.alert.requestConfirmationAnswer$.subscribe(item => {
            self.alert.askConfirmation = false;
            subscription.unsubscribe();
            if (item != "OK") {
                return;
            }
            /// if user answer is OK , than do the job
            self.processApi.deleteStepByStepId(stepId).subscribe(
                res => {
                    self.alert.addAlert(AppNotificationsMSG.deletionStepConfirmation);
                    self.setPageType(false);
                }
                , error => {
                    self.alert.error(" Error when delete the step:" + error.status);
                },
                () => {
                });
        });
    }

// this method is used just to update step description  and is called in stepDefinitionUpdate  ( see above)
    stepUpdate(step: Step) {
        var self = this;
        let schematicId = self.selectedSchematic.schematicId;
        var obj = self.allSchematicSteps.find(function (x) {
            if (x.SchematicStepId == step.StepAssets[0].SchematicStepId) {
                return x;
            }
        });
        if (obj) {
            obj.Active = step.StepActive;
            obj.StepDescription = step.StepDescription;
            self.processApi.updateSchematicStep(obj, "SchematicStepId").subscribe(
                res => {
                    self.getSchematicStepsBySchematicId(schematicId);
                    self.alert.addAlert('Step updated!');
                }
                , error => {
                    self.alert.error(" Error in getting Schematic Steps " + error.status);
                },
                () => {
                });
        }
    }

// bellow method is used when new step is created
    saveNewStep() {
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
            newStepNumber = reverseList[0].StepNumber + 1
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
    }

    createSchematicStep(stepNumber) {
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

        this.processApi.createSchematicStep(obj).subscribe(
            res => {
                this.GetSchematicConfiguration();
            },
            error => {
                this.alert.error(" Error in creating Schematic Steps " + error.status);
            }
        );
    }

    // region Schematic functions
//
    saveNewSchematic(schematicName: string) {
        var self = this;
        if (!schematicName) {
            self.alert.addAlert("You need to enter schematic name in order to save it!");
            return;
        }
        self.addSchematicVisibility = false;
        var obj = {LookupKey: schematicName, IsActive: true};
        this.processApi.createSchematic(obj).subscribe(
            res => {
                self.isNewSchematic = true;
                self.newSchematicDescription = schematicName;
                self.setPageType(false);
            }
            , error => {
                alert("error");
            },
            () => {
            }
        );

    }

    addSchematicClicked() {
        this.addSchematicVisibility = true;
    }

    activateSchematic(schematic: any) {
        this.schematicChange(schematic, true);
    }

    deactivateSchematic(schematic: any) {
        this.schematicChange(schematic, false);
    }

    changeSchematicDescription(schematic: any) {
        this.schematicChange(schematic, schematic.isActive, schematic.description);
    }

/// this method is used to activate or deactivate schematic or to update schematic description
    schematicChange(schematic: any, toStatus: boolean, description?: string) {
        var self = this;
        var actionTitle = "Deactivate Schematic";
        var errorMsg = " Error when deactive Schematic";
        var question = AppNotificationsMSG.deactivateSchematicMsg;
        if (toStatus) {
            actionTitle = 'Activate Schematic';
            errorMsg = " Error when activate Schematic";
            question = AppNotificationsMSG.activateSchematicMsg;
        }
        if (description) {
            actionTitle = 'Schematic name changed';
            errorMsg = " Error when changing schematic name";
            question = AppNotificationsMSG.schematicNameChangedMsg;
        }
        self.alert.addAlertAndRequestAnswer(question, null, actionTitle);
        var subscription = self.alert.requestConfirmationAnswer$.subscribe(item => {
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
                    self.processApi.updateSchematic(obj, "SchematicId").subscribe(
                        res => {
                            //updated
                            // this.allSchematicsVM = [];
                            this.alert.addAlert(this.appSettingsService.appNotificationsMsg.saveConfirmedMsg);
                            this.setPageType(false);
                        }
                        , error => {
                            this.alert.error(errorMsg + error.status);
                        },
                        () => {
                        }
                    );
                }
            }

        });
    }

    cancelSchematicClicked() {
        this.addSchematicVisibility = false;
        this.selectedProcessName = "";
    }

    GetSchematicConfiguration() {
        var self = this;
        self.allStepsVM = new Array<any>();
        self.processApi.getSchematicConfiguartionById(this.selectedSchematic.schematicId).subscribe(
            res => {
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
            }
            , error => {
                console.log("Error getting schematic configuration:", error);
                self.alert.error("API error : processApi.getSchematicConfiguartionById:" + error._body);
            },
            () => {
            }
        );
    }

    jsonCanceled(event, asset) {
        if (event) asset.isVisible = false;
    }

    getTemplateByAsset(asset) {
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
    }

    public onSchematicSelected(schematic: {id: string, text: string}) {
        this.SchematicSelected(schematic.id);
    }

/// this method provide seeds input for typeahead component and it will be passed via autocompleteInput object
    searchSchematics() {
        return (filter: string): Promise<Array<{id: string, text: string}>> => {
            return new Promise<Array<{id: string, text: string}>>((resolve, reject) => {
                let subscription = this.processApi.getallSchematics().subscribe(
                    res => {
                        this.allSchematics = res;
                        let outputList = new Array<any>();
                        this.allSchematics.forEach(function (x) {
                            if (x.LookupKey.toUpperCase().indexOf(filter.toUpperCase()) > -1 || x.SchematicId == filter || filter.trim() === '')
                                outputList.push({
                                    'id': x.SchematicId,
                                    'text': x.LookupKey,
                                })
                        });
                        resolve(outputList);
                        subscription.unsubscribe();

                    },
                    err => console.log("Error in search schematics", err)
                );
            });
        };
    }

    cloneSchematic(schematic: any) {
        var self = this;
        let schematicId = schematic.schematicId;
        let obj = {'SchematicId': schematicId};
        self.processApi.cloneSchematicbyId(obj).subscribe(
            res => {
                self.cloneID = res;
                self.isClone = true;
                self.setPageType(false);
                self.alert.addAlert("The schematic has been cloned under id: " + res);
            }
            , error => {
                self.alert.error(" Error trying to clone the schematic # " + schematicId + " - " + error.status);
            },
            () => {
            });
    }

    generateSqlScript(schematic: any) {
        var self = this;
        self.addStepVisibility = false;
        let schematicId = schematic.schematicId;
        self.schematicState = "genSQLScript";
        self.processApi.genSQLScriptBySchematicId(schematicId).subscribe(
            res => {
                self.sqlScript = res;
                self.alert.addAlert("The script has been generated !");
            }
            , error => {
                self.alert.error(" Error trying to generate SQL script for schematic # " + schematicId + " - " + error.status);
            },
            () => {
            });
    }

    closeSQLScriptArea() {
        var self = this;
        self.schematicState = "none";
        self.sqlScript = '';

    }

    showCloneStep(step: Step) {
        if (step.state === 'doClone') {
            step.state = 'none';
            return;
        }
        step.state = 'doClone';
        step.isCollapsed = false;
    }

    doStepClone(step: Step, cloneToSchematicID: number) {
        var self = this;
        if (!cloneToSchematicID) {
            self.alert.error("You need schematic id in order to clone a step!")
            return;
        }

        let stepId = step.SchematicStepId;
        /// bellow object is expected by end point
        let obj = {'SchematicId': cloneToSchematicID, 'StepId': stepId};
        self.processApi.cloneStepToSchematic(obj).subscribe(
            res => {
                if (res) {
                    self.alert.addAlert("The step has been cloned!");
                    step.state = 'none';
                    self.setPageType(false);
                } else {
                    self.alert.error(" Error trying to clone step # " + stepId + " - " + ' schematic #' + cloneToSchematicID + ' is not found!');
                }
            }
            , error => {
                self.alert.error(" Error trying to clone step # " + stepId + " - " + error.status);
            },
            () => {
            });
    }

    refreshPage() {
        this.setPageType(false);
    }
}