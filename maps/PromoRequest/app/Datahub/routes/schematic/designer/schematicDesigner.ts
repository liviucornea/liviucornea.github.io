import {Component,ViewChild, ElementRef, OnInit} from "angular2/core";
import {SchematicApiService} from "../schematicService";
import {AppSettingsService} from "../../../../ReusableServices/appSettingsService";
import {JsonEdit} from "../../../widgets/jsonEdit/json.edit.component";
import {SchematicPreview} from "../schematicpreview/schematicpreview";
import {signalr} from "../../../services/signalr";
import {AlertService} from "../../../../ReusableServices/alertService";
import {ComponentsConfigService} from "../../../../ReusableServices/componentsConfigService";
import {TypeAhead} from "../../../../ReusableComponents/typeahead/typeahead";
import {AppNotificationsMSG} from "../../../../ReusableServices/appSettings";

@Component({
    templateUrl: 'app/Datahub/routes/schematic/designer/schematicDesigner.html',
    styleUrls: ['resources/Datahub/assets/default.css'],
    directives: [SchematicPreview,JsonEdit,  TypeAhead],
    providers: [SchematicApiService, signalr]
})

export class SchematicDesigner implements  OnInit{
    IsAddpage: boolean = false;
    isPreviewClicked: boolean = false;
    ConfigValueJson = { ConfigValueId: 0, SchematicId: 0, StepNumber: 0, ConfigValueTypeId: 0, Value: "", VersionStamp: "" };
    //httpProxy:HttpAbstract;
    appSettingsService: AppSettingsService;
    allSteps: Array<any> = new Array<any>();
    sequence: number = 1;
    controlConfig: any = this.compConfigService.ProcessDesignerConfig;
    allSchematics: Array<any>;
    allSchematicsVM: Array<SchematicItem>;
    allUnits: Array<any>;
    allUnitsVM: Array<any>;
    allConfigValues: Array<any>;
    allSchematicConfiguration: Array<any>;
    allSchematicConfigurationVM: Array<any> = new Array<any>();
    allConfigValueTypes: Array<any>;
    allConfigValueTypesVM: Array<any>;
    allUnitTypes: Array<any>;
    allSchematicSteps:Array<any>;
    allStepsVM:Array<any>;
    addConfigVisibility: boolean = false;
    apiIsLoaded: boolean = false;
    selectedUnit: any;
    selectedConfigType: any;
    selectedConfigValue: any;
    unitFrozen: boolean = false;
    selectedSchematic: any;
    selectedProcessName:string;
    showAdd:boolean=false;
    addSchematicVisibility:boolean=false;
    deleteSchematicVisibility:boolean=false;
    visiblityMatrix:Array<any>;
    lastStepNumber:number;
    deleteStepVisibility:boolean=false;
    elemRef: ElementRef;
    processApi:SchematicApiService;
    schematicIndex:number = 0;
    addStepVisibility:boolean=false;
    autocompleteInput: any;
    self = this;
    @ViewChild(SchematicPreview)
    private schematicPreview:SchematicPreview;

    constructor(private processService: SchematicApiService, private elementRef: ElementRef, private appSettings: AppSettingsService, private compConfigService: ComponentsConfigService, private alert: AlertService) {
        this.appSettingsService=appSettings;
        this.elemRef = elementRef;
        this.processApi=processService;
    }
    ngOnInit() {
        this.pageTypeClicked(false);//edit page
        this.autocompleteInput = new Object();
        this.autocompleteInput.searchSchematics = this.searchSchematics();
    }

    pageTypeClicked(boolValue) {
        this.IsAddpage = boolValue;
        this.apiIsLoaded = false;
        this.allSteps = new Array<any>();
        this.getSchematicDetails();
        this.sequence=1;
    }

   getSchematicDetails() {
        this.processApi.fetchMultipleForSchematics().subscribe(
            res => {
                this.allSchematics = res[0];
                this.allUnits = res[1];
                this.allConfigValueTypes = res[2];
                this.allUnitTypes = res[3];
                this.loadSchematicDesigner();
            }
            , error => {
                console.log("Error getting schematic details:", error);
                this.alert.error("Error getting schematic details:" + error.message);
            },
            () => { }
        );
    }

