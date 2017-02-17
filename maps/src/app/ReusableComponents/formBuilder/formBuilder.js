"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var alertService_1 = require("../../ReusableServices/alertService");
var sqlQueryBuilder_1 = require("../sqlQueryBuilder/sqlQueryBuilder");
var appSettingsService_1 = require("../../ReusableServices/appSettingsService");
var interFormsService_1 = require("../../ReusableServices/interFormsService");
var uploadService_1 = require("../../ReusableServices/uploadService");
var httpAbstract_1 = require("../../ReusableServices/httpAbstract");
var matrixService_1 = require("../../ReusableServices/matrixService");
var ruleService_1 = require("../../ReusableServices/ruleService");
var localizationService_1 = require("../../ReusableServices/localizationService");
var formatGridColumn_1 = require("../../Datahub/pipes/formatGridColumn");
var FormBuilder = (function () {
    function FormBuilder(alert, elementRef, appSettingsService, apiAbstract, matrixService, intFormSvc, componentFactoryResolver, uploaderSvc, ruleService, localizationService) {
        this.appSettingsService = appSettingsService;
        this.apiAbstract = apiAbstract;
        this.matrixService = matrixService;
        this.intFormSvc = intFormSvc;
        this.componentFactoryResolver = componentFactoryResolver;
        this.uploaderSvc = uploaderSvc;
        this.ruleService = ruleService;
        this.localizationService = localizationService;
        this.pluginValue = "";
        this.visiblePlugin = true;
        this.showValidation = false;
        this.enableInsert = false;
        this.formBuilderNotifier = new core_1.EventEmitter();
        this.title = "Form";
        this.pluginInput = [];
        this.isEmptyResult = false;
        this.editViewRowDataTable = [];
        this.PageType = "view";
        this.pageName = "";
        this.IsHideCancel = false;
        this.customButtonsList = [];
        this.isRulesValidation = false;
        this.isPageLoaded = false;
        this.alert = alert;
        this.elemRef = elementRef;
    }
    FormBuilder.prototype.ngOnInit = function () {
        this.populateData();
        this.isPageLoaded = true;
    };
    FormBuilder.prototype.ngOnChanges = function (changes) {
        if (changes['pluginInput'] && this.isPageLoaded) {
            var currentValue = changes['pluginInput'].currentValue;
            var oldValue = changes['pluginInput'].previousValue;
            if (currentValue != oldValue) {
                this.populateData();
            }
        }
    };
    FormBuilder.prototype.populateData = function () {
        var self = this;
        this.editViewRowDataTable = this.pluginInput;
        if (this.gridSettings && this.gridSettings["CustomButtons"]) {
            this.customButtonsList = this.gridSettings["CustomButtons"];
        }
        if (this.gridSettings["RulesConfig"]) {
            this.isRulesValidation = true;
        }
        for (var colInd in this.editViewRowDataTable) {
            var column = this.editViewRowDataTable[colInd];
            var columnConfiguration = this.gridSettings.ColumnConfiguration.find(function (x) { return x.dbColumnName.toLowerCase() === column.name.toLowerCase(); });
            if (columnConfiguration && columnConfiguration.hasOwnProperty("columnFormat")) {
                var formatColumnPipe = new formatGridColumn_1.FormatGridColumnPipe(this.localizationService);
                column.val = formatColumnPipe.transform(column.val, columnConfiguration.columnFormat);
            }
            if (columnConfiguration && columnConfiguration.htmlControlType === "upload") {
                self.uploadCompleteSubscription = this.uploaderSvc.notifyUploadComplete.subscribe(function (response) {
                    self.uploadCompleteNotifier(columnConfiguration.dbColumnName, response);
                });
                if (columnConfiguration.hasOwnProperty("UploadOptions")) {
                    this.uploadOptions = columnConfiguration.UploadOptions;
                }
            }
        }
    };
    FormBuilder.prototype.ngOnDestroy = function () {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
        if (this.uploadCompleteSubscription) {
            this.uploadCompleteSubscription.unsubscribe();
        }
    };
    FormBuilder.prototype.injectDataAndConfig = function (data, config, pageType) {
        this.gridSettings = config;
        this.PageType = pageType;
        this.editViewRowDataTable = data;
    };
    FormBuilder.prototype.updatePluginValue = function () {
        var primaryColumnName = this.matrixService.getPrimaryColumnName(this.gridSettings);
        this.pluginValue = this.matrixService.buildJSONObject(this.editViewRowDataTable, primaryColumnName);
    };
    FormBuilder.prototype.saveClicked = function () {
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
    };
    FormBuilder.prototype.cancelClicked = function () {
        if (this.PageType.toLowerCase() == 'dynamicform') {
            this.customButtonClicked('cancel');
        }
        else {
            this.returnCallBack("cancel");
        }
    };
    FormBuilder.prototype.inputClicked = function (input) {
        var _this = this;
        if (input === undefined) {
            return;
        }
        if (this.cmpRef) {
            // when the `type` input changes we destroy a previously
            // created component before creating the new one
            this.cmpRef.destroy();
        }
        this.selectedInput = input;
        var inputConfig = this.gridSettings.ColumnConfiguration.find(function (z) { return z.dbColumnName === input.name; });
        if (inputConfig.isComplexTypeInline) {
            input.isToggleable = true;
            this.interFormsService.assignControl(input);
        }
        if (inputConfig.isComplexType) {
            this.selectionArray = inputConfig.selections;
            var factory = this.componentFactoryResolver.resolveComponentFactory(sqlQueryBuilder_1.sqlQueryBuilder);
            this.cmpRef = this.target.createComponent(factory);
            this.cmpRef.instance.pluginInput = input.val;
            this.outputNotifierObservable = this.cmpRef.instance.outputNotifier.subscribe(function (updateValue) {
                _this.UpdateLookupDaysPluginValue(input.sequence, updateValue.value);
            });
        }
    };
    FormBuilder.prototype.onBlur = function (input) {
        if (input === undefined) {
            return;
        }
        var inputConfig = this.gridSettings.ColumnConfiguration.find(function (z) { return z.dbColumnName === input.name; });
        if (inputConfig && inputConfig.isEmitEvent) {
            this.updatePluginValue();
            this.formBuilderNotifier.emit({
                value: input.val,
                controlName: input.name
            });
        }
    };
    FormBuilder.prototype.UpdateLookupDaysPluginValue = function (seq, input) {
        var data = this.editViewRowDataTable;
        if (data[seq] != undefined) {
            data[seq].val = input;
        }
        this.outputNotifierObservable.unsubscribe();
    };
    FormBuilder.prototype.daysClicked = function (selectionObj) {
        var selectedTag = selectionObj["val"];
        this.selectedInput.val = this.parseInput(this.selectedInput.val, selectedTag);
    };
    FormBuilder.prototype.parseInput = function (controlInput, uiInput) {
        var controlInputArray = controlInput.split(',');
        var newArray = new Array();
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
    };
    FormBuilder.prototype.UpdatePage = function (returnData) {
        var _this = this;
        var PrimaryKeyColumn = undefined;
        if (this.httpProxy != undefined) {
            if (this.gridSettings["PrimaryKeyColumn"] != undefined && this.gridSettings["PrimaryKeyColumn"] != "") {
                PrimaryKeyColumn = this.gridSettings["PrimaryKeyColumn"];
            }
            this.httpProxy.ExecuteUpdate(returnData, this.pageName, PrimaryKeyColumn)
                .subscribe(function (res) {
                _this.alert.addAlert(_this.appSettingsService.appNotificationsMsg.saveConfirmedMsg);
                _this.returnCallBack(_this.pluginValue);
            }, function (error) {
                _this.alert.error("async error #" + error.status);
            }, function () {
            });
        }
    };
    FormBuilder.prototype.InsertPage = function (data) {
        var _this = this;
        if (this.httpProxy != undefined) {
            this.httpProxy.ExecuteInsert(data, this.pageName)
                .subscribe(function (res) {
                _this.alert.addAlert(_this.appSettingsService.appNotificationsMsg.insertMSG);
                _this.returnCallBack(_this.pluginValue);
            }, function (error) {
                _this.alert.error("async error #" + error.status);
            }, function () {
            });
        }
    };
    FormBuilder.prototype.returnCallBack = function (returnData) {
        this.formBuilderNotifier.emit({
            value: returnData
        });
        this.visiblePlugin = false;
    };
    FormBuilder.prototype.getForeignKeyColumnName = function () {
        var foreignKeyColumn = "";
        if (this.gridSettings["ForeignKeyColumn"] != undefined && this.gridSettings["ForeignKeyColumn"] != "") {
            foreignKeyColumn = this.gridSettings["ForeignKeyColumn"];
        }
        return foreignKeyColumn;
    };
    FormBuilder.prototype.getDropDownResult = function (result, obj) {
        var dropDownId = 0;
        obj.val = result.Value;
        if (obj.name) {
            var tempControl = this.gridSettings.ColumnConfiguration.find(function (c) { return c.dbColumnName == obj.name; });
            dropDownId = obj.val;
            if (tempControl && tempControl.associatedDropdownControl) {
                var x = this.editViewRowDataTable.find(function (p) { return p.name == tempControl.associatedDropdownControl; });
                x["customdataSource"] = [];
                var tempdbColumnName = this.matrixService.getdbColumnNameForDataSourceAddress(x.dataSourceAddress);
                var tempCustomDropdownSource = x.masterdataSource.filter(function (c) { return c[tempdbColumnName] == dropDownId; });
                if (tempCustomDropdownSource) {
                    x["customdataSource"] = this.matrixService.getArrayDataSource(tempCustomDropdownSource, x.dataSourceAddress["displayColumnName"], tempdbColumnName, x.dataSourceAddress["defaultValue"]);
                }
                x.val = "";
            }
            if (this.PageType.toLowerCase() == 'dynamicform') {
                this.customDropDownChanged(obj.name, dropDownId);
            }
        }
    };
    /* getCheckBoxListResult(result, obj) {
         obj.val = result.value.map(opt => opt.value);
         this.updatePluginValue();
     }*/
    FormBuilder.prototype.customDropDownChanged = function (controlName, value) {
        this.updatePluginValue();
        this.formBuilderNotifier.emit({
            value: value,
            controlName: controlName
        });
    };
    FormBuilder.prototype.searchListClicked = function (controlName, value) {
        this.updatePluginValue();
        this.formBuilderNotifier.emit({
            value: value,
            controlName: controlName
        });
    };
    FormBuilder.prototype.customButtonClicked = function (customButton) {
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
    };
    FormBuilder.prototype.uploadCompleteNotifier = function (controlName, uploadStatus) {
        if (uploadStatus === void 0) { uploadStatus = null; }
        var uploadControl = this.editViewRowDataTable.find(function (p) { return p.name == controlName; });
        uploadControl.val = uploadStatus;
        this.updatePluginValue();
        this.formBuilderNotifier.emit({
            value: this.pluginValue,
            controlName: controlName
        });
    };
    FormBuilder.prototype.onChange = function (output) {
        console.log(output);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FormBuilder.prototype, "formBuilderNotifier", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FormBuilder.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FormBuilder.prototype, "pluginInput", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FormBuilder.prototype, "gridSettings", void 0);
    __decorate([
        core_1.Input('PageType'), 
        __metadata('design:type', String)
    ], FormBuilder.prototype, "PageType", void 0);
    __decorate([
        core_1.Input('pageName'), 
        __metadata('design:type', String)
    ], FormBuilder.prototype, "pageName", void 0);
    __decorate([
        core_1.Input('httpProxy'), 
        __metadata('design:type', Object)
    ], FormBuilder.prototype, "httpProxy", void 0);
    __decorate([
        core_1.Input('IsHideCancel'), 
        __metadata('design:type', Boolean)
    ], FormBuilder.prototype, "IsHideCancel", void 0);
    __decorate([
        core_1.Input('NodeClass'), 
        __metadata('design:type', String)
    ], FormBuilder.prototype, "nodeClass", void 0);
    __decorate([
        core_1.ViewChild('dynamicplugin', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], FormBuilder.prototype, "target", void 0);
    FormBuilder = __decorate([
        core_1.Component({
            template: require("./formBuilder.html"),
            selector: 'formBuilder',
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, core_1.ElementRef, appSettingsService_1.AppSettingsService, httpAbstract_1.HttpAbstract, matrixService_1.matrixService, interFormsService_1.InterFormsService, core_1.ComponentFactoryResolver, uploadService_1.Ng2Uploader, ruleService_1.RuleService, localizationService_1.LocalizationService])
    ], FormBuilder);
    return FormBuilder;
}());
exports.FormBuilder = FormBuilder;
//# sourceMappingURL=formBuilder.js.map