//import {FORM_DIRECTIVES} from "angular2/common";
import {RadioControlValueAccessor} from "../inputControls/radio_value_accessor";
import {Component, Output, EventEmitter} from "angular2/core";
import {HttpAbstract} from "../../ReusableServices/httpAbstract";
import {AlertService} from "../../ReusableServices/alertService";
import {Input} from "angular2/core";
import {sqlQueryBuilder} from "../sqlQueryBuilder/sqlQueryBuilder";
import {ElementRef} from "angular2/core";
import {DynamicComponentLoader} from "angular2/core";
import {AppSettingsService} from "../../ReusableServices/appSettingsService";
import {FormBuilderInline} from "../formBuilderInline/formBuilderInline";
import {InterFormsService} from "../../ReusableServices/interFormsService";



@Component({
    templateUrl: "app/ReusableComponents/formBuilder/formBuilder.html",
    selector: 'formBuilder',
    directives: [RadioControlValueAccessor,FormBuilderInline]
})

export class FormBuilder {

    alert: AlertService;
    attributesVM: Array<any>;
    pluginValue: string = "";
    visiblePlugin: boolean = true;
    showValidation: boolean = false;
    enableInsert: boolean = false;
    @Output() formBuilderNotifier = new EventEmitter();
    @Input() title: string="Form";
    @Input() pluginInput: any;
    @Input() gridSettings: any;
    isEmptyResult: boolean = false;
    editViewRowDataTable: Array<any>;
    selectedInput: any;
    @Input('PageType') PageType: string = "view";
    @Input('pageName') pageName: string = "";
    @Input('httpProxy') httpProxy: any;
    @Input('IsHideCancel') IsHideCancel: boolean = false;
    selectionArray: Array<any>;
    dc: DynamicComponentLoader;
    elemRef: ElementRef;
    interFormsService:InterFormsService;
    @Input('NodeClass') nodeClass: string;

    constructor(alert: AlertService, elementRef: ElementRef, dcl: DynamicComponentLoader, private appSettingsService: AppSettingsService, private intFormSer:InterFormsService) {
        this.alert = alert;
        this.elemRef = elementRef;
        this.dc = dcl;
        this.interFormsService=intFormSer;
    }

    ngOnInit() {
        this.editViewRowDataTable = this.pluginInput;
    }

    injectDataAndConfig(data:any,config:any,pageType:string){
        this.gridSettings=config;
        this.PageType=pageType;
        this.editViewRowDataTable = data;
    }

    saveClicked() {
        for (var colInd in this.editViewRowDataTable) {
            var column = this.editViewRowDataTable[colInd];
            var type = this.gridSettings.ColumnConfiguration.find(x=>{return x.dbColumnName===column.name});
            if (type.dataSourceAddress !== undefined) {
                var lookupColumnName = type.dataSourceAddress.displayColumnName;
                var lookupRow = type.dataSource.find(function (row) {
                    if (row[lookupColumnName] === column.val) {
                        return row;
                    }
                });
                if(lookupRow !== undefined) {
                    column.val = lookupRow[type.dataSourceAddress.dbColumnName];
                }
            }
        }

        this.pluginValue = this.buildJSONObject();

        switch (this.PageType.toLowerCase()) {
            case "edit":
                this.UpdatePage(this.pluginValue);
                break;
            case "add":
                this.InsertPage(this.pluginValue);
                break;
            case "configcolumn":
                this.interFormsService.columnInserted.emit(this.pluginValue);
                break;
            case "configpage":
                this.interFormsService.pageInserted.emit(this.pluginValue);
                break;
            default:
                this.returnCallBack("cancel");
        }

    }

    cancelClicked() {
        this.returnCallBack("cancel");
    }

