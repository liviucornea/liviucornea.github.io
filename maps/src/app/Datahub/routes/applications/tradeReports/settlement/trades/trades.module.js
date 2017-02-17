"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var SharedModule_1 = require("../../../../../../ReusableComponents/SharedModule");
var trades_routes_1 = require("./trades.routes");
var trades_1 = require("./trades");
var TradesModule = (function () {
    function TradesModule() {
    }
    TradesModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, forms_1.FormsModule, trades_routes_1.TradesRouting
            ],
            declarations: [trades_1.Trades],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], TradesModule);
    return TradesModule;
}());
exports.TradesModule = TradesModule;
//# sourceMappingURL=trades.module.js.map