    loadSchematicDesigner(){
        this.apiIsLoaded = true;
        this.allUnitsVM = this.buildAllUnitsVM();
        this.selectedUnit = this.allUnitsVM[0];
        this.allConfigValueTypesVM = this.buildConfigValueTypesVM();
        this.selectedConfigType = this.allConfigValueTypesVM[0];
        this.allSchematicsVM = this.buildSchematicsVM();
        this.selectedSchematic = this.allSchematicsVM[0];
     // this.allConfigValueTypesVM = this.buildAllConfigValueTypesVM();
        if(this.selectedProcessName && this.selectedProcessName.length > 0)
        {
            var schematicName = this.selectedProcessName;
            var k = this.allSchematicsVM.findIndex(((x) => x.description === schematicName));
            this.schematicIndex = k;
        }
        else {
           this.schematicIndex = 0;
        }
        this.selectedProcessName = "";
        if (this.selectedSchematic.schematicId) {
            this.SchematicSelected(this.selectedSchematic.schematicId);
        };

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
        return newVM;
    }

    buildConfigValueTypesVM(): Array<any> {
        var unitId = this.selectedUnit.id;
        var newconfigs = new Array<any>();
        this.allConfigValueTypes.forEach(function (x) {
            if (x.UnitId === unitId) {
                var newObj = {
                    id: x.ConfigValueTypeId,
                    unitId: x.UnitId,
                    description: x.LookupKey
                };
                newconfigs.push(newObj)
            }
        });
        return newconfigs;
    }
    buildSchematicsVM():Array<SchematicItem> {
        var newVM = new Array<SchematicItem>();
        this.allSchematics.forEach(function (x) {
            if (x.hasOwnProperty('SchematicId')) {
                let schematic = new SchematicItem(x.SchematicId, x.LookupKey, x.IsActive == 0 ? " (InActive)" : "", x.IsActive == 0 ? false : true)
                newVM.push(schematic);
            }
        });
        return newVM;
    }

    SchematicSelected(schematicValue: string) {
        this.previewCancelClicked();
        var schematicId = schematicValue;
        this.selectedSchematic = this.allSchematicsVM.find(function (x) {
            return (x.schematicId === schematicId)
        });
        this.GetSchematicConfiguration();
    }

    configValueTypeSelected(configValueType: any, step : any) {
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
    }

    unitSelected(unitName: any) {
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
    }

    inlineEditClicked(sequenceNo){
        var match=this.visiblityMatrix.find(function(x){return x.Sequence===sequenceNo});
        if (match){
            match.Visibility=!match.Visibility;
        }
    }

    inlineEditSave(asset)
    {
        var configValueId = asset.ConfigValueId;
        let schematicId = this.selectedSchematic.schematicId;
        if(configValueId)
        {
            var obj = this.allConfigValues.find(function(x){
                if(x.ConfigValueId === configValueId)
                    return x;
            });

            if(obj)
            {
                obj.Value = asset.ConfigurationValue;
                this.processApi.updateConfigValues(obj,"ConfigValueId").subscribe(
                    res =>{
                        this.getSchematicStepsBySchematicId(schematicId);
                        //this.buildSchematicSteps();
                        if (!asset.isJSON)
                        this.inlineEditClicked(asset.Sequence);
                    },
                    error =>{
                       this.alert.error("Error in updating ConfigValue " + error.Status);
                    });
            }
        }
    }

    getJson(eventData,asset){
        asset.ConfigurationValue = eventData.value;
        this.inlineEditSave(asset);
    }

