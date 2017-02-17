"use strict";
var core_1 = require('@angular/core');
var alertService_1 = require("../../../../../../ReusableServices/alertService");
var matrixService_1 = require("../../../../../../ReusableServices/matrixService");
var apiService_1 = require("../../../../../../ReusableServices/apiService");
var tabBuilder_1 = require("../../../../../../ReusableComponents/tabBuilder/tabBuilder");
var worldGovernmentBondIndex_config_1 = require("./worldGovernmentBondIndex.config");
var genericfunctions_1 = require("../../../../../../ReusableServices/genericfunctions");
var BmiWorldGovernmentBondIndex = (function () {
    function BmiWorldGovernmentBondIndex(alert, apiService, vmMatrix) {
        this.alert = alert;
        this.apiService = apiService;
        this.vmMatrix = vmMatrix;
        this.tabsListData = [];
        this.tabControlConfig = worldGovernmentBondIndex_config_1.WorldGovernmentBondIndexControlConfig;
        this.updatedControlsList = [];
        this.customMessages = [];
    }
    BmiWorldGovernmentBondIndex.prototype.ngOnInit = function () {
        this.getTabsData();
    };
    BmiWorldGovernmentBondIndex.prototype.ngOnDestroy = function () {
        this.tabsListData = [];
    };
    BmiWorldGovernmentBondIndex.prototype.getTabsData = function () {
        var _this = this;
        this.tabControlConfig.TabsList.forEach(function (x) {
            _this.tabsListData.push({
                TabKey: x.TabKey,
                TabName: x.TabName
            });
        });
    };
    BmiWorldGovernmentBondIndex.prototype.showSpecificTab = function (tabData) {
        this.vmMatrix.showSpecificTab(this, tabData);
    };
    BmiWorldGovernmentBondIndex.prototype.displayTabInfo = function (tabInfo) {
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
    BmiWorldGovernmentBondIndex.prototype.doActionFromChildTab = function (outputData) {
        this.customMessages = [];
        switch (outputData.updatedValue.controlName) {
            case "Preview":
                this.showReport();
                break;
        }
    };
    BmiWorldGovernmentBondIndex.prototype.showReport = function () {
        var _this = this;
        var selectedDate = this.formBuilder.data.find(function (x) { return x.name == "ReportDate"; }).val;
        this.apiService.getArrayFromQuery("Benchmark_GetWGBIndex", JSON.stringify({
            Parameters: [{ Name: "@Date", Value: selectedDate }]
        })).subscribe(function (res) {
            _this.gridView.ShowDefault = true;
            _this.gridView.data = res;
            if (res.length > 0) {
                var messageBlock = [res.length + (res.length > 1 ? " records " : " record ") + "found"];
                _this.customMessages.push({ text: messageBlock, alert: "alert-info" });
            }
            _this.tabBuilderControl.LoadSpecificTabsByUpdate(_this.updatedControlsList);
        }, function (error) {
            _this.alert.error("Benchmark_GetWGBIndex : async error #" + error.status);
        }, function () {
        });
    };
    __decorate([
        core_1.ViewChild(tabBuilder_1.TabBuilder), 
        __metadata('design:type', tabBuilder_1.TabBuilder)
    ], BmiWorldGovernmentBondIndex.prototype, "tabBuilderControl", void 0);
    BmiWorldGovernmentBondIndex = __decorate([
        core_1.Component({
            selector: 'worldGovernmentBondIndex',
            template: "<tabBuilder [tabsList]=\"tabsListData\" [messages] = \"customMessages\"\n            (tabEmitter)=\"showSpecificTab($event)\"\n            (tabContentEmitter)=\"doActionFromChildTab($event)\"></tabBuilder>"
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, apiService_1.ApiService, matrixService_1.matrixService])
    ], BmiWorldGovernmentBondIndex);
    return BmiWorldGovernmentBondIndex;
}());
exports.BmiWorldGovernmentBondIndex = BmiWorldGovernmentBondIndex;
//# sourceMappingURL=worldGovernmentBondIndex.js.map