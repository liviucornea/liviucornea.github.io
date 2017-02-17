import {
    Component, Output, EventEmitter, ElementRef, Input, ComponentFactoryResolver,
    ComponentRef, ViewChild, ViewContainerRef, SimpleChange
} from "@angular/core";
import {AlertService} from "../../ReusableServices/alertService";
import {sqlQueryBuilder} from "../sqlQueryBuilder/sqlQueryBuilder";
import {AppSettingsService} from "../../ReusableServices/appSettingsService";
import {InterFormsService} from "../../ReusableServices/interFormsService";
import {Subscription} from "rxjs";
import {Ng2Uploader} from "../../ReusableServices/uploadService";
import {HttpAbstract} from "../../ReusableServices/httpAbstract";
import {matrixService} from "../../ReusableServices/matrixService";
import {RuleService} from "../../ReusableServices/ruleService";
import {LocalizationService} from "../../ReusableServices/localizationService";
import {FormatGridColumnPipe} from "../../Datahub/pipes/formatGridColumn";

@Component({
    template: require("./formBuilder.html"),
    selector: 'formBuilder',
})

export class FormBuilder {

    alert: AlertService;
    attributesVM: Array<any>;
    pluginValue: string = "";
    visiblePlugin: boolean = true;
    showValidation: boolean = false;
    enableInsert: boolean = false;
    @Output() formBuilderNotifier = new EventEmitter<any>();
    @Input() title: string = "Form";
    @Input() pluginInput: Array<any> = [];
    @Input() gridSettings: any;
    isEmptyResult: boolean = false;
    editViewRowDataTable: Array<any> = [];
    selectedInput: any;
    @Input('PageType') PageType: string = "view";
    @Input('pageName') pageName: string = "";
    @Input('httpProxy') httpProxy: any;
    @Input('IsHideCancel') IsHideCancel: boolean = false;
    selectionArray: Array<any>;
    elemRef: ElementRef;
    interFormsService: InterFormsService;
    customButtonsList: Array<any> = [];
    uploadService: Ng2Uploader;
    @Input('NodeClass') nodeClass: string;
    cmpRef: ComponentRef<any>;
    @ViewChild('dynamicplugin', {read: ViewContainerRef}) target: ViewContainerRef;
    uploadOptions: any;
    isRulesValidation: boolean = false;
    private outputNotifierObservable: Subscription;
    private uploadCompleteSubscription: Subscription;
    private isPageLoaded: boolean = false;
    constructor(alert: AlertService, elementRef: ElementRef, private appSettingsService: AppSettingsService,
                private apiAbstract: HttpAbstract, private matrixService: matrixService,
                private intFormSvc: InterFormsService, private componentFactoryResolver: ComponentFactoryResolver,
                private uploaderSvc: Ng2Uploader, private ruleService: RuleService, private localizationService: LocalizationService) {
        this.alert = alert;
        this.elemRef = elementRef;
    }

    ngOnInit() {
        this.populateData();
        this.isPageLoaded = true;
    }

    ngOnChanges(changes: {[propName: string]: SimpleChange})
    {
        if(changes['pluginInput'] && this.isPageLoaded)
        {
            let currentValue = changes['pluginInput'].currentValue;
            let oldValue = changes['pluginInput'].previousValue;
            if (currentValue != oldValue) {
                this.populateData();
            }
        }
    }