    buildSchematicSteps() {
        var sequence=0;
        var visMatrix= new Array<any>();
        let schematicId = this.selectedSchematic.schematicId;
        this.getSchematicStepsBySchematicId(schematicId );
        this.allSchematicConfiguration.forEach(function(x){
            x.Sequence=sequence;
            var visiblitybj={Sequence:sequence,Visibility:false,Editable:false};
            visMatrix.push(visiblitybj);
            sequence++;
        });
        this.visiblityMatrix=visMatrix;
        this.allStepsVM = new Array<any>();
        var maxStepNo =1;
        let self = this;
        while (maxStepNo<=this.lastStepNumber){
            var assets=this.allSchematicConfiguration.filter(x=>{return x.StepNumber===maxStepNo});
            if(assets) {
                assets.forEach(function (x) {
                    let configValue = x.ConfigurationValue.trim();
                    let isJson = configValue.startsWith("{") || configValue.startsWith("[");
                    x.isJSON = isJson;
                    if (isJson) { // get the template
                        x.Template = self.getTemplateByAsset(x);
                    }

                });
            }
            this.allStepsVM.push({StepNumber:maxStepNo,UnitName:assets[0].UnitLookupKey,Visibility:false,StepAssets:assets,StepActive: assets[0].StepActive, StepAddingConfiguration: false});
            maxStepNo++;
        }
    }

    getSchematicStepsBySchematicId(schematicID)
    {
        this.processApi.getSchematicStepsBySchematicId(schematicID).subscribe(
            res => {
                this.allSchematicSteps = res[0];
                this.allConfigValues = res[1].DataTable;
            }
            , error => { this.alert.error(" Error in getting Schematic Steps " + error.status); },
            () => { }
        )

    }
    getConfigUnitNameByConfigValueType(ConfigValueTypeDescription) {
        var result;
        this.allSchematicConfiguration.forEach(function (x) {
            var v1 = x.ConfigValueTypeLookupKey.toLowerCase().replace(/\s+/g, '');
            var v2 = ConfigValueTypeDescription.toLowerCase().replace(/\s+/g, '');
            if (v1 === v2) {
                result = x;
            }
        });
        return result.UnitLookupKey;
    }

    getConfigValueType(configValueTypeId) {
        var result;
        this.allConfigValueTypesVM.forEach(function (x) {
            var v1 = x.id;
            var v2 = configValueTypeId;
            if (v1 === v2) {
                result = x;
            }
        });
        return result;
    }

    addClicked() {
        if (!this.selectedConfigValue){
            return;
        }
        var newObj = { ConfigurationTypeName: this.selectedConfigType.description, ConfigurationTypeValue: this.selectedConfigValue, ConfigValueId: 0, ShowEdit: false };
        var currentStep = this.allSteps.pop();
        this.showAdd=true;
        if (currentStep.UnitName === "") {
            currentStep.UnitName = this.selectedUnit.description
        }
        currentStep.StepAssets.push(newObj);
        this.allSteps.push(currentStep);
        this.unitFrozen = true;
        this.selectedConfigValue="";
    }

    addNewStep() {
        this.showAdd=false;
        this.addAStep();
        this.unitFrozen = false;
        this.selectedConfigValue="";
    }

    addAStep() {
        var stepObj = { StepNo: this.sequence, UnitName: "", StepAssets: [], ShowAdd: false };
        this.allSteps.push(stepObj);
        this.sequence++;
    }

    lowerStep(step) {
        var location = this.allStepsVM.indexOf(step);
        if (location===this.allStepsVM.length-1){
            return;
        }
        var objStepNumber = location+1;
        var currentSchematicStep = this.allSchematicSteps.find(function(x){
            if(x.StepNumber == objStepNumber) {
                return x;
            }
        });

        var nextSchematicStep  = this.allSchematicSteps.find(function(x){
            if(x.StepNumber == (objStepNumber+1)) {
                return x;
            }
        });

        if(currentSchematicStep != undefined)
        {
            currentSchematicStep.StepNumber++;
        }

        if(nextSchematicStep != undefined)
        {
            nextSchematicStep.StepNumber--;
        }

        var currentObj = JSON.stringify(this.allStepsVM[location + 1]);
        var nextObj=this.allStepsVM[location];
        var nextObjCopy=JSON.stringify(nextObj);
        this.allStepsVM[location + 1] =JSON.parse(nextObjCopy);
        this.allStepsVM[location] =JSON.parse(currentObj);
        this.allStepsVM[location + 1].StepNumber++;
        this.allStepsVM[location].StepNumber--;

        this.saveSchematicStepNumber(currentSchematicStep, nextSchematicStep);
    }

