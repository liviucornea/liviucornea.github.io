"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var bloombergTrades_routes_1 = require("./bloombergTrades.routes");
var bloombergTrades_1 = require("./bloombergTrades");
var postingsByDate_module_1 = require("./postingsByDate/postingsByDate.module");
var BloombergTradesModule = (function () {
    function BloombergTradesModule() {
    }
    BloombergTradesModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, bloombergTrades_routes_1.BloombergTradesRouting, postingsByDate_module_1.PostingsByDateModule
            ],
            declarations: [bloombergTrades_1.BloombergTrades],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], BloombergTradesModule);
    return BloombergTradesModule;
}());
exports.BloombergTradesModule = BloombergTradesModule;
//# sourceMappingURL=bloombergTrades.module.js.map