"use strict";
var core_1 = require('@angular/core');
var alertService_1 = require("../../../../../../ReusableServices/alertService");
var matrixService_1 = require("../../../../../../ReusableServices/matrixService");
var apiService_1 = require("../../../../../../ReusableServices/apiService");
var tabBuilder_1 = require("../../../../../../ReusableComponents/tabBuilder/tabBuilder");
var bmoNesbittBurnsIndex_config_1 = require("./bmoNesbittBurnsIndex.config");
var genericfunctions_1 = require("../../../../../../ReusableServices/genericfunctions");
var BmiBMONesbittBurnsIndex = (function () {
    function BmiBMONesbittBurnsIndex(alert, apiService, vmMatrix) {
        this.alert = alert;
        this.apiService = apiService;
        this.vmMatrix = vmMatrix;
        this.tabsListData = [];
        this.tabControlConfig = bmoNesbittBurnsIndex_config_1.BmoNesbittBurnsIndexControlConfig;
        this.updatedControlsList = [];
        this.customMessages = [];
    }
    BmiBMONesbittBurnsIndex.prototype.ngOnInit = function () {
        this.getTabsData();
    };
    BmiBMONesbittBurnsIndex.prototype.ngOnDestroy = function () {
        this.tabsListData = [];
    };
    BmiBMONesbittBurnsIndex.prototype.getTabsData = function () {
        var _this = this;
        this.tabControlConfig.TabsList.forEach(function (x) {
            _this.tabsListData.push({
                TabKey: x.TabKey,
                TabName: x.TabName
            });
        });
    };
    BmiBMONesbittBurnsIndex.prototype.showSpecificTab = function (tabData) {
        this.vmMatrix.showSpecificTab(this, tabData);
    };
    BmiBMONesbittBurnsIndex.prototype.displayTabInfo = function (tabInfo) {
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
    BmiBMONesbittBurnsIndex.prototype.doActionFromChildTab = function (outputData) {
        this.customMessages = [];
        if (outputData.updatedValue.controlName == "Preview") {
            this.showReport();
        }
    };
    BmiBMONesbittBurnsIndex.prototype.showReport = function () {
        var _this = this;
        var selectedDate = this.formBuilder.data.find(function (x) { return x.name == "ReportDate"; }).val;
        var spSelected = this.formBuilder.data.find(function (x) { return x.name == "BMONesbittBurnsIndex"; }).val;
        this.apiService.getArrayFromQuery("GetMaxDateFromTblIndexNesbittBurns", JSON.stringify({ Parameters: [
                { Name: "@pMonth", Value: new Date(selectedDate).getMonth() + 1 },
                { Name: "@pYear", Value: new Date(selectedDate).getFullYear() }
            ] })).subscribe(function (res) {
            if (res.length == 1) {
                _this.apiService.getArrayFromQuery("GetNesbittBurnsIndex", JSON.stringify({
                    Parameters: [
                        { Name: "@pSpName", Value: spSelected },
                        { Name: "@pDate", Value: res[0].maxdate }]
                })).subscribe(function (res) {
                    _this.gridView.ShowDefault = true;
                    _this.gridView.data = res;
                    if (res.length > 0) {
                        var messageBlock = [res.length + (res.length > 1 ? " records " : " record ") + "found"];
                        _this.customMessages.push({ text: messageBlock, alert: "alert-info" });
                    }
                    _this.tabBuilderControl.LoadSpecificTabsByUpdate(_this.updatedControlsList);
                }, function (error) {
                    _this.alert.error("GetNesbittBurnsIndex : async error #" + error.status);
                }, function () {
                });
            }
        }, function (error) {
            _this.alert.error("GetMaxDateFromTblIndexNesbittBurns : async error #" + error.status);
        }, function () { });
    };
    __decorate([
        core_1.ViewChild(tabBuilder_1.TabBuilder), 
        __metadata('design:type', tabBuilder_1.TabBuilder)
    ], BmiBMONesbittBurnsIndex.prototype, "tabBuilderControl", void 0);
    BmiBMONesbittBurnsIndex = __decorate([
        core_1.Component({
            selector: 'bmoNesbittBurnsIndex',
            template: "<tabBuilder [tabsList]=\"tabsListData\" [messages] = \"customMessages\"\n            (tabEmitter)=\"showSpecificTab($event)\"\n            (tabContentEmitter)=\"doActionFromChildTab($event)\"></tabBuilder>"
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, apiService_1.ApiService, matrixService_1.matrixService])
    ], BmiBMONesbittBurnsIndex);
    return BmiBMONesbittBurnsIndex;
}());
exports.BmiBMONesbittBurnsIndex = BmiBMONesbittBurnsIndex;
//# sourceMappingURL=bmoNesbittBurnsIndex.js.map