    higherStep(step) {
        var location = this.allStepsVM.indexOf(step);
        if (location===0){
            return;
        }

        var objStepNumber = location+1;
        var currentSchematicStep = this.allSchematicSteps.find(function(x){
            if(x.StepNumber == objStepNumber) {
                return x;
            }
        });

        var nextSchematicStep  = this.allSchematicSteps.find(function(x){
            if(x.StepNumber == (objStepNumber-1)) {
                return x;
            }
        });

        if(currentSchematicStep != undefined)
        {
            currentSchematicStep.StepNumber--;
        }

        if(nextSchematicStep != undefined)
        {
            nextSchematicStep.StepNumber++;
        }

        var currentObj = JSON.stringify(this.allStepsVM[location]);
        var nextObj=this.allStepsVM[location-1];
        var nextObjCopy=JSON.stringify(nextObj);
        this.allStepsVM[location] =JSON.parse(nextObjCopy);
        this.allStepsVM[location-1] =JSON.parse(currentObj);
        this.allStepsVM[location -1].StepNumber--;
        this.allStepsVM[location].StepNumber++;

        this.saveSchematicStepNumber(currentSchematicStep, nextSchematicStep);
    }

    saveSchematicStepNumber(currentobj, nextobj)
    {
        var primaryKeyColumn="SchematicStepId";
        let schematicId = this.selectedSchematic.schematicId;
        this.processApi.updateSchematicStep(currentobj,primaryKeyColumn).subscribe(
            res =>  {
                        this.processApi.updateSchematicStep(nextobj,primaryKeyColumn).subscribe(
                            res=>{
                                this.getSchematicStepsBySchematicId(schematicId);
                            }
                            , error => { this.alert.error(" Error in getting Schematic Steps " + error.status); },
                            () => { });
                    }
                    , error => { this.alert.error(" Error in getting Schematic Steps " + error.status); },
                    () => { }
            );
    }

    deleteStep(step: Array<any>) {
        var location = this.allSteps.indexOf(step);
        this.allSteps.splice(location, 1);
        this.sequence--;
        this.allSteps.forEach(function(x){
            x.StepNo=x.StepNo-1;
        });
        if (this.allSteps.length===0){
            this.allUnitsVM = this.buildAllUnitsVM();
            this.allConfigValueTypesVM = this.buildConfigValueTypesVM();
            this.addAStep();
        }
    }

    SortStepNumber(a, b) {
        if (a.StepNumber < b.StepNumber)
            return -1;
        else if (a.StepNumber > b.StepNumber)
            return 1;
        else
            return 0;
    }

    editConfigType(asset) {
        asset.ShowEdit = true;
    }

    cancelClicked(asset) {
        asset.ShowEdit = false;
    }

    saveConfigValue(asset) {
        if (!this.IsAddpage) {
            if (asset.ConfigValueId > 0) {
                var configValueModified = asset.ConfigurationTypeValue;
                var configValueobj = this.getConfigValueObject(asset.ConfigValueId);
                if (configValueobj != undefined) {
                    configValueobj.Value = configValueModified;
                    this.processApi.updateConfigValues(configValueobj, "ConfigValueId").subscribe(
                        res => {
                            asset.ShowEdit = false;
                        }
                        , error => { alert("error"); },
                        () => { }
                    );
                }
            }
        }
        else {
            asset.ShowEdit = false;
        }
    }

