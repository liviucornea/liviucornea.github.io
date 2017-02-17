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
var core_1 = require('@angular/core');
var alertService_1 = require("../../../../../../ReusableServices/alertService");
var matrixService_1 = require("../../../../../../ReusableServices/matrixService");
var apiService_1 = require("../../../../../../ReusableServices/apiService");
var tabBuilder_1 = require("../../../../../../ReusableComponents/tabBuilder/tabBuilder");
var scotia_config_1 = require("./scotia.config");
var genericfunctions_1 = require("../../../../../../ReusableServices/genericfunctions");
var BmiScotia = (function () {
    function BmiScotia(alert, apiService, vmMatrix) {
        this.alert = alert;
        this.apiService = apiService;
        this.vmMatrix = vmMatrix;
        this.tabsListData = [];
        this.tabControlConfig = scotia_config_1.ScotiaControlConfig;
        this.updatedControlsList = [];
        this.customMessages = [];
    }
    BmiScotia.prototype.ngOnInit = function () {
        this.getTabsData();
    };
    BmiScotia.prototype.ngOnDestroy = function () {
        this.tabsListData = [];
    };
    BmiScotia.prototype.getTabsData = function () {
        var _this = this;
        this.tabControlConfig.TabsList.forEach(function (x) {
            _this.tabsListData.push({
                TabKey: x.TabKey,
                TabName: x.TabName
            });
        });
    };
    BmiScotia.prototype.showSpecificTab = function (tabData) {
        this.vmMatrix.showSpecificTab(this, tabData);
    };
    BmiScotia.prototype.displayTabInfo = function (tabInfo) {
        this.customMessages = [];
        this.gridView = tabInfo.TabControls.find(function (x) { return x.ComponentName == "DisplayGrid"; });
        if (this.gridView) {
            this.gridView.ShowDefault = false;
        }
        this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "FormBuilder"; });
        if (this.formBuilder) {
            var d = new Date();
            d.setDate(d.getDate() - 2);
            var date = genericfunctions_1.toDateString(d);
            this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
            this.formBuilder.data.find(function (x) { return x.name == "ReportDate"; }).val = date;
            this.getScotiaIndexName(date);
        }
        this.tabBuilderControl.displayTabInfo(tabInfo);
    };
    BmiScotia.prototype.doActionFromChildTab = function (outputData) {
        var _this = this;
        this.customMessages = [];
        var ReportDate = this.formBuilder.data.find(function (x) { return x.name == "ReportDate"; });
        var IndexName = this.formBuilder.data.find(function (x) { return x.name == "IndexName"; });
        var IndexDescription = this.formBuilder.data.find(function (x) { return x.name == "IndexDescription"; });
        switch (outputData.updatedValue.controlName) {
            case "ReportDate":
                var date = outputData.updatedValue.value;
                this.getScotiaIndexName(date);
                break;
            case "IndexName":
                var indexNameSelected = outputData.updatedValue.value;
                if (indexNameSelected == "") {
                    this.vmMatrix.bindCustomDropDown(IndexDescription, null);
                    break;
                }
                this.apiService.getArrayFromQuery("GetScotiaIndexDescription", JSON.stringify({
                    Parameters: [{ Name: "@pName", Value: indexNameSelected },
                        { Name: "@pReportDate", Value: ReportDate.val }]
                })).subscribe(function (res) {
                    _this.vmMatrix.bindCustomDropDown(IndexDescription, res);
                }, function (error) {
                    _this.alert.error("GetScotiaIndexDescription. Error in retrieving drop down info" + error.status);
                }, function () {
                });
                break;
            case "Preview":
                this.showReport();
                break;
        }
    };
    BmiScotia.prototype.getScotiaIndexName = function (date) {
        var _this = this;
        var IndexName = this.formBuilder.data.find(function (x) { return x.name == "IndexName"; });
        var IndexDescription = this.formBuilder.data.find(function (x) { return x.name == "IndexDescription"; });
        this.vmMatrix.bindCustomDropDown(IndexName, null);
        this.vmMatrix.bindCustomDropDown(IndexDescription, null);
        this.apiService.getArrayFromQuery("GetScotiaIndexName", JSON.stringify({
            Parameters: [{ Name: "@pReportDate", Value: date }]
        })).subscribe(function (res) {
            _this.vmMatrix.bindCustomDropDown(IndexName, res);
        }, function (error) {
            _this.alert.error("GetScotiaIndexName. Error in retrieving drop down info" + error.status);
        }, function () {
        });
    };
    BmiScotia.prototype.showReport = function () {
        var _this = this;
        var selectedDate = this.formBuilder.data.find(function (x) { return x.name == "ReportDate"; }).val;
        var indexDescription = this.formBuilder.data.find(function (x) { return x.name == "IndexDescription"; }).val;
        this.apiService.getArrayFromQuery("Benchmark_GetScotiaIndex", JSON.stringify({
            Parameters: [{ Name: "@Date", Value: selectedDate },
                { Name: "@IndexName", Value: indexDescription }]
        })).subscribe(function (res) {
            _this.gridView.ShowDefault = true;
            _this.gridView.data = res;
            if (res.length > 0) {
                var messageBlock = [res.length + (res.length > 1 ? " records " : " record ") + "found"];
                _this.customMessages.push({ text: messageBlock, alert: "alert-info" });
            }
            _this.tabBuilderControl.LoadSpecificTabsByUpdate(_this.updatedControlsList);
        }, function (error) {
            _this.alert.error("Benchmark_GetScotiaIndex : async error #" + error.status);
        }, function () {
        });
    };
    __decorate([
        core_1.ViewChild(tabBuilder_1.TabBuilder), 
        __metadata('design:type', tabBuilder_1.TabBuilder)
    ], BmiScotia.prototype, "tabBuilderControl", void 0);
    BmiScotia = __decorate([
        core_1.Component({
            selector: 'scotia',
            template: "<tabBuilder [tabsList]=\"tabsListData\" [messages] = \"customMessages\"\n            (tabEmitter)=\"showSpecificTab($event)\"\n            (tabContentEmitter)=\"doActionFromChildTab($event)\"></tabBuilder>"
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, apiService_1.ApiService, matrixService_1.matrixService])
    ], BmiScotia);
    return BmiScotia;
}());
exports.BmiScotia = BmiScotia;
//# sourceMappingURL=scotia.js.map