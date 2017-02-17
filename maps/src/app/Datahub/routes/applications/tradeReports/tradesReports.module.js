"use strict";
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var tradeReports_1 = require("./tradeReports");
var tradeReports_routes_1 = require("./tradeReports.routes");
var bloombergTrades_module_1 = require("./bloombergTrades/bloombergTrades.module");
var excelTrades_module_1 = require("./excelTrades/excelTrades.module");
var globalLink_module_1 = require("./globalLink/globalLink.module");
var lateTrades_module_1 = require("./lateTrades/lateTrades.module");
var settlement_module_1 = require("./settlement/settlement.module");
var TradeReportsModule = (function () {
    function TradeReportsModule() {
    }
    TradeReportsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, tradeReports_routes_1.TradeReportsRouting, bloombergTrades_module_1.BloombergTradesModule, excelTrades_module_1.ExcelTradesModule, globalLink_module_1.GlobalLinkModule, lateTrades_module_1.LateTradesModule, settlement_module_1.SettlementModule
            ],
            declarations: [tradeReports_1.TradeReports]
        }), 
        __metadata('design:paramtypes', [])
    ], TradeReportsModule);
    return TradeReportsModule;
}());
exports.TradeReportsModule = TradeReportsModule;
//# sourceMappingURL=tradesReports.module.js.map