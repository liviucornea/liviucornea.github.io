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
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var SharedModule_1 = require("../../../../../../ReusableComponents/SharedModule");
var tradeReportByPM_routes_1 = require("./tradeReportByPM.routes");
var tradeReportByPM_1 = require("./tradeReportByPM");
var TradeReportByPMModule = (function () {
    function TradeReportByPMModule() {
    }
    TradeReportByPMModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, forms_1.FormsModule, tradeReportByPM_routes_1.TradeReportByPMRouting
            ],
            declarations: [tradeReportByPM_1.TradeReportByPM],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], TradeReportByPMModule);
    return TradeReportByPMModule;
}());
exports.TradeReportByPMModule = TradeReportByPMModule;
//# sourceMappingURL=tradeReportByPM.module.js.map