    buildJSONObject() {
        var data = this.editViewRowDataTable;
        var jsonValue = '{ ';
        let primaryColumnName = this.getPrimaryColumnName();
        for (var i = 0; i < data.length; i++) {
            var dbName = data[i].name;
            var editedValue = JSON.stringify(data[i].val);
            if(primaryColumnName == dbName && (data[i].val == "" || data[i].val == undefined ))
            {
                editedValue = JSON.stringify(0);
            }
            (i + 1) == data.length ? jsonValue += "\"" + dbName + "\" : " + editedValue : jsonValue += "\"" + dbName + "\" : " + editedValue + ",";
        }
        jsonValue += ' }';

        var returndata = JSON.parse(jsonValue);
        console.log(returndata);
        return returndata;
    }

    inputClicked(input) {
        if (input === undefined) {
            return;
        }
        this.selectedInput = input;
        var inputConfig: any = this.gridSettings.ColumnConfiguration.find(z=>z.dbColumnName=== input.name);
        if (inputConfig.isComplexTypeInline) {
            input.togglable=true;
            this.interFormsService.assignControl(input);
        }
        if (inputConfig.isComplexType) {
            this.selectionArray = inputConfig.selections;
            var element = document.getElementById("CustomPlugin");
            if (element === undefined) {

            }
            this.dc.loadIntoLocation(sqlQueryBuilder, this.elemRef, "dynamicplugin").then((component) => {
                component.instance.outputNotifier.subscribe((updateValue) => {
                    this.UpdateLookupDaysPluginValue(input.sequence, updateValue.value)
                });
                component.instance.pluginInput = input.val;
            })
        }
    }

    UpdateLookupDaysPluginValue(seq, inputvalue) {
        var data = this.editViewRowDataTable;
        if (data[seq] != undefined) {
            data[seq].val = inputvalue;
        }
    }

    daysClicked(selectionObj) {
        var selectedTag = selectionObj["val"];
        this.selectedInput.val = this.parseInput(this.selectedInput.val, selectedTag);
    }

    parseInput(controlInput: string, uiInput: string): string {
        var controlInputArray: Array<string> = controlInput.split(',');
        var newArray: Array<string> = new Array<string>();
        var exists = controlInputArray.find(function (x) {
            return (x === uiInput);
        });
        if (exists) {
            controlInputArray.forEach(function (x) {
                if (x !== uiInput) {
                    newArray.push(x);
                }
            });
            return newArray.toString();
        }
        else {
            controlInputArray.push(uiInput);
            return controlInputArray.toString();
        }
    }

    UpdatePage(returndata) {
        let PrimaryKeyColumn = undefined;
        if (this.httpProxy != undefined) {
            if (this.gridSettings["PrimaryKeyColumn"] != undefined && this.gridSettings["PrimaryKeyColumn"] != "") {
                PrimaryKeyColumn = this.gridSettings["PrimaryKeyColumn"];
            }
            this.httpProxy.ExecuteUpdate(returndata, this.pageName, PrimaryKeyColumn)
                .subscribe(
                    res => {
                        //alert("Record updated successfully");
                        this.alert.addAlert( this.appSettingsService.appNotificationsMsg.saveConfirmedMsg);
                        this.returnCallBack(this.pluginValue);
                    },
                    error => {
                        this.alert.error("async error #" + error.status);
                    },
                    () => { }
                );
        }
    }

    InsertPage(data) {
        if (this.httpProxy != undefined) {
            this.httpProxy.ExecuteInsert(data, this.pageName)
                .subscribe(
                    res => {
                        //  alert("Record inserted successfully");
                        this.alert.addAlert( this.appSettingsService.appNotificationsMsg.insertMSG);
                        this.returnCallBack(this.pluginValue);
                    },
                    error => {
                        this.alert.error("async error #" + error.status);
                    },
                    () => { }
                );
        }
    }

    returnCallBack(returndata) {
        this.formBuilderNotifier.emit({
            value:  returndata
        });
        this.visiblePlugin = false;
    }

    getPrimaryColumnName(){
        let primaryKeyColumn = "Id";
        if (this.gridSettings["PrimaryKeyColumn"] != undefined && this.gridSettings["PrimaryKeyColumn"] != "") {
            primaryKeyColumn = this.gridSettings["PrimaryKeyColumn"];
        }
        return primaryKeyColumn;
    }
}