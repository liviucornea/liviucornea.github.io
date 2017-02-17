//import {FORM_DIRECTIVES} from "angular2/common";
import {Component, Output, EventEmitter,Input} from "@angular/core";
import {InterFormsService} from "../../../ReusableServices/interFormsService";
import {matrixService} from "../../../ReusableServices/matrixService";
import {AlertService} from "../../../ReusableServices/alertService";
import {AppSettingsService} from "../../../ReusableServices/appSettingsService";
import {RuleService} from "../../../ReusableServices/ruleService";



@Component({
    template: require("./treeViewChildrenParser.html"),
    selector: 'treeViewChildrenParser',

})

export class treeViewChildrenParser {

    @Input() title: string="Form";
    @Input() pluginInput: any;
    @Input() gridSettings: any;
    editViewRowDataTable: Array<any>;
    interFormService:InterFormsService;
    @Input('children') children: any;
    elementList: any;
    indentLevel: any;
    @Input('NodeClass') nodeClass: string;
    addEditClicked:boolean=false;
    matrixService:matrixService;
    addEditObject:any;
    addEditObjectConfig:any;
    show:any;
    currentLevel:number;
    PageType:any;
    mainModelName:any;
    editAddClicked:boolean;
    originalInput:any;
    canAddDelete:boolean;
    @Input()subChild: boolean = false;

    constructor(private matSV:matrixService,private intFormSer:InterFormsService, private alert: AlertService,
                private appSettingsService: AppSettingsService, private ruleService:RuleService) {
        this.interFormService=intFormSer;
        this.matrixService=matSV;
        this.show=false;
        this.currentLevel=3;
        this.canAddDelete=true;
        this.interFormService.currentThreeLevelChange.subscribe(x=>this.levelChanged(x));
    }

    levelChanged(x){
        this.currentLevel=x+2;
    }

    addClicked(line){
        this.interFormService.closeCurrentlyOpenedForm();
        this.interFormService.addEditDeleteMode="add";
        this.deleteAddEditCalled(line,"add");
        this.interFormService.setCurrentForm(line);
    }

    deleteClicked(line){

        line.Action="Delete";
        this.interFormService.addEditDeleteMode="delete";
        var deletedModelName = line.mainPageObject[0].modelName;

        this.ruleService.errorsResultSet=[];
        var temp = {};
        var tempObj;
        var deletedObj = [];
        var updatedObj;
        var validatedModelName;

        if(line.level > 2) {

            tempObj = JSON.parse(this.children.parentModel);
            temp[this.children.parentModelName] = [];

            deletedObj = tempObj[deletedModelName];

            deletedObj.find(p=>p[deletedModelName + "_Id"] == line[deletedModelName + "_Id"]).Action = "Delete";

            updatedObj = deletedObj.filter(p=>p.Action != "Delete");
            tempObj[deletedModelName] = updatedObj;

            temp[this.children.parentModelName].push(tempObj);

            validatedModelName = this.children.parentModelName;
        }
        else{
            tempObj = Object.assign({},JSON.parse(JSON.stringify( this.interFormService.getTreeViewApiResult())));
            temp[this.mainModelName] = [];

            deletedObj = tempObj[this.mainModelName][deletedModelName];

            updatedObj = deletedObj.filter(p=>p.Action != "Delete");

            tempObj[this.mainModelName][deletedModelName] = updatedObj;

            temp[this.mainModelName].push(tempObj);

            validatedModelName = this.mainModelName;
        }


        if(!this.ruleService.checkIfRulesSatisfied(temp, this.ruleService.getRulesByModel(validatedModelName, this.interFormService.getTreeViewRuleConfig()))) {
            if(this.ruleService.errorsResultSet && this.ruleService.errorsResultSet.length > 0)
            {
                this.alert.warn("Cannot delete a record. At least one " + deletedModelName + " is required !");
                line.Action = "Read";
            }
         }
        else {
            this.alert.addAlertAndRequestAnswer(this.appSettingsService.appNotificationsMsg.deletionQuestionMsg);
            let subscription = this.alert.requestConfirmationAnswer$.subscribe(answer => {
                subscription.unsubscribe();
                this.alert.askConfirmation = false;
                if (answer != "OK")
                {
                    line.Action = "Read";
                    return;
                }

                this.interFormService.formBuilderDeleteNotifier.emit(line);
            });
        }
    }

