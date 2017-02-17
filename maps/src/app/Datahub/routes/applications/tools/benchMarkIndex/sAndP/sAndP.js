"use strict";
var core_1 = require('@angular/core');
var alertService_1 = require("../../../../../../ReusableServices/alertService");
var matrixService_1 = require("../../../../../../ReusableServices/matrixService");
var apiService_1 = require("../../../../../../ReusableServices/apiService");
var tabBuilder_1 = require("../../../../../../ReusableComponents/tabBuilder/tabBuilder");
var sAndP_config_1 = require("./sAndP.config");
var genericfunctions_1 = require("../../../../../../ReusableServices/genericfunctions");
var BmiSandP = (function () {
    function BmiSandP(alert, apiService, vmMatrix) {
        this.alert = alert;
        this.apiService = apiService;
        this.vmMatrix = vmMatrix;
        this.tabsListData = [];
        this.tabControlConfig = sAndP_config_1.SandPControlConfig;
        this.updatedControlsList = [];
        this.customMessages = [];
    }
    BmiSandP.prototype.ngOnInit = function () {
        this.getTabsData();
    };
    BmiSandP.prototype.ngOnDestroy = function () {
        this.tabsListData = [];
    };
    BmiSandP.prototype.getTabsData = function () {
        var _this = this;
        this.tabControlConfig.TabsList.forEach(function (x) {
            _this.tabsListData.push({
                TabKey: x.TabKey,
                TabName: x.TabName
            });
        });
    };
    BmiSandP.prototype.showSpecificTab = function (tabData) {
        this.vmMatrix.showSpecificTab(this, tabData);
    };
    BmiSandP.prototype.displayTabInfo = function (tabInfo) {
        this.customMessages = [];
        this.gridView = tabInfo.TabControls.find(function (x) { return x.ComponentName == "DisplayGrid"; });
        if (this.gridView) {
            this.gridView.ShowDefault = false;
        }
        this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "FormBuilder"; });
        if (this.formBuilder) {
            var d = new Date();
            d.setDate(d.getDate() - 2);
            this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
            this.formBuilder.data.find(function (x) { return x.name == "ReportDate"; }).val = genericfunctions_1.toDateString(d);
        }
        this.tabBuilderControl.displayTabInfo(tabInfo);
    };
    BmiSandP.prototype.doActionFromChildTab = function (outputData) {
        this.customMessages = [];
        if (outputData.updatedValue.controlName == "Preview") {
            this.showReport();
        }
    };
    BmiSandP.prototype.showReport = function () {
        var _this = this;
        var selectedDate = this.formBuilder.data.find(function (x) { return x.name == "ReportDate"; }).val;
        var spSelected = this.formBuilder.data.find(function (x) { return x.name == "SandPSubIndex"; }).val;
        var sQuery;
        if (spSelected.indexOf("sp_Benchmark_GetSPDJGlobalIndex") != -1 || spSelected.indexOf("sp_Benchmark_GetSPIndexConstituent") != -1) {
            sQuery = spSelected.replace("NULL", " '" + selectedDate + "'");
        }
        else {
            sQuery = spSelected + " '" + selectedDate + "'";
        }
        this.apiService.getArrayFromQuery("GetSPIndex", JSON.stringify({
            Parameters: [
                { Name: "@pSpName", Value: sQuery }]
        })).subscribe(function (res) {
            _this.gridView.ShowDefault = true;
            _this.gridView.data = res;
            if (res.length > 0) {
                var messageBlock = [res.length + (res.length > 1 ? " records " : " record ") + "found"];
                _this.customMessages.push({ text: messageBlock, alert: "alert-info" });
            }
            _this.tabBuilderControl.LoadSpecificTabsByUpdate(_this.updatedControlsList);
        }, function (error) {
            _this.alert.error("GetSPIndex : async error #" + error.status);
        }, function () {
        });
    };
    __decorate([
        core_1.ViewChild(tabBuilder_1.TabBuilder), 
        __metadata('design:type', tabBuilder_1.TabBuilder)
    ], BmiSandP.prototype, "tabBuilderControl", void 0);
    BmiSandP = __decorate([
        core_1.Component({
            selector: 'sAndP',
            template: "<tabBuilder [tabsList]=\"tabsListData\" [messages] = \"customMessages\"\n            (tabEmitter)=\"showSpecificTab($event)\"\n            (tabContentEmitter)=\"doActionFromChildTab($event)\"></tabBuilder>"
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, apiService_1.ApiService, matrixService_1.matrixService])
    ], BmiSandP);
    return BmiSandP;
}());
exports.BmiSandP = BmiSandP;
//# sourceMappingURL=sAndP.js.map