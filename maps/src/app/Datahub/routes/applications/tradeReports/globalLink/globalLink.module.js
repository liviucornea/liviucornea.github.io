"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var globalLink_routes_1 = require("./globalLink.routes");
var globalLink_1 = require("./globalLink");
var postingsByDate_module_1 = require("./postingsByDate/postingsByDate.module");
var GlobalLinkModule = (function () {
    function GlobalLinkModule() {
    }
    GlobalLinkModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, globalLink_routes_1.GlobalLinkRouting, postingsByDate_module_1.PostingsByDateModule
            ],
            declarations: [globalLink_1.GlobalLink],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], GlobalLinkModule);
    return GlobalLinkModule;
}());
exports.GlobalLinkModule = GlobalLinkModule;
//# sourceMappingURL=globalLink.module.js.map