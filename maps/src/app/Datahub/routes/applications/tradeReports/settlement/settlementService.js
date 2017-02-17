"use strict";
var core_1 = require('@angular/core');
var apiService_1 = require("../../../../../ReusableServices/apiService");
var SettlementService = (function () {
    function SettlementService(apiService) {
        this.apiService = apiService;
    }
    SettlementService.prototype.ExecutePageRefresh = function (pagename, id) {
        if (id === void 0) { id = null; }
        switch (pagename) {
            case "TradesSummaryDisplayGrid_CoreID_child":
            case "TradesDetailsDisplayGrid_CoreID_child":
                return this.settlementTradesReportStatus(id);
            case "TradesSummaryDisplayGrid_Issues_child":
            case "TradesDetailsDisplayGrid_Issues_child":
                return this.settlementGetIssues(id);
        }
    };
    SettlementService.prototype.checkBusinessValidations = function (inputRecords, pageName) {
        switch (pageName) {
            case "TradesSummaryDisplayGrid_Issues_child":
            case "TradesDetailsDisplayGrid_Issues_child":
                inputRecords.forEach(function (x) {
                    x.cells.forEach(function (y) {
                        if (y.name.toLowerCase() == 'closed' && y.val == "Closed") {
                            y.val = 'Yes';
                        }
                    });
                });
                break;
        }
    };
    SettlementService.prototype.settlementTradesReportStatus = function (nID) {
        return this.apiService.getArrayFromQuery("SettlementTradesReportStatus", JSON.stringify({
            Parameters: [
                { Name: "@nID", Value: nID }
            ]
        }));
    };
    SettlementService.prototype.settlementGetIssues = function (nID) {
        return this.apiService.getArrayFromQuery("SettlementGetIssues", JSON.stringify({
            Parameters: [
                { Name: "@nCoreID", Value: nID }
            ]
        }));
    };
    SettlementService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [apiService_1.ApiService])
    ], SettlementService);
    return SettlementService;
}());
exports.SettlementService = SettlementService;
//# sourceMappingURL=settlementService.js.map