"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var excelTrades_routes_1 = require("./excelTrades.routes");
var excelTrades_1 = require("./excelTrades");
var postingsByDateTrader_module_1 = require("./postingsByDateTrader/postingsByDateTrader.module");
var ExcelTradesModule = (function () {
    function ExcelTradesModule() {
    }
    ExcelTradesModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, excelTrades_routes_1.ExcelTradesRouting, postingsByDateTrader_module_1.PostingsByDateTraderModule
            ],
            declarations: [excelTrades_1.ExcelTrades],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], ExcelTradesModule);
    return ExcelTradesModule;
}());
exports.ExcelTradesModule = ExcelTradesModule;
//# sourceMappingURL=excelTrades.module.js.map