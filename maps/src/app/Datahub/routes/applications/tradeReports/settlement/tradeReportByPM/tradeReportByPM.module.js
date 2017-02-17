"use strict";
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