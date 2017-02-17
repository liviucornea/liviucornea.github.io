//import {FORM_DIRECTIVES} from "angular2/common";
//import {RadioControlValueAccessor} from "../inputControls/radio_value_accessor";
import {Component, Output, EventEmitter, Input, ElementRef,Compiler, ViewContainerRef, ViewChild} from "@angular/core";
import {HttpAbstract} from "../../ReusableServices/httpAbstract";
import {AlertService} from "../../ReusableServices/alertService";
import {sqlQueryBuilder} from "../sqlQueryBuilder/sqlQueryBuilder";
import {AppSettingsService} from "../../ReusableServices/appSettingsService";
import {InterFormsService} from "../../ReusableServices/interFormsService";
import {NgForm} from "@angular/forms";
import {RuleService} from "../../ReusableServices/ruleService";
import {matrixService} from "../../ReusableServices/matrixService";



@Component({
    template: require("./formBuilderInline.html"),
    selector: 'formBuilderInline',
    //directives: [NgForm]//RadioControlValueAccessor
})

export class FormBuilderInline {

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
    selectionArray: Array<any>;
    @ViewChild('placeholder', {read: ViewContainerRef}) viewContainerRef;
    private dc: any;
    //dc: DynamicComponentLoader;
    elemRef: ElementRef;
    interFormService:InterFormsService;

    constructor(private alt: AlertService, private elementRef: ElementRef, public compiler:Compiler,
                private appSettingsService: AppSettingsService, private matrixService: matrixService,
        private intFormSer:InterFormsService, private ruleService: RuleService) {
        this.alert = alt;
        this.elemRef = elementRef;
        //this.dc = dcl;
        this.interFormService=intFormSer;
    }

    ngOnInit() {
        this.editViewRowDataTable = this.pluginInput;
    }

    saveClicked() {
        var primaryColumnName = this.matrixService.getPrimaryColumnName(this.gridSettings);
        this.pluginValue =  this.matrixService.buildJSONObject(this.editViewRowDataTable, primaryColumnName);

        if(this.ruleService.validateRulesByRulesConfig(this.pluginValue,this.gridSettings["RulesConfig"],this.editViewRowDataTable)) {
            this.interFormService.saveValueInControl(this.pluginValue);
        }
    }

    cancelClicked() {
        this.returnCallBack("cancel");
    }

    inputClicked(input) {
        if (input === undefined) {
            return;
        }
        this.selectedInput = input;
        var inputConfig: any = this.gridSettings.ColumnConfiguration.find(z=>z.dbColumnName=== input.name);
        if (inputConfig.isComplexTypeInline) {
            input.isToggleable=true;
        }
        if (inputConfig.isComplexType) {
            this.selectionArray = inputConfig.selections;
            var element = document.getElementById("CustomPlugin");
            if (element === undefined) {

            }
            //Balaji
            /*this.dc.loadIntoLocation(sqlQueryBuilder, this.elemRef, "dynamicplugin").then((component) => {
                component.instance.outputNotifier.subscribe((updateValue) => {
                    this.UpdateLookupDaysPluginValue(input.sequence, updateValue.value)
                });
                component.instance.pluginInput = input.val;
            })*/
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