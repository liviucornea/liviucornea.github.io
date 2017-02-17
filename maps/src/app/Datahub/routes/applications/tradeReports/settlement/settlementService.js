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