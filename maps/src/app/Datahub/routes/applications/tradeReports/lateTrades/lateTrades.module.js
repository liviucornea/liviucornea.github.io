"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var lateTrades_routes_1 = require("./lateTrades.routes");
var lateTrades_1 = require("./lateTrades");
var lateTradesReport_module_1 = require("./lateTradesReport/lateTradesReport.module");
var LateTradesModule = (function () {
    function LateTradesModule() {
    }
    LateTradesModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, lateTrades_routes_1.LateTradesRouting, lateTradesReport_module_1.LateTradesReportModule
            ],
            declarations: [lateTrades_1.LateTrades],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], LateTradesModule);
    return LateTradesModule;
}());
exports.LateTradesModule = LateTradesModule;
//# sourceMappingURL=lateTrades.module.js.map