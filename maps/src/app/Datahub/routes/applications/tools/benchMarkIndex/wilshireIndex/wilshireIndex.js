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
var wilshireIndex_config_1 = require("./wilshireIndex.config");
var genericfunctions_1 = require("../../../../../../ReusableServices/genericfunctions");
var BmiWilshireIndex = (function () {
    function BmiWilshireIndex(alert, apiService, vmMatrix) {
        this.alert = alert;
        this.apiService = apiService;
        this.vmMatrix = vmMatrix;
        this.tabsListData = [];
        this.tabControlConfig = wilshireIndex_config_1.WilshireIndexControlConfig;
        this.updatedControlsList = [];
        this.customMessages = [];
    }
    BmiWilshireIndex.prototype.ngOnInit = function () {
        this.getTabsData();
    };
    BmiWilshireIndex.prototype.ngOnDestroy = function () {
        this.tabsListData = [];
    };
    BmiWilshireIndex.prototype.getTabsData = function () {
        var _this = this;
        this.tabControlConfig.TabsList.forEach(function (x) {
            _this.tabsListData.push({
                TabKey: x.TabKey,
                TabName: x.TabName
            });
        });
    };
    BmiWilshireIndex.prototype.showSpecificTab = function (tabData) {
        this.vmMatrix.showSpecificTab(this, tabData);
    };
    BmiWilshireIndex.prototype.displayTabInfo = function (tabInfo) {
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
        }
        this.tabBuilderControl.displayTabInfo(tabInfo);
    };
    BmiWilshireIndex.prototype.doActionFromChildTab = function (outputData) {
        this.customMessages = [];
        switch (outputData.updatedValue.controlName) {
            case "Preview":
                this.showReport();
                break;
        }
    };
    BmiWilshireIndex.prototype.showReport = function () {
        var _this = this;
        var selectedDate = this.formBuilder.data.find(function (x) { return x.name == "ReportDate"; }).val;
        var spSelected = this.formBuilder.data.find(function (x) { return x.name == "WilshireSubIndex"; }).val;
        this.apiService.getArrayFromQuery("Benchmark_GetWilshireIndex", JSON.stringify({
            Parameters: [{ Name: "@pSpName", Value: spSelected }, { Name: "@pDate", Value: selectedDate }]
        })).subscribe(function (res) {
            _this.gridView.ShowDefault = true;
            _this.gridView.data = res;
            if (res.length > 0) {
                var messageBlock = [res.length + (res.length > 1 ? " records " : " record ") + "found"];
                _this.customMessages.push({ text: messageBlock, alert: "alert-info" });
            }
            _this.tabBuilderControl.LoadSpecificTabsByUpdate(_this.updatedControlsList);
        }, function (error) {
            _this.alert.error("Benchmark_GetWilshireIndex : async error #" + error.status);
        }, function () {
        });
    };
    __decorate([
        core_1.ViewChild(tabBuilder_1.TabBuilder), 
        __metadata('design:type', tabBuilder_1.TabBuilder)
    ], BmiWilshireIndex.prototype, "tabBuilderControl", void 0);
    BmiWilshireIndex = __decorate([
        core_1.Component({
            selector: 'tsx',
            template: "<tabBuilder [tabsList]=\"tabsListData\" [messages] = \"customMessages\"\n            (tabEmitter)=\"showSpecificTab($event)\"\n            (tabContentEmitter)=\"doActionFromChildTab($event)\"></tabBuilder>"
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, apiService_1.ApiService, matrixService_1.matrixService])
    ], BmiWilshireIndex);
    return BmiWilshireIndex;
}());
exports.BmiWilshireIndex = BmiWilshireIndex;
//# sourceMappingURL=wilshireIndex.js.map