    deleteConfigType(asset) {
        if (!this.IsAddpage) {
            var configValueModified = asset.ConfigurationTypeValue;
            var configValueobj = this.getConfigValueObject(asset.ConfigValueId);
            if (configValueobj != undefined) {
                configValueobj.Value = configValueModified;
                this.processApi.deleteConfigValues(configValueobj, "ConfigValueId").subscribe(
                    res => {
                        this.getSchematicDetails();
                        asset.ShowEdit = false;
                    }
                    , error => {
                        alert("error");
                    },
                    () => {
                    }
                );
            }
        }
        else {
            if (this.allSteps[this.sequence - 2].StepAssets.length <= 0) {
                return;
            }
            var location = this.allSteps[this.sequence - 2].StepAssets.indexOf(asset);
            this.allSteps[this.sequence - 2].StepAssets.splice(location, 1);
        }
    }

    getConfigValueObject(configValueId) {
        var result;
        if (this.allConfigValues.length > 0) {
            this.allConfigValues.forEach(function (x)
            {
                var v1 = x.ConfigValueId;
                var v2 = configValueId;
                if (v1 === v2) {
                    result = x;
                }
            });
        }
        return result;
    }
    addStepClicked() {
        this.addStepVisibility=true;
    }

    cancelAddStepClicked()
    {
        this.addStepVisibility=false;
    }
    addConfigClicked(step){
 //       this.addConfigVisibility=true;
        step.StepAddingConfiguration = true;
        this.selectedConfigType = "";
        this.stepSelected(step);
    }

    stepSelected(step: any) {
        let unitName = step.UnitName;
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
        step.allConfigValueTypesVM = this.buildConfigValueTypesVM()
        this.selectedConfigType = this.allConfigValueTypesVM[0];
    }

  cancelConfigClicked(step)
    {
        //this.addConfigVisibility=false;
        step.StepAddingConfiguration = false;
    }

    saveConfigClicked(step:any, configValueTypeEntry: any){
        // execute next line if user landed on page and did not make any selection from drop down( took default one....)
        if (step.selectedConfigType === undefined ) this.configValueTypeSelected(configValueTypeEntry,step);
        var configValueTypeId = step.selectedConfigType.id;
        var data = step.StepAssets.find(function(x)
        {
            if(x.ConfigValueTypeId == configValueTypeId)
            {
                return x;
            }
        });

        if(data)
        {
            this.alert.error("This configValue Type already exists for the step. Please select different ConfigValueType");
            return;
        }
        var schematicStepId = 0;
        var objSchematicStep = this.allSchematicSteps.find(function(x){
           if(x.StepNumber === step.StepNumber)
               return x;
        });
        if(objSchematicStep)
        {
            schematicStepId = objSchematicStep.SchematicStepId;
        }
        var obj = {ConfigValueTypeId:step.selectedConfigType.id, Value: step.selectedConfigValue, SchematicStepId: schematicStepId };

        this.processApi.createConfigValues(obj).subscribe(
            res=>{
                this.addConfigVisibility=false;
                this.selectedConfigValue="";
                this.GetSchematicConfiguration();
            },
            error=>{
                this.alert.error(" Error in getting Schematic Steps " + error.status);
            }
        );
    }

    inlineDeleteClicked(asset)
    {
        this.alert.addAlertAndRequestAnswer(AppNotificationsMSG.deletionQuestionMsg);
        this.alert.requestConfirmationAnswer$.subscribe(answer => {
            this.alert.askConfirmation = false;
            if (answer != "OK")
                return;
            var configValueId = asset.ConfigValueId;
            if(configValueId)
            {
                var obj = this.allConfigValues.find(function(x){
                    if(x.ConfigValueId === configValueId)
                        return x;
                });

                if(obj) {
                    this.processApi.deleteConfigValues(obj,"ConfigValueId").subscribe(
                        res=>{
                            this.GetSchematicConfiguration();
                        },
                        error => { this.alert.error(" Error in deleting ConfigValues " + error.status);}
                    );
                }
            }
        })

    }

    cancelSaveConfigClicked(){
        this.addConfigVisibility=false;
    }

