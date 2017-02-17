"use strict";
var core_1 = require('@angular/core');
var alertService_1 = require("../../../../../../ReusableServices/alertService");
var apiService_1 = require("../../../../../../ReusableServices/apiService");
var matrixService_1 = require("../../../../../../ReusableServices/matrixService");
var tabBuilder_1 = require("../../../../../../ReusableComponents/tabBuilder/tabBuilder");
var genericfunctions_1 = require("../../../../../../ReusableServices/genericfunctions");
var trades_config_1 = require("./trades.config");
var interFormsService_1 = require("../../../../../../ReusableServices/interFormsService");
var settlementService_1 = require("../settlementService");
var assignableListItems_1 = require("../../../../../../ReusableComponents/assignableListItems/assignableListItems");
var Trades = (function () {
    function Trades(alert, apiService, intFormSvc, vmMatrix, settlementService) {
        this.alert = alert;
        this.apiService = apiService;
        this.intFormSvc = intFormSvc;
        this.vmMatrix = vmMatrix;
        this.settlementService = settlementService;
        this.tabsListData = [];
        this.tabControlConfig = trades_config_1.TradesControlConfig;
        this.updatedControlsList = [];
        this.customMessages = [];
        this.assignableList = assignableListItems_1.AssignableListItems;
        this.availableFieldsTitle = "";
        this.selectedFieldsTitle = "";
        this.showCustomizeFields = false;
        this.customizeFieldsTitle = "";
        this.customizeFieldsInstructions = "";
        this.customizeFieldsResult = "";
        this.showAddIssue = false;
        this.addIssueTitle = "";
        this.addIssueInstructions = "";
        this.addIssueResult = "";
        this.issueTypesList = [];
        this.selectedIssueType = 1;
        this.cycleNine = false;
        this.issueNotes = "";
        this.customizeFieldsListConfig = trades_config_1.CustomizeFieldsListConfig;
    }
    Trades.prototype.ngOnInit = function () {
        this.getTabsData();
    };
    Trades.prototype.ngOnDestroy = function () {
        this.tabsListData = [];
    };
    Trades.prototype.getTabsData = function () {
        var _this = this;
        this.tabControlConfig.TabsList.forEach(function (x) {
            _this.tabsListData.push({
                TabKey: x.TabKey,
                TabName: x.TabName
            });
        });
    };
    Trades.prototype.showSpecificTab = function (tabData) {
        this.vmMatrix.showSpecificTab(this, tabData, this.settlementService);
    };
    Trades.prototype.displayTabInfo = function (tabInfo) {
        this.customMessages = [];
        this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "FormBuilder"; });
        if (this.formBuilder) {
            this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
            var date = new Date();
            this.formBuilder.data.find(function (x) { return x.name == "System"; }).val = "";
            this.formBuilder.data.find(function (x) { return x.name == "CustodianAccount"; }).val = "";
            this.formBuilder.data.find(function (x) { return x.name == "Broker"; }).val = "";
            this.formBuilder.data.find(function (x) { return x.name == "ProductGroup"; }).val = "";
            this.formBuilder.data.find(function (x) { return x.name == "StartDate"; }).val = genericfunctions_1.toDateString(date);
            this.formBuilder.data.find(function (x) { return x.name == "EndDate"; }).val = genericfunctions_1.toDateString(date);
        }
        this.summaryGridView = tabInfo.TabControls.find(function (x) { return x.ComponentName == "TradesSummaryDisplayGrid"; });
        if (this.summaryGridView) {
            this.summaryGridView.ShowDefault = false;
        }
        this.detailsGridView = tabInfo.TabControls.find(function (x) { return x.ComponentName == "TradesDetailsDisplayGrid"; });
        if (this.detailsGridView) {
            this.detailsGridView.ShowDefault = false;
        }
        this.assignableList.gridSettings = this.customizeFieldsListConfig;
        this.assignableList.gridSettings.CustomButtons.find(function (x) { return x.value == 'Save'; }).disabled = true;
        this.tabBuilderControl.displayTabInfo(tabInfo);
    };
    Trades.prototype.doActionFromChildTab = function (outputData) {
        this.updatedControlsList = [];
        this.customMessages = [];
        switch (outputData.updatedValue.controlName) {
            case "DetailsReport":
                this.reportType = "details";
                this.customizeGrid();
                this.showReport();
                break;
            case "SummaryReport":
                this.reportType = "summary";
                this.showReport();
                break;
            case "CustomizeFields":
                this.customizeFields();
                break;
            case "CustomReport":
                this.reportType = "custom";
                this.customizeGrid();
                this.showReport();
                break;
            case "ResetParameters":
                this.resetParameters();
                break;
            case "AddIssue":
                this.parentRow = outputData.updatedValue.parentRow;
                this.nCoreID = outputData.updatedValue.parentRow.primaryKey.value;
                this.startAddIssue();
                break;
            case "CloseIssue":
                this.parentRow = outputData.updatedValue.parentRow;
                this.nIssueID = outputData.updatedValue.value.primaryKey.value;
                this.closeIssue();
                break;
        }
    };
    Trades.prototype.showReport = function () {
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
                { Name: "@sPMLogin", Value: null },
                { Name: "@MaxLines", Value: MaxLines }
            ]
        })).subscribe(function (res) {
            res.forEach(function (x) {
                x.TradeDate = x.TradeDate.substring(0, x.TradeDate.lastIndexOf(" "));
                x.SettleDate = x.SettleDate.substring(0, x.SettleDate.lastIndexOf(" "));
            });
            switch (_this.reportType) {
                case "summary":
                    _this.summaryGridView.ShowDefault = true;
                    _this.detailsGridView.ShowDefault = false;
                    _this.summaryGridView.data = res;
                    break;
                case "details":
                case "custom":
                    _this.summaryGridView.ShowDefault = false;
                    _this.detailsGridView.ShowDefault = true;
                    _this.detailsGridView.data = res;
                    break;
            }
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
    Trades.prototype.resetParameters = function () {
        this.formBuilder.data.forEach(function (x) {
            switch (x.name) {
                case "StartDate":
                case "EndDate":
                    x.val = genericfunctions_1.toDateString(new Date());
                    break;
                case "ExcludeCancellations":
                    x.val = false;
                    break;
                default:
                    x.val = "";
                    break;
            }
        });
    };
    Trades.prototype.customizeFields = function () {
        var _this = this;
        this.showCustomizeFields = true;
        this.customizeFieldsTitle = "Customize Fields";
        this.customizeFieldsInstructions = "Please choose from the available fields to produce a custom report";
        this.availableFieldsTitle = "Available Fields";
        this.selectedFieldsTitle = "Selected Fields";
        var subscription = this.apiService.getArrayFromQuery("SettlementGetTableFields", JSON.stringify({
            Parameters: [
                { Name: "@sLoginName", Value: this.apiService.CurrentUser.LoginName }
            ]
        })).subscribe(function (res) {
            _this.assignableList.inputList = res.filter(function (x) { return x.CustomField == "No"; });
            _this.assignableList.assignedList = res.filter(function (x) { return x.CustomField == "Yes"; });
            _this.assignableList.gridSettings.CustomButtons.find(function (x) { return x.value == 'Save'; }).disabled = false;
            subscription.unsubscribe();
        }, function (error) {
            _this.customizeFieldsResult = "Error :" + error.status;
            subscription.unsubscribe();
        }, function () {
            //   this.apiService.notifySpinner(false);
        });
    };
    Trades.prototype.customizeGrid = function () {
        var _this = this;
        var tab = this.tabControlConfig.TabsList.find(function (t) { return t.TabKey == "OneTab"; });
        var config = tab.TabControls.find(function (x) { return x.ComponentName == "TradesDetailsDisplayGrid"; });
        var column;
        this.apiService.getArrayFromQuery("SettlementGetTableFields", JSON.stringify({
            Parameters: [
                { Name: "@sLoginName", Value: this.apiService.CurrentUser.LoginName }
            ]
        })).subscribe(function (res) {
            res.forEach(function (x) {
                column = config.gridSettings.ColumnConfiguration.find(function (c) { return c.dbColumnName == x.DBName; });
                if (column) {
                    column.isVisible = (_this.reportType == "details" || x.CustomField == "Yes") ? true : false;
                }
            });
        }, function (error) {
            _this.alert.error("SettlementGetTableFields : async error #" + error.status);
        }, function () {
            //   this.apiService.notifySpinner(false);
        });
    };
    Trades.prototype.closeCustomizeFields = function () {
        this.showCustomizeFields = false;
        this.customizeFieldsResult = "";
    };
    Trades.prototype.saveSelectedFields = function (outputdata) {
        var _this = this;
        var sCustomFields = "";
        outputdata.value.forEach(function (x) {
            sCustomFields += "," + x.Value;
        });
        var subscription = this.apiService.executeNonQuery("SettlementUpdateTableFields", JSON.stringify({
            Parameters: [
                { Name: "@sLoginName", Value: this.apiService.CurrentUser.LoginName },
                { Name: "@sCustomFields", Value: sCustomFields }
            ]
        })).subscribe(function (res) {
            _this.customizeFieldsResult = "Custom fields saved successfully";
            subscription.unsubscribe();
        }, function (error) {
            _this.customizeFieldsResult = "Error :" + error.status;
            subscription.unsubscribe();
        }, function () {
            //   this.apiService.notifySpinner(false);
        });
    };
    Trades.prototype.startAddIssue = function () {
        var _this = this;
        this.showAddIssue = true;
        this.addIssueTitle = "Add Settlement Issue";
        this.selectedIssueType = 1;
        this.cycleNine = false;
        this.issueNotes = "";
        this.apiService.getArrayFromQuery("SettlementGetSecurityInfo", JSON.stringify({
            Parameters: [
                { Name: "@nCoreID", Value: this.nCoreID },
            ]
        })).subscribe(function (res) {
            _this.addIssueInstructions = res[0].Info.replace(/<b>/gi, "").replace(/<\/b>/gi, "");
        }, function (error) {
            _this.addIssueResult = "Error :" + error.status;
        }, function () {
            //   this.apiService.notifySpinner(false);
        });
        this.apiService.getArrayFromQuery("SettlementGetIssueTypes", JSON.stringify({
            Parameters: []
        })).subscribe(function (res) {
            _this.issueTypesList = res;
        }, function (error) {
            _this.addIssueResult = "Error :" + error.status;
        }, function () {
            //   this.apiService.notifySpinner(false);
        });
    };
    Trades.prototype.closeAddIssue = function () {
        this.showAddIssue = false;
        this.addIssueResult = "";
        this.parentRow.collapsed = true;
        this.showReport();
        //        this.parentRow.collapsed = false;
    };
    Trades.prototype.addIssue = function () {
        var _this = this;
        var subscription = this.apiService.executeNonQuery("SettlementAddIssue", JSON.stringify({
            Parameters: [
                { Name: "@nCoreID", Value: this.nCoreID },
                { Name: "@nSettlementIssue", Value: this.selectedIssueType },
                { Name: "@nCycleNine", Value: this.cycleNine },
                { Name: "@sNote", Value: this.issueNotes },
                { Name: "@sUserID", Value: this.apiService.CurrentUser.LoginName }
            ]
        })).subscribe(function (res) {
            _this.addIssueResult = "New Issue saved successfully";
            subscription.unsubscribe();
        }, function (error) {
            _this.addIssueResult = "Error :" + error.status;
            subscription.unsubscribe();
        }, function () {
            //   this.apiService.notifySpinner(false);
        });
    };
    Trades.prototype.closeIssue = function () {
        var _this = this;
        this.apiService.executeNonQuery("SettlementCloseIssue", JSON.stringify({
            Parameters: [
                { Name: "@nIssueID", Value: this.nIssueID },
                { Name: "@sLoginName", Value: this.apiService.CurrentUser.LoginName }
            ]
        })).subscribe(function (res) {
            _this.alert.addAlert("Issue closed successfully");
        }, function (error) {
            _this.alert.error("SettlementCloseIssue : async error #" + error.status);
        }, function () {
            _this.parentRow.collapsed = true;
            //                this.parentRow.collapsed = false;
        });
    };
    __decorate([
        core_1.ViewChild(tabBuilder_1.TabBuilder), 
        __metadata('design:type', tabBuilder_1.TabBuilder)
    ], Trades.prototype, "tabBuilderControl", void 0);
    Trades = __decorate([
        core_1.Component({
            selector: 'trades',
            templateUrl: 'trades.html'
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, apiService_1.ApiService, interFormsService_1.InterFormsService, matrixService_1.matrixService, settlementService_1.SettlementService])
    ], Trades);
    return Trades;
}());
exports.Trades = Trades;
//# sourceMappingURL=trades.js.map