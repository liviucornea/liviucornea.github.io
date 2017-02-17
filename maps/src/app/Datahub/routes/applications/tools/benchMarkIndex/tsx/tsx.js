"use strict";
var core_1 = require('@angular/core');
var alertService_1 = require("../../../../../../ReusableServices/alertService");
var matrixService_1 = require("../../../../../../ReusableServices/matrixService");
var apiService_1 = require("../../../../../../ReusableServices/apiService");
var tabBuilder_1 = require("../../../../../../ReusableComponents/tabBuilder/tabBuilder");
var tsx_config_1 = require("./tsx.config");
var genericfunctions_1 = require("../../../../../../ReusableServices/genericfunctions");
var BmiTsx = (function () {
    function BmiTsx(alert, apiService, vmMatrix) {
        this.alert = alert;
        this.apiService = apiService;
        this.vmMatrix = vmMatrix;
        this.tabsListData = [];
        this.tabControlConfig = tsx_config_1.TsxControlConfig;
        this.updatedControlsList = [];
        this.customMessages = [];
    }
    BmiTsx.prototype.ngOnInit = function () {
        this.getTabsData();
    };
    BmiTsx.prototype.ngOnDestroy = function () {
        this.tabsListData = [];
    };
    BmiTsx.prototype.getTabsData = function () {
        var _this = this;
        this.tabControlConfig.TabsList.forEach(function (x) {
            _this.tabsListData.push({
                TabKey: x.TabKey,
                TabName: x.TabName
            });
        });
    };
    BmiTsx.prototype.showSpecificTab = function (tabData) {
        this.vmMatrix.showSpecificTab(this, tabData);
    };
    BmiTsx.prototype.displayTabInfo = function (tabInfo) {
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
            this.getTsxSubIndexLookup();
        }
        this.tabBuilderControl.displayTabInfo(tabInfo);
    };
    BmiTsx.prototype.doActionFromChildTab = function (outputData) {
        this.customMessages = [];
        switch (outputData.updatedValue.controlName) {
            case "Preview":
                this.showReport();
                break;
        }
    };
    BmiTsx.prototype.getTsxSubIndexLookup = function () {
        var _this = this;
        var tsxSubIndex = this.formBuilder.data.find(function (x) { return x.name == "TsxSubIndex"; });
        var apiParams = [{ url: "GetTSXSubIndexLookup" }, { url: "GetTSXLookup" }];
        this.apiService.getMultipleArrayFromQuery(apiParams).subscribe(function (res) {
            res[0].forEach(function (x) {
                res[1].forEach(function (y) {
                    if (y.value && y.value.indexOf(x.value) > -1) {
                        var tempName = genericfunctions_1.toCamelCase(y.name);
                        x.name = tempName.replace('S&p/tsx', 'S&P/TSX');
                    }
                });
            });
            _this.vmMatrix.bindCustomDropDown(tsxSubIndex, res[0]);
        }, function (error) {
            _this.alert.error("GetTSXSubIndexLookup. Error in retrieving drop down info" + error.status);
        }, function () {
        });
    };
    BmiTsx.prototype.showReport = function () {
        var _this = this;
        var selectedDate = this.formBuilder.data.find(function (x) { return x.name == "ReportDate"; }).val;
        var tsxSubIndex = this.formBuilder.data.find(function (x) { return x.name == "TsxSubIndex"; }).val;
        this.apiService.getArrayFromQuery("Benchmark_GetTSXIndex", JSON.stringify({
            Parameters: [{ Name: "@Date", Value: selectedDate },
                { Name: "@Index", Value: tsxSubIndex }]
        })).subscribe(function (res) {
            _this.gridView.ShowDefault = true;
            _this.gridView.data = res;
            if (res.length > 0) {
                var messageBlock = [res.length + (res.length > 1 ? " records " : " record ") + "found"];
                _this.customMessages.push({ text: messageBlock, alert: "alert-info" });
            }
            _this.tabBuilderControl.LoadSpecificTabsByUpdate(_this.updatedControlsList);
        }, function (error) {
            _this.alert.error("Benchmark_GetTSXIndex : async error #" + error.status);
        }, function () {
        });
    };
    __decorate([
        core_1.ViewChild(tabBuilder_1.TabBuilder), 
        __metadata('design:type', tabBuilder_1.TabBuilder)
    ], BmiTsx.prototype, "tabBuilderControl", void 0);
    BmiTsx = __decorate([
        core_1.Component({
            selector: 'tsx',
            template: "<tabBuilder [tabsList]=\"tabsListData\" [messages] = \"customMessages\"\n            (tabEmitter)=\"showSpecificTab($event)\"\n            (tabContentEmitter)=\"doActionFromChildTab($event)\"></tabBuilder>"
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, apiService_1.ApiService, matrixService_1.matrixService])
    ], BmiTsx);
    return BmiTsx;
}());
exports.BmiTsx = BmiTsx;
//# sourceMappingURL=tsx.js.map