    populateData()
    {
        let self = this;
        this.editViewRowDataTable = this.pluginInput;
        if (this.gridSettings && this.gridSettings["CustomButtons"]) {
            this.customButtonsList = this.gridSettings["CustomButtons"];
        }

        if (this.gridSettings["RulesConfig"]) {
            this.isRulesValidation = true;
        }

        for (var colInd in this.editViewRowDataTable) {
            var column = this.editViewRowDataTable[colInd];

            var columnConfiguration = this.gridSettings.ColumnConfiguration.find(x => x.dbColumnName.toLowerCase() === column.name.toLowerCase());
            if(columnConfiguration && columnConfiguration.hasOwnProperty("columnFormat")){
                let formatColumnPipe = new FormatGridColumnPipe(this.localizationService);
                column.val = formatColumnPipe.transform(column.val, columnConfiguration.columnFormat);
            }

            if (columnConfiguration && columnConfiguration.htmlControlType === "upload") {
                self.uploadCompleteSubscription = this.uploaderSvc.notifyUploadComplete.subscribe((response) => {
                    self.uploadCompleteNotifier(columnConfiguration.dbColumnName, response);
                });

                if (columnConfiguration.hasOwnProperty("UploadOptions")) {
                    this.uploadOptions = columnConfiguration.UploadOptions;
                }
            }
        }
    }

    ngOnDestroy() {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
        if (this.uploadCompleteSubscription) {
            this.uploadCompleteSubscription.unsubscribe();
        }
    }

    injectDataAndConfig(data: any, config: any, pageType: string) {
        this.gridSettings = config;
        this.PageType = pageType;
        this.editViewRowDataTable = data;
    }

    updatePluginValue() {
        var primaryColumnName = this.matrixService.getPrimaryColumnName(this.gridSettings);
        this.pluginValue = this.matrixService.buildJSONObject(this.editViewRowDataTable, primaryColumnName);
    }

    saveClicked() {

        this.updatePluginValue();
        if (this.ruleService.validateRulesByRulesConfig(this.pluginValue, this.gridSettings["RulesConfig"], this.editViewRowDataTable)) {
            switch (this.PageType.toLowerCase()) {
                case "edit":
                    this.UpdatePage(this.pluginValue);
                    break;
                case "add":
                    this.InsertPage(this.pluginValue);
                    break;
                case "dynamicform":
                    this.customButtonClicked('save');
                    break;
                default:
                    this.returnCallBack("cancel");
            }
        }

    }

    cancelClicked() {
        if (this.PageType.toLowerCase() == 'dynamicform') {
            this.customButtonClicked('cancel');
        }
        else {
            this.returnCallBack("cancel");
        }
    }

    inputClicked(input) {
        if (input === undefined) {
            return;
        }
        if (this.cmpRef) {
            // when the `type` input changes we destroy a previously
            // created component before creating the new one
            this.cmpRef.destroy();
        }

        this.selectedInput = input;
        var inputConfig: any = this.gridSettings.ColumnConfiguration.find(z => z.dbColumnName === input.name);
        if (inputConfig.isComplexTypeInline) {
            input.isToggleable = true;
            this.interFormsService.assignControl(input);
        }
        if (inputConfig.isComplexType) {
            this.selectionArray = inputConfig.selections;

            let factory = this.componentFactoryResolver.resolveComponentFactory(sqlQueryBuilder);
            this.cmpRef = this.target.createComponent(factory);
            this.cmpRef.instance.pluginInput = input.val;
            this.outputNotifierObservable = this.cmpRef.instance.outputNotifier.subscribe((updateValue) => {
                this.UpdateLookupDaysPluginValue(input.sequence, updateValue.value)
            });
        }
    }

    onBlur(input) {
        if (input === undefined) {
            return;
        }

        var inputConfig: any = this.gridSettings.ColumnConfiguration.find(z => z.dbColumnName === input.name);
        if (inputConfig && inputConfig.isEmitEvent) {
            this.updatePluginValue();
            this.formBuilderNotifier.emit({
                value: input.val,
                controlName: input.name
            });
        }
    }

