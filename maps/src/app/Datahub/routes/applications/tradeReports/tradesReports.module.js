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