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
//import {FORM_DIRECTIVES} from "angular2/common";
//import {RadioControlValueAccessor} from "../inputControls/radio_value_accessor";
var core_1 = require("@angular/core");
var alertService_1 = require("../../ReusableServices/alertService");
var appSettingsService_1 = require("../../ReusableServices/appSettingsService");
var interFormsService_1 = require("../../ReusableServices/interFormsService");
var ruleService_1 = require("../../ReusableServices/ruleService");
var matrixService_1 = require("../../ReusableServices/matrixService");
var FormBuilderInline = (function () {
    function FormBuilderInline(alt, elementRef, compiler, appSettingsService, matrixService, intFormSer, ruleService) {
        this.alt = alt;
        this.elementRef = elementRef;
        this.compiler = compiler;
        this.appSettingsService = appSettingsService;
        this.matrixService = matrixService;
        this.intFormSer = intFormSer;
        this.ruleService = ruleService;
        this.pluginValue = "";
        this.visiblePlugin = true;
        this.showValidation = false;
        this.enableInsert = false;
        this.formBuilderNotifier = new core_1.EventEmitter();
        this.title = "Form";
        this.isEmptyResult = false;
        this.PageType = "view";
        this.pageName = "";
        this.alert = alt;
        this.elemRef = elementRef;
        //this.dc = dcl;
        this.interFormService = intFormSer;
    }
    FormBuilderInline.prototype.ngOnInit = function () {
        this.editViewRowDataTable = this.pluginInput;
    };
    FormBuilderInline.prototype.saveClicked = function () {
        var primaryColumnName = this.matrixService.getPrimaryColumnName(this.gridSettings);
        this.pluginValue = this.matrixService.buildJSONObject(this.editViewRowDataTable, primaryColumnName);
        if (this.ruleService.validateRulesByRulesConfig(this.pluginValue, this.gridSettings["RulesConfig"], this.editViewRowDataTable)) {
            this.interFormService.saveValueInControl(this.pluginValue);
        }
    };
    FormBuilderInline.prototype.cancelClicked = function () {
        this.returnCallBack("cancel");
    };
    FormBuilderInline.prototype.inputClicked = function (input) {
        if (input === undefined) {
            return;
        }
        this.selectedInput = input;
        var inputConfig = this.gridSettings.ColumnConfiguration.find(function (z) { return z.dbColumnName === input.name; });
        if (inputConfig.isComplexTypeInline) {
            input.isToggleable = true;
        }
        if (inputConfig.isComplexType) {
            this.selectionArray = inputConfig.selections;
            var element = document.getElementById("CustomPlugin");
            if (element === undefined) {
            }
        }
    };
    FormBuilderInline.prototype.UpdateLookupDaysPluginValue = function (seq, inputvalue) {
        var data = this.editViewRowDataTable;
        if (data[seq] != undefined) {
            data[seq].val = inputvalue;
        }
    };
    FormBuilderInline.prototype.daysClicked = function (selectionObj) {
        var selectedTag = selectionObj["val"];
        this.selectedInput.val = this.parseInput(this.selectedInput.val, selectedTag);
    };
    FormBuilderInline.prototype.parseInput = function (controlInput, uiInput) {
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
    FormBuilderInline.prototype.UpdatePage = function (returndata) {
        var _this = this;
        var PrimaryKeyColumn = undefined;
        if (this.httpProxy != undefined) {
            if (this.gridSettings["PrimaryKeyColumn"] != undefined && this.gridSettings["PrimaryKeyColumn"] != "") {
                PrimaryKeyColumn = this.gridSettings["PrimaryKeyColumn"];
            }
            this.httpProxy.ExecuteUpdate(returndata, this.pageName, PrimaryKeyColumn)
                .subscribe(function (res) {
                //alert("Record updated successfully");
                _this.alert.addAlert(_this.appSettingsService.appNotificationsMsg.saveConfirmedMsg);
                _this.returnCallBack(_this.pluginValue);
            }, function (error) {
                _this.alert.error("async error #" + error.status);
            }, function () { });
        }
    };
    FormBuilderInline.prototype.InsertPage = function (data) {
        var _this = this;
        if (this.httpProxy != undefined) {
            this.httpProxy.ExecuteInsert(data, this.pageName)
                .subscribe(function (res) {
                //  alert("Record inserted successfully");
                _this.alert.addAlert(_this.appSettingsService.appNotificationsMsg.insertMSG);
                _this.returnCallBack(_this.pluginValue);
            }, function (error) {
                _this.alert.error("async error #" + error.status);
            }, function () { });
        }
    };
    FormBuilderInline.prototype.returnCallBack = function (returndata) {
        this.formBuilderNotifier.emit({
            value: returndata
        });
        this.visiblePlugin = false;
    };
    FormBuilderInline.prototype.getPrimaryColumnName = function () {
        var primaryKeyColumn = "Id";
        if (this.gridSettings["PrimaryKeyColumn"] != undefined && this.gridSettings["PrimaryKeyColumn"] != "") {
            primaryKeyColumn = this.gridSettings["PrimaryKeyColumn"];
        }
        return primaryKeyColumn;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FormBuilderInline.prototype, "formBuilderNotifier", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FormBuilderInline.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FormBuilderInline.prototype, "pluginInput", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FormBuilderInline.prototype, "gridSettings", void 0);
    __decorate([
        core_1.Input('PageType'), 
        __metadata('design:type', String)
    ], FormBuilderInline.prototype, "PageType", void 0);
    __decorate([
        core_1.Input('pageName'), 
        __metadata('design:type', String)
    ], FormBuilderInline.prototype, "pageName", void 0);
    __decorate([
        core_1.Input('httpProxy'), 
        __metadata('design:type', Object)
    ], FormBuilderInline.prototype, "httpProxy", void 0);
    __decorate([
        core_1.ViewChild('placeholder', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', Object)
    ], FormBuilderInline.prototype, "viewContainerRef", void 0);
    FormBuilderInline = __decorate([
        core_1.Component({
            template: require("./formBuilderInline.html"),
            selector: 'formBuilderInline',
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, core_1.ElementRef, core_1.Compiler, appSettingsService_1.AppSettingsService, matrixService_1.matrixService, interFormsService_1.InterFormsService, ruleService_1.RuleService])
    ], FormBuilderInline);
    return FormBuilderInline;
}());
exports.FormBuilderInline = FormBuilderInline;
//# sourceMappingURL=formBuilderInline.js.map