"use strict";
var core_1 = require('@angular/core');
var alertService_1 = require("../../../../../../ReusableServices/alertService");
var apiService_1 = require("../../../../../../ReusableServices/apiService");
var matrixService_1 = require("../../../../../../ReusableServices/matrixService");
var tabBuilder_1 = require("../../../../../../ReusableComponents/tabBuilder/tabBuilder");
var genericfunctions_1 = require("../../../../../../ReusableServices/genericfunctions");
var tradeReportByPM_config_1 = require("./tradeReportByPM.config");
var TradeReportByPM = (function () {
    function TradeReportByPM(alert, apiService, vmMatrix) {
        this.alert = alert;
        this.apiService = apiService;
        this.vmMatrix = vmMatrix;
        this.tabsListData = [];
        this.tabControlConfig = tradeReportByPM_config_1.TradeReportByPMControlConfig;
        this.updatedControlsList = [];
        this.customMessages = [];
    }
    TradeReportByPM.prototype.ngOnInit = function () {
        this.getTabsData();
        var tab = this.tabControlConfig.TabsList.find(function (t) { return t.TabKey == "OneTab"; });
        if (tab) {
            var config = tab.TabControls.find(function (x) { return x.ComponentName == "FormBuilder"; });
            if (config) {
                var column = config.gridSettings.ColumnConfiguration.find(function (c) { return c.dbColumnName == "Account"; });
                if (column) {
                    var parameter = column.dataSourceAddress.dbParameters.Parameters.find(function (p) { return p.Name == "@sPMLogin"; });
                    if (parameter) {
                        parameter.Value = this.apiService.CurrentUser.LoginName;
                    }
                }
            }
        }
    };
    TradeReportByPM.prototype.ngOnDestroy = function () {
        this.tabsListData = [];
    };
    TradeReportByPM.prototype.getTabsData = function () {
        var _this = this;
        this.tabControlConfig.TabsList.forEach(function (x) {
            _this.tabsListData.push({
                TabKey: x.TabKey,
                TabName: x.TabName
            });
        });
    };
    TradeReportByPM.prototype.showSpecificTab = function (tabData) {
        this.vmMatrix.showSpecificTab(this, tabData);
    };
    TradeReportByPM.prototype.displayTabInfo = function (tabInfo) {
        this.customMessages = [];
        this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "FormBuilder"; });
        if (this.formBuilder) {
            this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
            var date = new Date();
            this.formBuilder.data.find(function (x) { return x.name == "System"; }).val = "";
            this.formBuilder.data.find(function (x) { return x.name == "Account"; }).val = "";
            this.formBuilder.data.find(function (x) { return x.name == "CustodianAccount"; }).val = "";
            this.formBuilder.data.find(function (x) { return x.name == "Broker"; }).val = "";
            this.formBuilder.data.find(function (x) { return x.name == "ProductGroup"; }).val = "";
            this.formBuilder.data.find(function (x) { return x.name == "StartDate"; }).val = genericfunctions_1.toDateString(date);
            this.formBuilder.data.find(function (x) { return x.name == "EndDate"; }).val = genericfunctions_1.toDateString(date);
            this.formBuilder.data.find(function (x) { return x.name == "ExcludeCancellations"; }).val = true;
        }
        this.gridView = tabInfo.TabControls.find(function (x) { return x.ComponentName == "DisplayGrid"; });
        if (this.gridView) {
            this.gridView.ShowDefault = false;
        }
        this.tabBuilderControl.displayTabInfo(tabInfo);
    };
    TradeReportByPM.prototype.doActionFromChildTab = function (outputData) {
        this.updatedControlsList = [];
        this.customMessages = [];
        switch (outputData.updatedValue.controlName) {
            case "RunReport":
                this.showReport();
                break;
            case "ResetParameters":
                this.resetParameters();
                break;
        }
    };
    TradeReportByPM.prototype.showReport = function () {
        var _this = this;
        var sCoreID = this.formBuilder.data.find(function (x) { return x.name == "TradeHubID"; }).val.replace("'", "''");
        var sSystem = this.formBuilder.data.find(function (x) { return x.name == "System"; }).val.replace("'", "''");
        var sAccount = this.formBuilder.data.find(function (x) { return x.name == "Account"; }).val.replace("'", "''");
        var sCustodianAccount = this.formBuilder.data.find(function (x) { return x.name == "CustodianAccount"; }).val.replace("'", "''");
        var sRIC = this.formBuilder.data.find(function (x) { return x.name == "RIC"; }).val.replace("'", "''");
        var sCUSIP = this.formBuilder.data.find(function (x) { return x.name == "CUSIP"; }).val.replace("'", "''");
        var sISIN = this.formBuilder.data.find(function (x) { return x.name == "ISIN"; }).val.replace("'", "''");
        var sSEDOL = this.formBuilder.data.find(function (x) { return x.name == "SEDOL"; }).val.replace("'", "''");
        var sBroker = this.formBuilder.data.find(function (x) { return x.name == "Broker"; }).val.replace("'", "''");
        var dShares = this.formBuilder.data.find(function (x) { return x.name == "NumberOfShares"; }).val.replace("'", "''");
        var nIOMemo = this.formBuilder.data.find(function (x) { return x.name == "InvestOneMemo"; }).val.replace("'", "''");
        var dtStartDate = this.formBuilder.data.find(function (x) { return x.name == "StartDate"; }).val.replace("'", "''");
        var dtEndDate = this.formBuilder.data.find(function (x) { return x.name == "EndDate"; }).val.replace("'", "''");
        var sProductGroup = this.formBuilder.data.find(function (x) { return x.name == "ProductGroup"; }).val.replace("'", "''");
        var bExcludeCancel = this.formBuilder.data.find(function (x) { return x.name == "ExcludeCancellations"; }).val;
        var sPMLogin = this.apiService.CurrentUser.LoginName;
        var MaxLines = 1000;
        if (sCoreID == "") {
            sCoreID = null;
        }
        if (sSystem == "") {
            sSystem = null;
        }
        if (sAccount == "") {
            sAccount = null;
        }
        if (sCustodianAccount == "") {
            sCustodianAccount = null;
        }
        if (sRIC == "") {
            sRIC = null;
        }
        if (sCUSIP == "") {
            sCUSIP = null;
        }
        if (sISIN == "") {
            sISIN = null;
        }
        if (sSEDOL == "") {
            sSEDOL = null;
        }
        if (sBroker == "") {
            sBroker = null;
        }
        if (dShares == "") {
            dShares = null;
        }
        if (nIOMemo == "") {
            nIOMemo = null;
        }
        if (sProductGroup == "") {
            sProductGroup = null;
        }
        this.apiService.getArrayFromQuery("SettlementTradesReportFull", JSON.stringify({
            Parameters: [
                { Name: "@sCoreIDs", Value: sCoreID },
                { Name: "@dShares", Value: dShares },
                { Name: "@nIOMemo", Value: nIOMemo },
                { Name: "@dtStartDate", Value: dtStartDate },
                { Name: "@dtEndDate", Value: dtEndDate },
                { Name: "@sAccount", Value: sAccount },
                { Name: "@sCustodianAccount", Value: sCustodianAccount },
                { Name: "@sRIC", Value: sRIC },
                { Name: "@sIOSecurityCode", Value: null },
                { Name: "@sCUSIP", Value: sCUSIP },
                { Name: "@sISIN", Value: sISIN },
                { Name: "@sSEDOL", Value: sSEDOL },
                { Name: "@sBroker", Value: sBroker },
                { Name: "@sSystem", Value: sSystem },
                { Name: "@sProductGroup", Value: sProductGroup },
                { Name: "@bExcludeCancel", Value: bExcludeCancel },
                { Name: "@sPMLogin", Value: sPMLogin },
                { Name: "@MaxLines", Value: MaxLines }
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
            _this.alert.error("SettlementTradesReportFull : async error #" + error.status);
        }, function () {
        });
    };
    TradeReportByPM.prototype.resetParameters = function () {
        this.formBuilder.data.forEach(function (x) {
            switch (x.name) {
                case "StartDate":
                case "EndDate":
                    x.val = genericfunctions_1.toDateString(new Date());
                    break;
                case "ExcludeCancellations":
                    x.val = true;
                    break;
                default:
                    x.val = "";
                    break;
            }
        });
    };
    __decorate([
        core_1.ViewChild(tabBuilder_1.TabBuilder), 
        __metadata('design:type', tabBuilder_1.TabBuilder)
    ], TradeReportByPM.prototype, "tabBuilderControl", void 0);
    TradeReportByPM = __decorate([
        core_1.Component({
            selector: 'tradeReportByPM',
            template: "<tabBuilder [tabsList]=\"tabsListData\" [messages] = \"customMessages\"\n            (tabEmitter)=\"showSpecificTab($event)\"\n            (tabContentEmitter)=\"doActionFromChildTab($event)\"></tabBuilder>"
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, apiService_1.ApiService, matrixService_1.matrixService])
    ], TradeReportByPM);
    return TradeReportByPM;
}());
exports.TradeReportByPM = TradeReportByPM;
//# sourceMappingURL=tradeReportByPM.js.map