    stepcheckboxClicked(step){
        var isStepActivated: boolean = false;
        var oldStepActive = step.StepActive;
        isStepActivated = step.StepActive ? false : true;

        var stepMsg = "Do you want to activate the step";
        if(!isStepActivated) {
            stepMsg= "Do you want to remove the step?"
        }

        this.alert.addAlertAndRequestAnswer(stepMsg);
        this.alert.requestConfirmationAnswer$.subscribe(item => {
            this.alert.askConfirmation = false;
            if (item != "OK") {
                step.StepActive = oldStepActive;
                return;
            }

            this.inactivateSchematicStep(step);
        });
    }

    inactivateSchematicStep(step)
    {
        let schematicId = this.selectedSchematic.schematicId;
        var obj = this.allSchematicSteps.find(function(x)
                        {
                           if(x.SchematicStepId == step.StepAssets[0].SchematicStepId)
                           {
                               return x;
                           }
                        });
        if(obj)
        {
            obj.Active = step.StepActive;
            this.processApi.updateSchematicStep(obj,"SchematicStepId").subscribe(
                res=>{
                    this.getSchematicStepsBySchematicId(schematicId);
                }
                , error => { this.alert.error(" Error in getting Schematic Steps " + error.status); },
                () => { });
        }
    }

    saveStepClicked(){
        this.addStepVisibility=false;
        var see = this.allStepsVM;
        var reverseList = this.allStepsVM.sort(function(a,b){return b.StepNumber-a.StepNumber;});
        var newStepNumber=1;
        if (reverseList[0]) {
            newStepNumber=reverseList[0].StepNumber+1
        }
        var ob={
            StepNumber:newStepNumber,
            StepAssets:[],
            UnitName:this.selectedUnit.description,
            Visibility:false,
        };
        this.allStepsVM.push(ob);
        this.allStepsVM.sort(function(a,b){return a.StepNumber-b.StepNumber;});
        this.createSchematicStep(newStepNumber);
    }

    createSchematicStep(stepNumber)
    {
        var schematicId = this.selectedSchematic.schematicId;
        var unitId = this.selectedUnit.id;
        var obj = {SchematicId: schematicId, UnitId: unitId, StepNumber: stepNumber, Active: 1};

        this.processApi.createSchematicStep(obj).subscribe(
            res =>
            {
                this.getSchematicStepsBySchematicId(schematicId);
            },
            error =>{
                this.alert.error(" Error in creating Schematic Steps " + error.status);
            }
        );
    }


    cancellAddStepClicked(){
        this.addStepVisibility=false;
    }

    confirmDeleteStepClicked(){
        this.deleteStepVisibility=false;
    }