    UpdateLookupDaysPluginValue(seq, input) {
        var data = this.editViewRowDataTable;
        if (data[seq] != undefined) {
            data[seq].val = input;
        }
        this.outputNotifierObservable.unsubscribe();
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

    UpdatePage(returnData) {
        let PrimaryKeyColumn = undefined;
        if (this.httpProxy != undefined) {
            if (this.gridSettings["PrimaryKeyColumn"] != undefined && this.gridSettings["PrimaryKeyColumn"] != "") {
                PrimaryKeyColumn = this.gridSettings["PrimaryKeyColumn"];
            }
            this.httpProxy.ExecuteUpdate(returnData, this.pageName, PrimaryKeyColumn)
                .subscribe(
                    res => {
                        this.alert.addAlert(this.appSettingsService.appNotificationsMsg.saveConfirmedMsg);
                        this.returnCallBack(this.pluginValue);
                    },
                    error => {
                        this.alert.error("async error #" + error.status);
                    },
                    () => {
                    }
                );
        }
    }

    InsertPage(data) {
        if (this.httpProxy != undefined) {
            this.httpProxy.ExecuteInsert(data, this.pageName)
                .subscribe(
                    res => {
                        this.alert.addAlert(this.appSettingsService.appNotificationsMsg.insertMSG);
                        this.returnCallBack(this.pluginValue);
                    },
                    error => {
                        this.alert.error("async error #" + error.status);
                    },
                    () => {
                    }
                );
        }
    }


    returnCallBack(returnData) {
        this.formBuilderNotifier.emit({
            value: returnData
        });
        this.visiblePlugin = false;
    }

    getForeignKeyColumnName() {
        let foreignKeyColumn = "";
        if (this.gridSettings["ForeignKeyColumn"] != undefined && this.gridSettings["ForeignKeyColumn"] != "") {
            foreignKeyColumn = this.gridSettings["ForeignKeyColumn"];
        }
        return foreignKeyColumn;
    }

    getDropDownResult(result, obj) {
        var dropDownId = 0;
        obj.val = result.Value;

        if (obj.name) {
            var tempControl = this.gridSettings.ColumnConfiguration.find(c => c.dbColumnName == obj.name);
            dropDownId = obj.val;

            if (tempControl && tempControl.associatedDropdownControl) {
                var x = this.editViewRowDataTable.find(p => p.name == tempControl.associatedDropdownControl);

                x["customdataSource"] = [];

                var tempdbColumnName = this.matrixService.getdbColumnNameForDataSourceAddress(x.dataSourceAddress);
                var tempCustomDropdownSource = x.masterdataSource.filter(c => c[tempdbColumnName] == dropDownId);

                if (tempCustomDropdownSource) {
                    x["customdataSource"] = this.matrixService.getArrayDataSource(tempCustomDropdownSource, x.dataSourceAddress["displayColumnName"], tempdbColumnName, x.dataSourceAddress["defaultValue"]);
                }
                x.val = "";
            }

            if (this.PageType.toLowerCase() == 'dynamicform') {
                this.customDropDownChanged(obj.name, dropDownId);
            }
        }
    }

   /* getCheckBoxListResult(result, obj) {
        obj.val = result.value.map(opt => opt.value);
        this.updatePluginValue();
    }*/

    customDropDownChanged(controlName, value) {
        this.updatePluginValue();
        this.formBuilderNotifier.emit({
            value: value,
            controlName: controlName
        });
    }

    searchListClicked(controlName, value){
        this.updatePluginValue();
        this.formBuilderNotifier.emit({
            value: value,
            controlName: controlName
        });
    }

    customButtonClicked(customButton) {
        var result = true;
        this.updatePluginValue();

        if (customButton.formValidate) {
            result = this.ruleService.validateRulesByRulesConfig(this.pluginValue, this.gridSettings["RulesConfig"], this.editViewRowDataTable);
        }
        if (result) {
        this.intFormSvc.startSpinner('page', 'Generating report...');
            this.formBuilderNotifier.emit({
                value: this.pluginValue,
                controlName: customButton.name
            });
        }
    }

    private uploadCompleteNotifier(controlName, uploadStatus: any = null) {

        var uploadControl = this.editViewRowDataTable.find(p => p.name == controlName);
        uploadControl.val = uploadStatus;

        this.updatePluginValue();

        this.formBuilderNotifier.emit({
            value: this.pluginValue,
            controlName: controlName
        });
    }

    onChange(output)
    {
        console.log(output);
    }
}