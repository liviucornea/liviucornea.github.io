"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var settlement_routes_1 = require("./settlement.routes");
var settlement_1 = require("./settlement");
var bondRepoReport_module_1 = require("./bondRepoReport/bondRepoReport.module");
var iRSTradeReport_module_1 = require("./iRSTradeReport/iRSTradeReport.module");
var tradeReportByPM_module_1 = require("./tradeReportByPM/tradeReportByPM.module");
var trades_module_1 = require("./trades/trades.module");
var settlementService_1 = require("./settlementService");
var SettlementModule = (function () {
    function SettlementModule() {
    }
    SettlementModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, settlement_routes_1.SettlementRouting, bondRepoReport_module_1.BondRepoReportModule, iRSTradeReport_module_1.IRSTradeReportModule, tradeReportByPM_module_1.TradeReportByPMModule, trades_module_1.TradesModule
            ],
            declarations: [settlement_1.Settlement],
            providers: [settlementService_1.SettlementService]
        }), 
        __metadata('design:paramtypes', [])
    ], SettlementModule);
    return SettlementModule;
}());
exports.SettlementModule = SettlementModule;
//# sourceMappingURL=settlement.module.js.map