    addConfigValueToStep(step) {
        var stepNo = step.StepNo - 1;
        if (this.selectedConfigType != null && this.selectedConfigValue != "") {
            if (this.allSteps[stepNo] != undefined)
            {
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

                    this.processApi.createConfigValues(newconfigValueObject).subscribe(
                        res => {
                            //updated
                            this.GetSchematicConfiguration();
                            step.ShowAdd = false;
                        }
                        , error => { alert("error"); },
                        () => { }
                    );
                }
            }
        }
    }

    populateConfigTypesFromUnitStep() {
    }

    // region Schematic functions

    saveSchematicClicked(){

        if (!this.selectedProcessName){
            return;
        }

        this.addSchematicVisibility=false;
        var obj= {LookupKey:this.selectedProcessName,IsActive:true};
        this.processApi.createSchematic(obj).subscribe(
            res => {
                this.pageTypeClicked(false);
            }
            , error => { alert("error"); },
            () => { }
        );

    }
    addSchematicClicked(){
        if (this.deleteSchematicVisibility){
            return;
        }
        this.addSchematicVisibility=true;
    }

    deleteSchematicClicked(){

        this.alert.addAlertAndRequestAnswer(this.appSettingsService.appNotificationsMsg.deactivateSchematicMsg);
        this.alert.requestConfirmationAnswer$.subscribe(item => {
            this.alert.askConfirmation = false;
            if (item != "OK")
                return;
            this.deleteSchematic();
        });
    }

   deleteSchematic(){
        if(this.selectedSchematic.schematicId)
        {
            var schematicId = this.selectedSchematic.schematicId;
            var obj = this.allSchematics.find(function(x)
                            {
                                if(x.SchematicId == schematicId)
                                {
                                    return x;
                                }
                            });
            if(obj)
            {
                obj.IsActive = false;
                this.processApi.updateSchematic(obj,"SchematicId").subscribe(
                  res=>{
                      //updated
                      this.allSchematicsVM = [];
                      this.alert.addAlert( this.appSettingsService.appNotificationsMsg.saveConfirmedMsg);
                      this.pageTypeClicked(false);
                  }
                    , error => { this.alert.error(" Error in deleting Schematic" + error.status);},
                    () => { }
                );
            }
        }
    }

    cancelDeleteClicked()
    {
        this.deleteSchematicVisibility=false;
    }

    cancelSchematicClicked(){
        this.addSchematicVisibility=false;
        this.selectedProcessName="";
    }

    GetSchematicConfiguration() {
        this.allStepsVM= new Array<any>();
        this.processApi.getSchematicConfiguartionById(this.selectedSchematic.schematicId).subscribe(
            res => {
                this.allSchematicConfiguration = res.sort(function(a,b){return a.StepNumber-b.StepNumber;});
                var reverseList = res.sort(function(a,b){return b.StepNumber-a.StepNumber;});
                if (reverseList){
                    this.lastStepNumber=reverseList[0].StepNumber;
                }
                this.buildSchematicSteps();
            }
            , error => {
                console.log("Error getting schematic configuration:", error);
                this.alert.error("API error : processApi.getSchematicConfiguartionById:" + error._body);
            },
            () => { }
        );
    }

    previewSchematicClicked()
    {
        this.isPreviewClicked = true;
        this.schematicPreview.populateWithSchematicDetails(this.selectedSchematic.schematicId, false);
    }
    // endregion Schematic functions

    previewCancelClicked()
    {
        this.isPreviewClicked = false;
  //      this.schematicPreview.populateWithSchematicDetails(0, false);
    }


    updateJsonValueToModel(asset,updatedValue)
    {
        var configValueId = asset.ConfigValueId;
        var configValueTypeId = asset.ConfigValueTypeId;

        if(configValueId) {
             var obj = this.allConfigValues.find(function (x) {
             if (x.ConfigValueId === configValueId)
             return x;
             });
             if(obj)
             {
                 obj.Value = updatedValue;
                 asset.ConfigurationValue = updatedValue;
             }
         }
    }
    jsonCanceled(event,asset){
        if(event) asset.isVisible = false;
    }
    getTemplateByAsset(asset){
        var configValueTypeId = asset.ConfigValueTypeId;
        if(configValueTypeId)
        {
            var obj = this.allConfigValueTypes.find(function (x) {
                if (x.ConfigValueTypeId === configValueTypeId)
                    return x;
            });
            if(obj)
            {
                return obj.Template;
            }
        }
    }
    public onSchematicSelected(schematic: { id:string, text: string }) {
        this.SchematicSelected(schematic.id);
    }
/// this method provide seeds input for typeahead component and it will be passed via autocompleteInput object
    searchSchematics(){
        return (filter: string): Promise<Array<{ id: string, text: string }>> => {
            return new Promise<Array<{ id: string, text: string }>>((resolve, reject) => {
                let subscription = this.processApi.getallSchematics().subscribe(
                    res => {    this.allSchematics = res;
                        let outputList = new Array<any>();
                        this.allSchematics.forEach(function (x) {
                            if (x.LookupKey.toUpperCase().indexOf(filter.toUpperCase()) > -1 || x.SchematicId == filter || filter.trim() === ''  )
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
}
class SchematicItem {
    constructor(
      public  schematicId: string,
      public  description: string,
      public  Status: string,
      public  isActive: boolean = true) {
    }
}