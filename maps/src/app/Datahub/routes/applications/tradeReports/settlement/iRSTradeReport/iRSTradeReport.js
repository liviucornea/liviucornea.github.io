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
var apiService_1 = require("../../../../../../ReusableServices/apiService");
var matrixService_1 = require("../../../../../../ReusableServices/matrixService");
var tabBuilder_1 = require("../../../../../../ReusableComponents/tabBuilder/tabBuilder");
var genericfunctions_1 = require("../../../../../../ReusableServices/genericfunctions");
var iRSTradeReport_config_1 = require("./iRSTradeReport.config");
var IRSTradeReport = (function () {
    function IRSTradeReport(alert, apiService, vmMatrix) {
        this.alert = alert;
        this.apiService = apiService;
        this.vmMatrix = vmMatrix;
        this.tabsListData = [];
        this.tabControlConfig = iRSTradeReport_config_1.IRSTradeReportControlConfig;
        this.updatedControlsList = [];
        this.customMessages = [];
    }
    IRSTradeReport.prototype.ngOnInit = function () {
        this.getTabsData();
    };
    IRSTradeReport.prototype.ngOnDestroy = function () {
        this.tabsListData = [];
    };
    IRSTradeReport.prototype.getTabsData = function () {
        var _this = this;
        this.tabControlConfig.TabsList.forEach(function (x) {
            _this.tabsListData.push({
                TabKey: x.TabKey,
                TabName: x.TabName
            });
        });
    };
    IRSTradeReport.prototype.showSpecificTab = function (tabData) {
        this.vmMatrix.showSpecificTab(this, tabData);
    };
    IRSTradeReport.prototype.displayTabInfo = function (tabInfo) {
        this.customMessages = [];
        this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "FormBuilder"; });
        if (this.formBuilder) {
            this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
            var date = new Date();
            this.formBuilder.data.find(function (x) { return x.name == "EndDate"; }).val = genericfunctions_1.toDateString(date);
            date.setDate(date.getDate() - 15);
            this.formBuilder.data.find(function (x) { return x.name == "StartDate"; }).val = genericfunctions_1.toDateString(date);
            this.formBuilder.data.find(function (x) { return x.name == "ShowCancellations"; }).val = false;
        }
        this.gridView = tabInfo.TabControls.find(function (x) { return x.ComponentName == "DisplayGrid"; });
        if (this.gridView) {
            this.gridView.ShowDefault = false;
        }
        this.tabBuilderControl.displayTabInfo(tabInfo);
    };
    IRSTradeReport.prototype.doActionFromChildTab = function (outputData) {
        this.updatedControlsList = [];
        this.customMessages = [];
        if (outputData.updatedValue.controlName == "RunReport") {
            this.showReport();
        }
    };
    IRSTradeReport.prototype.showReport = function () {
        var _this = this;
        var startDateIn = this.formBuilder.data.find(function (x) { return x.name == "StartDate"; }).val;
        var endDateIn = this.formBuilder.data.find(function (x) { return x.name == "EndDate"; }).val;
        var showCancels = this.formBuilder.data.find(function (x) { return x.name == "ShowCancellations"; }).val;
        this.apiService.getArrayFromQuery("GetIRSTradesReport", JSON.stringify({
            Parameters: [
                { Name: "@StartDateIn", Value: startDateIn },
                { Name: "@EndDateIn", Value: endDateIn },
                { Name: "@ShowCancels", Value: showCancels }
            ]
        })).subscribe(function (res) {
            _this.gridView.ShowDefault = true;
            _this.gridView.data = res;
            if (res.length > 0) {
                var messageBlock = [res.length + (res.length > 1 ? " records " : " record ") + "found"];
                _this.customMessages.push({ text: messageBlock, alert: "alert-info" });
            }
            _this.tabBuilderControl.LoadSpecificTabsByUpdate(_this.updatedControlsList);
        }, function (error) {
            _this.alert.error("GetIRSTradesReport : async error #" + error.status);
        }, function () {
            //   this.apiService.notifySpinner(false);
        });
    };
    __decorate([
        core_1.ViewChild(tabBuilder_1.TabBuilder), 
        __metadata('design:type', tabBuilder_1.TabBuilder)
    ], IRSTradeReport.prototype, "tabBuilderControl", void 0);
    IRSTradeReport = __decorate([
        core_1.Component({
            selector: 'iRSTradeReport',
            template: "<tabBuilder [tabsList]=\"tabsListData\" [messages] = \"customMessages\"\n            (tabEmitter)=\"showSpecificTab($event)\"\n            (tabContentEmitter)=\"doActionFromChildTab($event)\"></tabBuilder>"
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, apiService_1.ApiService, matrixService_1.matrixService])
    ], IRSTradeReport);
    return IRSTradeReport;
}());
exports.IRSTradeReport = IRSTradeReport;
//# sourceMappingURL=iRSTradeReport.js.map