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
var postingsByDateTrader_config_1 = require("./postingsByDateTrader.config");
var PostingsByDateTrader = (function () {
    function PostingsByDateTrader(alert, apiService, vmMatrix) {
        this.alert = alert;
        this.apiService = apiService;
        this.vmMatrix = vmMatrix;
        this.tabsListData = [];
        this.tabControlConfig = postingsByDateTrader_config_1.PostingsByDateTraderControlConfig;
        this.updatedControlsList = [];
        this.customMessages = [];
    }
    PostingsByDateTrader.prototype.ngOnInit = function () {
        this.getTabsData();
    };
    PostingsByDateTrader.prototype.ngOnDestroy = function () {
        this.tabsListData = [];
    };
    PostingsByDateTrader.prototype.getTabsData = function () {
        var _this = this;
        this.tabControlConfig.TabsList.forEach(function (x) {
            _this.tabsListData.push({
                TabKey: x.TabKey,
                TabName: x.TabName
            });
        });
    };
    PostingsByDateTrader.prototype.showSpecificTab = function (tabData) {
        this.vmMatrix.showSpecificTab(this, tabData);
    };
    PostingsByDateTrader.prototype.displayTabInfo = function (tabInfo) {
        this.customMessages = [];
        this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "FormBuilder"; });
        if (this.formBuilder) {
            this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
            this.formBuilder.data.find(function (x) { return x.name == "TradeType"; }).val = "B";
            this.formBuilder.data.find(function (x) { return x.name == "ReportDate"; }).val = this.formBuilder.data.find(function (x) { return x.name == "ReportDate"; }).dataSource[0].Value;
        }
        this.detailsGridView = tabInfo.TabControls.find(function (x) { return x.ComponentName == "DetailsDisplayGrid"; });
        if (this.detailsGridView) {
            this.detailsGridView.ShowDefault = false;
        }
        this.summaryGridView = tabInfo.TabControls.find(function (x) { return x.ComponentName == "SummaryDisplayGrid"; });
        if (this.summaryGridView) {
            this.summaryGridView.ShowDefault = false;
        }
        this.tabBuilderControl.displayTabInfo(tabInfo);
    };
    PostingsByDateTrader.prototype.doActionFromChildTab = function (outputData) {
        this.updatedControlsList = [];
        this.customMessages = [];
        switch (outputData.updatedValue.controlName) {
            case "TradeType":
                var tradeType = this.formBuilder.data.find(function (x) { return x.name == "TradeType"; }).val;
                this.detailsGridView.ShowDefault = false;
                this.summaryGridView.ShowDefault = false;
                switch (tradeType) {
                    case "B":
                        this.tabControlConfig.TabsList.find(function (t) { return t.TabKey == "OneTab"; }).TabControls.find(function (c) { return c.ComponentName == "DetailsDisplayGrid"; }).gridSettings = postingsByDateTrader_config_1.DetailsDisplayGridConfig_B;
                        this.tabControlConfig.TabsList.find(function (t) { return t.TabKey == "OneTab"; }).TabControls.find(function (c) { return c.ComponentName == "SummaryDisplayGrid"; }).gridSettings = postingsByDateTrader_config_1.SummaryDisplayGridConfig_B;
                        break;
                    case "E":
                        this.tabControlConfig.TabsList.find(function (t) { return t.TabKey == "OneTab"; }).TabControls.find(function (c) { return c.ComponentName == "DetailsDisplayGrid"; }).gridSettings = postingsByDateTrader_config_1.DetailsDisplayGridConfig_E;
                        this.tabControlConfig.TabsList.find(function (t) { return t.TabKey == "OneTab"; }).TabControls.find(function (c) { return c.ComponentName == "SummaryDisplayGrid"; }).gridSettings = postingsByDateTrader_config_1.SummaryDisplayGridConfig_E;
                        break;
                    case "F":
                        this.tabControlConfig.TabsList.find(function (t) { return t.TabKey == "OneTab"; }).TabControls.find(function (c) { return c.ComponentName == "DetailsDisplayGrid"; }).gridSettings = postingsByDateTrader_config_1.DetailsDisplayGridConfig_F;
                        this.tabControlConfig.TabsList.find(function (t) { return t.TabKey == "OneTab"; }).TabControls.find(function (c) { return c.ComponentName == "SummaryDisplayGrid"; }).gridSettings = postingsByDateTrader_config_1.SummaryDisplayGridConfig_F;
                        break;
                    case "FX":
                        this.tabControlConfig.TabsList.find(function (t) { return t.TabKey == "OneTab"; }).TabControls.find(function (c) { return c.ComponentName == "DetailsDisplayGrid"; }).gridSettings = postingsByDateTrader_config_1.DetailsDisplayGridConfig_FX;
                        this.tabControlConfig.TabsList.find(function (t) { return t.TabKey == "OneTab"; }).TabControls.find(function (c) { return c.ComponentName == "SummaryDisplayGrid"; }).gridSettings = postingsByDateTrader_config_1.SummaryDisplayGridConfig_FX;
                        break;
                    case "MF":
                    case "CP":
                        this.tabControlConfig.TabsList.find(function (t) { return t.TabKey == "OneTab"; }).TabControls.find(function (c) { return c.ComponentName == "DetailsDisplayGrid"; }).gridSettings = postingsByDateTrader_config_1.DetailsDisplayGridConfig_MF;
                        this.tabControlConfig.TabsList.find(function (t) { return t.TabKey == "OneTab"; }).TabControls.find(function (c) { return c.ComponentName == "SummaryDisplayGrid"; }).gridSettings = postingsByDateTrader_config_1.SummaryDisplayGridConfig_MF;
                        break;
                }
                break;
            case "RunReport":
                this.showReport();
                break;
        }
    };
    PostingsByDateTrader.prototype.showReport = function () {
        var _this = this;
        var sDate = this.formBuilder.data.find(function (x) { return x.name == "ReportDate"; }).val;
        var sType = this.formBuilder.data.find(function (x) { return x.name == "TradeType"; }).val;
        this.apiService.getArrayFromQuery("ExcelTradesReport", JSON.stringify({
            Parameters: [
                { Name: "@Date", Value: sDate },
                { Name: "@Type", Value: sType },
                { Name: "@User", Value: "" }
            ]
        })).subscribe(function (res) {
            res.forEach(function (x) {
                x.Messages = (x.Messages == null ? "" : x.Messages) + (x.Messages != null && x.IOMessages != null ? " " : "") + (x.IOMessages == null ? "" : x.IOMessages);
                if (x.IOExportDate != null && x.IOTranID != null && x.IOTranID != 0) {
                    x.Status = "[A]";
                    x.IOStatus = "ACCEPTED";
                    x.Messages = "";
                }
                else if (x.ExportDate != null && x.IOExportDate == null && x.IOStatus == null && x.IOMessages == null) {
                    x.Status = "[N]";
                    x.IOStatus = "NOT SENT";
                }
                else if (x.Messages.indexOf("XRef Error") >= 0 || x.IOMessages.indexOf("XRef Error") >= 0) {
                    x.Status = "[X]";
                    x.IOStatus = "XREF ERROR";
                }
                else {
                    x.Status = "[R]";
                    x.IOStatus = "REJECTED";
                }
                switch (x.TranMode) {
                    case 0:
                        x.TranMode = "New Posting";
                        break;
                    case 1:
                        x.TranMode = "Cancellation";
                        break;
                    case 2:
                        x.TranMode = "Update";
                        break;
                    case 3:
                        x.TranMode = "Update Canc.";
                        break;
                    default:
                        x.TranMode = "Unknown Mode";
                        break;
                }
                if (x.CUSIP == null || x.CUSIP == "") {
                    x.CUSIP = x.SEDOL;
                }
                if (sType == "FX") {
                    x.SecurityID = x.BuyCurrency;
                    if (x.BuyCurrency.indexOf("CCT") == 0) {
                        x.BuyCurrency = x.BuyCurrency.substring(3);
                    }
                }
            });
            _this.detailsGridView.ShowDefault = true;
            _this.detailsGridView.data = res;
            var nAccepted = res.filter(function (x) { return x.Status == "[A]"; }).length;
            var nRejected = res.filter(function (x) { return x.Status == "[N]" || x.Status == "[R]"; }).length;
            var nXRefError = res.filter(function (x) { return x.Status == "[X]"; }).length;
            if (res.length > 0) {
                var messageBlock = ["Total Allocations", "Received: " + res.length, "Accepted: " + nAccepted, "Rejected: " + nRejected, "XRef Errors: " + nXRefError];
                _this.customMessages.push({ text: messageBlock, alert: "alert-info" });
            }
            _this.summaryGridView.ShowDefault = true;
            _this.summaryGridView.data = res;
            _this.tabBuilderControl.LoadSpecificTabsByUpdate(_this.updatedControlsList);
        }, function (error) {
            _this.alert.error("ExcelTradesReport : async error #" + error.status);
        }, function () {
        });
    };
    __decorate([
        core_1.ViewChild(tabBuilder_1.TabBuilder), 
        __metadata('design:type', tabBuilder_1.TabBuilder)
    ], PostingsByDateTrader.prototype, "tabBuilderControl", void 0);
    PostingsByDateTrader = __decorate([
        core_1.Component({
            selector: 'postingsByDateTrader',
            template: "<tabBuilder [tabsList]=\"tabsListData\" [messages] = \"customMessages\"\n            (tabEmitter)=\"showSpecificTab($event)\"\n            (tabContentEmitter)=\"doActionFromChildTab($event)\"></tabBuilder>"
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, apiService_1.ApiService, matrixService_1.matrixService])
    ], PostingsByDateTrader);
    return PostingsByDateTrader;
}());
exports.PostingsByDateTrader = PostingsByDateTrader;
//# sourceMappingURL=postingsByDateTrader.js.map