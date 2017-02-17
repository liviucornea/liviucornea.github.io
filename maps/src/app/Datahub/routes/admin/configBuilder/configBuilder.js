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
var forms_1 = require("@angular/forms");
var matrixService_1 = require("../../../../ReusableServices/matrixService");
var interFormsService_1 = require("../../../../ReusableServices/interFormsService");
var appSettingsService_1 = require("../../../../ReusableServices/appSettingsService");
var alertService_1 = require("../../../../ReusableServices/alertService");
var configBuilderColumnConfig_1 = require("./configBuilderColumnConfig");
var configBuilderPageConfig_1 = require("./configBuilderPageConfig");
var configBuilderMetaRules_1 = require("./configBuilderMetaRules");
var FormSchema_1 = require("../../../../ReusableServices/rulesSource/StandardValidation/FormSchema");
var common_1 = require("@angular/common");
var navigationService_1 = require("../../../../ReusableServices/navigationService");
var ConfigBuilder = (function () {
    function ConfigBuilder(elementRef, vmMat, intFormSer, alert, appSettingsService, navService, location) {
        var _this = this;
        this.elementRef = elementRef;
        this.vmMat = vmMat;
        this.intFormSer = intFormSer;
        this.alert = alert;
        this.appSettingsService = appSettingsService;
        this.navService = navService;
        this.location = location;
        this.jsonResult = "Hello";
        this.IsPreview = false;
        this.pageConfig = configBuilderPageConfig_1.ConfigBuilderPageConfig;
        this.columnConfig = configBuilderColumnConfig_1.ConfigBuilderColumnConfig;
        this.configBuilderRuleAndSchema = configBuilderMetaRules_1.ConfigBuilderRuleAndSchema;
        this.ruleObj = new FormSchema_1.JsonSchemaRuleFactory(this.configBuilderRuleAndSchema).CreateRule("ConfigBuilderRuleAndSchema");
        //navService.setCurrentPage(location.path(false));
        //this.dc=dcl;
        this.elemRef = elementRef;
        this.vmMatrix = vmMat;
        this.interFormService = intFormSer;
        this.interFormService.columnInserted.subscribe(function (x) { return _this.columnInserted(x); });
        this.interFormService.pageInserted.subscribe(function (x) { return _this.pageInserted(x); });
        this.objectResult = Object.create(null);
        this.objectResult.ColumnConfiguration = new Array();
        var columnObject = [{
                dbColumnName: "",
                htmlControlType: "text",
                "isVisible": true,
                "isRequired": true,
                "isComplexType": false,
                "displayName": "",
                "dataSourceAddress": "",
                "dataSource": "",
                "regex": "",
                "columnCss": ""
            }];
        var pageObject = [{
                ChildType: "",
                PrimaryKeyColumn: "",
                ForeignKeyColumn: "",
                ShallHideDeleteButton: false,
                ShallHideAddButton: false,
                IsChildPage: true,
                ShowFilterRow: false,
                PaginationPageLimit: "10",
            }];
        var foreignKeyNode = this.columnConfig.find(function (x) { return x.dbColumnName === "dataSourceAddress"; });
        var foreignKeyFirstObject = this.vmMatrix.extractMatrix(foreignKeyNode.isComplexTypeInlineTemplate, foreignKeyNode.isComplexTypeInlineTemplateConfig);
        var foreignKeyHeader = this.vmMatrix.extractHeader(foreignKeyNode.isComplexTypeInlineTemplate, foreignKeyNode.isComplexTypeInlineTemplateConfig);
        var foreignKeyEditViewRowDataTable = this.vmMatrix.editMatrix(foreignKeyFirstObject[0].cells, foreignKeyHeader, foreignKeyNode.isComplexTypeInlineTemplateConfig);
        foreignKeyNode.isComplexTypeInlineTemplate = foreignKeyEditViewRowDataTable;
        this.columnObject = this.vmMatrix.extractMatrix(columnObject, this.columnConfig);
        this.columnHeader = this.vmMatrix.extractHeader(columnObject, this.columnConfig);
        this.columnEditViewRowDataTable = this.vmMatrix.editMatrix(this.columnObject[0].cells, this.columnHeader, this.columnConfig);
        this.firstPageObject = this.vmMatrix.extractMatrix(pageObject, this.pageConfig);
        this.pageHeader = this.vmMatrix.extractHeader(pageObject, this.pageConfig);
        this.pageEditViewRowDataTable = this.vmMatrix.editMatrix(this.firstPageObject[0].cells, this.pageHeader, this.pageConfig);
    }
    ConfigBuilder.prototype.RefreshDataFromFormBuilder = function (updatedValue) {
        console.log(updatedValue);
        if (updatedValue === "cancel") {
            this.cancelClicked();
        }
        else {
            this.PageRefreshFromDynamicComponent(updatedValue);
        }
    };
    ConfigBuilder.prototype.PageRefreshFromDynamicComponent = function (data) {
    };
    ConfigBuilder.prototype.cancelClicked = function () {
    };
    ConfigBuilder.prototype.addPageClicked = function () {
        this.selectedPageType = "configBuilderAddPage";
        this.config = this.pageConfig;
        this.isPageForm = true;
        this.isColumnForm = false;
    };
    ConfigBuilder.prototype.addColumnClicked = function () {
        this.selectedPageType = "configBuilderAddColumn";
        this.config = this.columnConfig;
        this.isPageForm = false;
        this.isColumnForm = true;
    };
    ConfigBuilder.prototype.pageInserted = function (x) {
        ;
        this.objectResult = x;
        this.objectResult.ColumnConfiguration = new Array();
        this.jsonResult = JSON.stringify(this.objectResult);
        this.validateSchema();
    };
    ConfigBuilder.prototype.columnInserted = function (x) {
        var indexPos = this.objectResult.ColumnConfiguration.findIndex(function (y) { return y.dbColumnName.toLowerCase() === x.dbColumnName.toLowerCase(); });
        if (indexPos > -1) {
            this.objectResult.ColumnConfiguration[indexPos] = x;
        }
        else {
            this.objectResult.ColumnConfiguration.push(x);
        }
        this.jsonResult = JSON.stringify(this.objectResult);
        this.validateSchema();
    };
    ConfigBuilder.prototype.validateSchema = function () {
        var result = this.ruleObj.Validate(this.objectResult);
        if (!result.HasErrors) {
            this.schemaValidationResult = "Success";
        }
        else {
            this.schemaValidationResult = "ERRORS:";
        }
    };
    ConfigBuilder.prototype.previewClicked = function () {
        this.IsPreview = !this.IsPreview;
        this.formBuilderheaderTable = this.vmMatrix.extractHeader(null, this.objectResult);
        this.previewEditViewRowTable = this.vmMatrix.getFormBuilderControls(this.objectResult);
    };
    ConfigBuilder.prototype.deleteColumnClicked = function () {
        var _this = this;
        var deletedColumnValue = this.deleteColumnValue;
        if (this.objectResult) {
            var x = this.objectResult.ColumnConfiguration.find(function (x) { return x.dbColumnName.toLowerCase() === _this.deleteColumnValue.toLowerCase(); });
            if (x) {
                this.alert.addAlertAndRequestAnswer(this.appSettingsService.appNotificationsMsg.deletionQuestionMsg);
                this.alert.requestConfirmationAnswer$.subscribe(function (item) {
                    _this.alert.askConfirmation = false;
                    if (item != "OK")
                        return;
                    _this.objectResult.ColumnConfiguration.forEach(function (item, index, object) {
                        if (item.dbColumnName.toLowerCase() === deletedColumnValue.toLowerCase()) {
                            object.splice(index, 1);
                        }
                    });
                    _this.alert.addAlert("column deleted successfully");
                    _this.jsonResult = JSON.stringify(_this.objectResult);
                    _this.validateSchema();
                });
            }
            else {
                this.alert.error("column " + this.deleteColumnValue + " does not exist in json!!!");
            }
        }
    };
    __decorate([
        core_1.ViewChild(forms_1.FormBuilder), 
        __metadata('design:type', forms_1.FormBuilder)
    ], ConfigBuilder.prototype, "formBuilderPreview", void 0);
    ConfigBuilder = __decorate([
        core_1.Component({
            selector: 'login',
            template: require('./configBuilder.html'),
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, matrixService_1.matrixService, interFormsService_1.InterFormsService, alertService_1.AlertService, appSettingsService_1.AppSettingsService, navigationService_1.NavigationService, common_1.Location])
    ], ConfigBuilder);
    return ConfigBuilder;
}());
exports.ConfigBuilder = ConfigBuilder;
//# sourceMappingURL=configBuilder.js.map