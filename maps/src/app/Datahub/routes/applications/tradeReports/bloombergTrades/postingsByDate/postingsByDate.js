"use strict";
var core_1 = require('@angular/core');
var alertService_1 = require("../../../../../../ReusableServices/alertService");
var apiService_1 = require("../../../../../../ReusableServices/apiService");
var matrixService_1 = require("../../../../../../ReusableServices/matrixService");
var tabBuilder_1 = require("../../../../../../ReusableComponents/tabBuilder/tabBuilder");
var postingsByDate_config_1 = require("./postingsByDate.config");
var PostingsByDate = (function () {
    function PostingsByDate(alert, apiService, vmMatrix) {
        this.alert = alert;
        this.apiService = apiService;
        this.vmMatrix = vmMatrix;
        this.tabsListData = [];
        this.tabControlConfig = postingsByDate_config_1.PostingsByDateControlConfig;
        this.updatedControlsList = [];
        this.customMessages = [];
    }
    PostingsByDate.prototype.ngOnInit = function () {
        this.getTabsData();
    };
    PostingsByDate.prototype.ngOnDestroy = function () {
        this.tabsListData = [];
    };
    PostingsByDate.prototype.getTabsData = function () {
        var _this = this;
        this.tabControlConfig.TabsList.forEach(function (x) {
            _this.tabsListData.push({
                TabKey: x.TabKey,
                TabName: x.TabName
            });
        });
    };
    PostingsByDate.prototype.showSpecificTab = function (tabData) {
        this.vmMatrix.showSpecificTab(this, tabData);
    };
    PostingsByDate.prototype.displayTabInfo = function (tabInfo) {
        this.customMessages = [];
        this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "FormBuilder"; });
        if (this.formBuilder) {
            this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
            this.formBuilder.data.find(function (x) { return x.name == "ReportDate"; }).val = this.formBuilder.data.find(function (x) { return x.name == "ReportDate"; }).dataSource[0].Value;
            this.formBuilder.data.find(function (x) { return x.name == "ProductGroup"; }).val = "";
            this.formBuilder.data.find(function (x) { return x.name == "PortfolioType"; }).val = "";
            this.formBuilder.data.find(function (x) { return x.name == "Portfolio"; }).val = "";
            this.formBuilder.data.find(function (x) { return x.name == "CustodianAccount"; }).val = "";
            this.formBuilder.data.find(function (x) { return x.name == "CustodianBulkAccount"; }).val = "";
            this.formBuilder.data.find(function (x) { return x.name == "Status"; }).val = "0";
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
    PostingsByDate.prototype.doActionFromChildTab = function (outputData) {
        this.updatedControlsList = [];
        this.customMessages = [];
        if (outputData.updatedValue.controlName == "RunReport") {
            this.showReport();
        }
    };
    PostingsByDate.prototype.showReport = function () {
        var _this = this;
        var selectedDate = this.formBuilder.data.find(function (x) { return x.name == "ReportDate"; }).val;
        var status = this.formBuilder.data.find(function (x) { return x.name == "Status"; }).val;
        var portfolioType = this.formBuilder.data.find(function (x) { return x.name == "PortfolioType"; }).val;
        var productGroup = this.formBuilder.data.find(function (x) { return x.name == "ProductGroup"; }).val;
        var portfolio = this.formBuilder.data.find(function (x) { return x.name == "Portfolio"; }).val;
        var custodianAccount = this.formBuilder.data.find(function (x) { return x.name == "CustodianAccount"; }).val;
        var custodianBulkAccount = this.formBuilder.data.find(function (x) { return x.name == "CustodianBulkAccount"; }).val;
        var apiParams = [
            { url: "BloombergTradesReportDetails",
                body: {
                    Parameters: [
                        { Name: "@Date", Value: selectedDate },
                        { Name: "@iStatus", Value: status },
                        { Name: "@sPortfolioType", Value: portfolioType },
                        { Name: "@sProductGroup", Value: productGroup },
                        { Name: "@sPortfolio", Value: portfolio },
                        { Name: "@sCustodianAccount", Value: custodianAccount },
                        { Name: "@sCustodianBulkAccount", Value: custodianBulkAccount }
                    ]
                }
            },
            { url: "BloombergTradesReportSummary",
                body: {
                    Parameters: [
                        { Name: "@Date", Value: selectedDate },
                        { Name: "@iStatus", Value: status },
                        { Name: "@sPortfolioType", Value: portfolioType },
                        { Name: "@sProductGroup", Value: productGroup },
                        { Name: "@sPortfolio", Value: portfolio },
                        { Name: "@sCustodianAccount", Value: custodianAccount },
                        { Name: "@sCustodianBulkAccount", Value: custodianBulkAccount }
                    ]
                }
            }
        ];
        this.apiService.getMultipleArrayFromQuery(apiParams).subscribe(function (res) {
            _this.detailsGridView.ShowDefault = true;
            _this.detailsGridView.data = res[0];
            var nAccepted = res[0].filter(function (x) { return x.Status == "[A]"; }).length;
            var nRejected = res[0].filter(function (x) { return x.Status == "[N]"; }).length;
            var nXRefError = res[0].filter(function (x) { return x.Status == "[X]"; }).length;
            if (res[0].length > 0) {
                var messageBlock = ["Total Allocations", "Received: " + res[0].length, "Accepted: " + nAccepted, "Rejected: " + nRejected, "XRef Errors: " + nXRefError];
                _this.customMessages.push({ text: messageBlock, alert: "alert-info" });
            }
            _this.summaryGridView.ShowDefault = true;
            _this.summaryGridView.data = res[1];
            _this.tabBuilderControl.LoadSpecificTabsByUpdate(_this.updatedControlsList);
        }, function (error) {
            _this.alert.error("BloombergTradesReportDetails : async error #" + error.status);
        }, function () {
        });
    };
    __decorate([
        core_1.ViewChild(tabBuilder_1.TabBuilder), 
        __metadata('design:type', tabBuilder_1.TabBuilder)
    ], PostingsByDate.prototype, "tabBuilderControl", void 0);
    PostingsByDate = __decorate([
        core_1.Component({
            selector: 'postingsByDate',
            template: "<tabBuilder [tabsList]=\"tabsListData\" [messages] = \"customMessages\"\n            (tabEmitter)=\"showSpecificTab($event)\"\n            (tabContentEmitter)=\"doActionFromChildTab($event)\"></tabBuilder>"
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, apiService_1.ApiService, matrixService_1.matrixService])
    ], PostingsByDate);
    return PostingsByDate;
}());
exports.PostingsByDate = PostingsByDate;
//# sourceMappingURL=postingsByDate.js.map