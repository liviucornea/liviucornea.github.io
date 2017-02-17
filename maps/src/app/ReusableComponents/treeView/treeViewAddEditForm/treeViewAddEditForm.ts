import {Component, Output, EventEmitter,Input, ElementRef} from "@angular/core";
import {AlertService} from "../../../ReusableServices/alertService";
import {AppSettingsService} from "../../../ReusableServices/appSettingsService";
import {InterFormsService} from "../../../ReusableServices/interFormsService";
import {RuleService} from "../../../ReusableServices/ruleService";
import {matrixService} from "../../../ReusableServices/matrixService";

@Component({
    template: require("./treeViewAddEditForm.html"),
    selector: 'treeViewAddEditForm',
})

export class treeViewAddEditForm {
    @Input('originalInput') originalInput: any;
    @Input() pluginInput: any;
    @Input() gridSettings: any;
    @Input('PageType') PageType: string = "view";
    @Input('pageName') pageName: string = "";
    @Input('childRulesConfig') childRulesConfig: any;

    alert: AlertService;
    attributesVM: Array<any>;
    pluginValue: string = "";
    visiblePlugin: boolean = true;
    editViewRowDataTable: Array<any>;
    selectionArray: Array<any>;

    elemRef: ElementRef;
    interFormService:InterFormsService;
    @Input('NodeClass') nodeClass: string;

    constructor(alert: AlertService, elementRef: ElementRef,
                private appSettingsService: AppSettingsService, private intFormSer:InterFormsService,private ruleService:RuleService, private matrixService: matrixService) {
        this.alert = alert;
        this.elemRef = elementRef;
        this.interFormService=intFormSer;
    }

    ngOnInit() {
        this.editViewRowDataTable = this.pluginInput;
    }

    injectDataAndConfig(data:any,config:any,pageType:string){
        this.gridSettings=config;
        this.PageType=pageType;
        this.editViewRowDataTable = data;
    }

    cancelClicked(){
        this.interFormService.closeCurrentlyOpenedForm();
    }

    saveClicked() {
        this.ruleService.errorsResultSet=[];
        var formMode = this.interFormService.addEditDeleteMode;
        var temp = {};
        switch (formMode) {
            case "add":
                var newObj = Object.create(Object.prototype);
                temp[this.originalInput.modelName] = [];

                for (var colInd in this.editViewRowDataTable) {
                    this.editViewRowDataTable[colInd]["errors"] = [];
                    var column = this.editViewRowDataTable[colInd];

                    column = this.getDropDownIdValue(column);

                    newObj[column.name] = column.val;
                }

                for (var x in this.originalInput.blankModel){
                    if (x.endsWith("_Id")){
                        newObj[x]=this.originalInput.blankModel[x];
                    }
                }

                newObj["Action"] = "Insert";
                var name = this.originalInput.modelName;
                var ref = this.originalInput[name];
                if (!ref) {
                    ref = this.originalInput.elementList;
                }
                temp[this.originalInput.modelName].push(newObj);

                //Check whether the rules are satisfied
                if(!this.ruleService.checkIfRulesSatisfied(temp, this.ruleService.getRulesByModel(name, this.interFormService.getTreeViewRuleConfig()))) {
                    if(this.ruleService.errorsResultSet && this.ruleService.errorsResultSet.length > 0)
                    {
                        this.ruleService.errorsResultSet.forEach(x=>
                        {
                            var tempRowTable = this.editViewRowDataTable.find(p=>p.name == x.name);
                            if(tempRowTable && x.message.length > 0) {
                                tempRowTable["errors"].push(x.name + "_" + x.message);
                            }
                        });
                    }
                }
                else {
                    if (ref) {
                        ref.push(newObj);
                    }
                    this.interFormService.addEditCompleted.emit("");
                }
                break;
            case "edit":
                var tempObj = Object.assign({},this.originalInput);
                temp[tempObj.mainPageObject[0].modelName] = [];

                for (var colInd in this.editViewRowDataTable) {
                    this.editViewRowDataTable[colInd]["errors"] = [];
                    var column = this.editViewRowDataTable[colInd];
                    column = this.getDropDownIdValue(column);
                    tempObj[column.name] = column.val;
                }
                tempObj["Action"] = "Update";
                temp[tempObj.mainPageObject[0].modelName].push(tempObj);
                if(!this.ruleService.checkIfRulesSatisfied(temp, this.ruleService.getRulesByModel(tempObj.mainPageObject[0].modelName, this.interFormService.getTreeViewRuleConfig()))) {
                    if(this.ruleService.errorsResultSet && this.ruleService.errorsResultSet.length > 0)
                    {
                        this.ruleService.errorsResultSet.forEach(x=>
                        {
                            var tempRowTable = this.editViewRowDataTable.find(p=>p.name == x.name);
                            if(tempRowTable && x.message.length > 0) {
                                tempRowTable["errors"].push(x.name + "_" + x.message);
                            }
                        });
                    }
                }
                else
                {
                    for (var colInd in this.editViewRowDataTable) {
                        var column = this.editViewRowDataTable[colInd];
                        column = this.getDropDownIdValue(column);
                        this.originalInput[column.name] = column.val;
                    }
                    this.originalInput["Action"] = "Update";
                    this.interFormService.addEditCompleted.emit("");
                }
                break;
        }
    }

    getDropDownIdValue(column)
    {
        if(column.dataSourceAddress && column.masterdataSource) {

            var primaryColName = this.matrixService.getdbColumnNameForDataSourceAddress(column.dataSourceAddress);
            column.val = this.matrixService.getDropDownIdValue(column.masterdataSource,primaryColName, primaryColName, column.val);
        }

        return column;

    }

    getDropDownResult(result, obj)
    {
        var dropDownId = 0;
        obj.val = result.Value;

        if(obj.name) {
            var tempControl = this.editViewRowDataTable.find(c=>c.name == obj.name);
            var dbColumnName = "";
            if(tempControl.dataSource){
                dbColumnName = this.matrixService.getdbColumnNameForDataSourceAddress(tempControl.dataSourceAddress);
            }

            var dropDowndata = tempControl.masterdataSource.find(p=>p[dbColumnName] === obj.val);

            if (tempControl && tempControl.associatedDropdownControl) {
                if(dropDowndata)
                {
                    dropDownId = dropDowndata[tempControl.dataSourceAddress.dbColumnName];
                }
                var x = this.editViewRowDataTable.find(p=>p.name == tempControl.associatedDropdownControl);

                x["customdataSource"] = [];

                var tempcustomDropdownSource =[];
                if(dropDowndata && dropDowndata[tempControl.dataSourceAddress.PrimaryKeyColumn]) {
                    tempcustomDropdownSource=x.masterdataSource.filter(c=>c[x.dataSourceAddress.ForeignKeyColumn] == dropDownId);
                }
                else {
                    tempcustomDropdownSource = x.masterdataSource.filter(c=>c[tempControl.dataSourceAddress.dbColumnName] == dropDownId);
                }

                if(tempcustomDropdownSource) {
                    var tempdbColumnName = this.matrixService.getdbColumnNameForDataSourceAddress(x.dataSourceAddress);
                    x["customdataSource"] =  this.matrixService.getArrayDataSource(tempcustomDropdownSource, x.dataSourceAddress["displayColumnName"], tempdbColumnName, x.dataSourceAddress["defaultValue"]);

                }

                x.val="";
            }
        }
    }
}