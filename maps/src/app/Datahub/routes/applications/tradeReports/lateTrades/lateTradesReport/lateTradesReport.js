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
var lateTradesReport_config_1 = require("./lateTradesReport.config");
var genericfunctions_1 = require("../../../../../../ReusableServices/genericfunctions");
var LateTradesReport = (function () {
    function LateTradesReport(alert, apiService, vmMatrix) {
        this.alert = alert;
        this.apiService = apiService;
        this.vmMatrix = vmMatrix;
        this.tabsListData = [];
        this.tabControlConfig = lateTradesReport_config_1.LateTradesReportControlConfig;
        this.updatedControlsList = [];
        this.customMessages = [];
    }
    LateTradesReport.prototype.ngOnInit = function () {
        this.getTabsData();
    };
    LateTradesReport.prototype.ngOnDestroy = function () {
        this.tabsListData = [];
    };
    LateTradesReport.prototype.getTabsData = function () {
        var _this = this;
        this.tabControlConfig.TabsList.forEach(function (x) {
            _this.tabsListData.push({
                TabKey: x.TabKey,
                TabName: x.TabName
            });
        });
    };
    LateTradesReport.prototype.showSpecificTab = function (tabData) {
        this.vmMatrix.showSpecificTab(this, tabData);
    };
    LateTradesReport.prototype.displayTabInfo = function (tabInfo) {
        var _this = this;
        this.customMessages = [];
        this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "FormBuilder"; });
        if (this.formBuilder) {
            this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
            this.apiService.getArrayFromQuery("GetLastBusDay", JSON.stringify({ Parameters: []
            })).subscribe(function (res) {
                if (res.length == 1) {
                    var date = new Date(res[0].LastBusDay);
                    _this.formBuilder.data.find(function (x) { return x.name == "ToDate"; }).val = genericfunctions_1.toDateString(date);
                    date.setDate(date.getDate() - 30);
                    _this.formBuilder.data.find(function (x) { return x.name == "FromDate"; }).val = genericfunctions_1.toDateString(date);
                }
            }, function (error) {
                _this.alert.error("GetLastBusDay. Error in retrieving last business date" + error.status);
            }, function () {
            });
        }
        this.gridView = tabInfo.TabControls.find(function (x) { return x.ComponentName == "DisplayGrid"; });
        if (this.gridView) {
            this.gridView.ShowDefault = false;
        }
        this.tabBuilderControl.displayTabInfo(tabInfo);
    };
    LateTradesReport.prototype.doActionFromChildTab = function (outputData) {
        this.updatedControlsList = [];
        this.customMessages = [];
        if (outputData.updatedValue.controlName == "RunReport") {
            this.showReport();
        }
    };
    LateTradesReport.prototype.showReport = function () {
        var _this = this;
        var fromDate = this.formBuilder.data.find(function (x) { return x.name == "FromDate"; }).val;
        var toDate = this.formBuilder.data.find(function (x) { return x.name == "ToDate"; }).val;
        this.apiService.getArrayFromQuery("GetComplianceLateTrades", JSON.stringify({
            Parameters: [
                { Name: "@ToDate", Value: toDate },
                { Name: "@FromDate", Value: fromDate }
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
            _this.alert.error("GetComplianceLateTrades : async error #" + error.status);
        }, function () {
        });
    };
    __decorate([
        core_1.ViewChild(tabBuilder_1.TabBuilder), 
        __metadata('design:type', tabBuilder_1.TabBuilder)
    ], LateTradesReport.prototype, "tabBuilderControl", void 0);
    LateTradesReport = __decorate([
        core_1.Component({
            selector: 'lateTradesReport',
            template: "<tabBuilder [tabsList]=\"tabsListData\" [messages] = \"customMessages\"\n            (tabEmitter)=\"showSpecificTab($event)\"\n            (tabContentEmitter)=\"doActionFromChildTab($event)\"></tabBuilder>"
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, apiService_1.ApiService, matrixService_1.matrixService])
    ], LateTradesReport);
    return LateTradesReport;
}());
exports.LateTradesReport = LateTradesReport;
//# sourceMappingURL=lateTradesReport.js.map