    editClicked(line){
        this.interFormService.closeCurrentlyOpenedForm();
        this.interFormService.addEditDeleteMode="edit";
        line.editDetail=!line.editDetail;
        line.viewDetail=false;
        this.deleteAddEditCalled(line,"edit");
        this.interFormService.setCurrentForm(line);
    }

    moreClicked(line){
        line.editDetail=false;
        line.viewDetail=!line.viewDetail;
    }

    ngOnInit() {

        this.elementList = [];
        if(this.children && this.children.elementList)
        {
            this.elementList=this.children.elementList;
            this.mainModelName = this.interFormService.getMainModelName();
            if(!this.subChild)
            this.canAddDelete=this.children.modelName!==this.interFormService.getMainModelName();
            else
                this.canAddDelete = true;
        }
        else {
            this.editViewRowDataTable = this.pluginInput;
        }
        this.indentLevel = new Array(this.children.indent);
    }

    childClicked(ln){
        ln.elementList.forEach(x=>{
            x.expanded=!x.expanded;
        });
        this.interFormService.setCurrentTreeLeve(ln.level);
    }


    deleteAddEditCalled(selectedRecord:any,op:string){
        switch (op){
            case "edit":
                this.editAddClicked=true;
                var modelName=selectedRecord.mainPageObject[0].modelName;
                this.pluginInput=selectedRecord.mainPageObject[0].blankModel;
                this.gridSettings=selectedRecord.mainPageObject[0].blankModelConfig;
                this.originalInput=selectedRecord;
                let target=selectedRecord;
                for (var dataKey in  this.pluginInput) {
                    var val =target[dataKey];
                    this.pluginInput[dataKey] = val;
                }
                var mainPageObjectArray=new Array<any>();
                mainPageObjectArray.push(this.pluginInput);
                var configObj=Object.create(Object.prototype);
                configObj["Definitions"]=new Array<any>();
                configObj["Definitions"].push({"ColumnDefinitions":this.gridSettings,"ModelName":modelName});
                var skipList=this.interFormService.getSkipList();
                var mainPage = this.matrixService.extractMatrixNew(skipList,modelName,mainPageObjectArray, configObj);
                var mainHeader = this.matrixService.extractHeaderNew(skipList,modelName,mainPageObjectArray, configObj);
                this.addEditObject = this.matrixService.editMatrixNew(skipList,modelName,mainPage[0].cells, mainHeader, configObj);
                break;
            case "add":
                this.editAddClicked=true;
                this.pluginInput=selectedRecord.blankModel;
                this.gridSettings=selectedRecord.blankModelConfig;
                this.originalInput=selectedRecord;
                var mainPageObjectArray=new Array<any>();
                mainPageObjectArray.push(selectedRecord.blankModel);
                var configObj=Object.create(Object.prototype);
                configObj["Definitions"]=new Array<any>();
                configObj["Definitions"].push({"ColumnDefinitions":selectedRecord.blankModelConfig,"ModelName":selectedRecord.modelName});
                var skipList=this.interFormService.getSkipList();
                var mainPage = this.matrixService.extractMatrixNew(skipList,selectedRecord.modelName,mainPageObjectArray, configObj);
                var mainHeader = this.matrixService.extractHeaderNew(skipList,selectedRecord.modelName,mainPageObjectArray, configObj);
                this.addEditObject = this.matrixService.editMatrixNew(skipList,selectedRecord.modelName,mainPage[0].cells, mainHeader, configObj);
                selectedRecord.addDetail=true;
                break;
            case "delete":
                break;
        }
    }
}