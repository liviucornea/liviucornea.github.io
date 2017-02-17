"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var SharedModule_1 = require("../../../../../../ReusableComponents/SharedModule");
var postingsByDateTrader_routes_1 = require("./postingsByDateTrader.routes");
var postingsByDateTrader_1 = require("./postingsByDateTrader");
var PostingsByDateTraderModule = (function () {
    function PostingsByDateTraderModule() {
    }
    PostingsByDateTraderModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, forms_1.FormsModule, postingsByDateTrader_routes_1.PostingsByDateTraderRouting
            ],
            declarations: [postingsByDateTrader_1.PostingsByDateTrader],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], PostingsByDateTraderModule);
    return PostingsByDateTraderModule;
}());
exports.PostingsByDateTraderModule = PostingsByDateTraderModule;
//# sourceMappingURL=postingsByDateTrader.module.js.map