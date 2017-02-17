"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var accessdenied_routing_1 = require("./accessdenied.routing");
var accessdenied_1 = require("./accessdenied");
var AccessDeniedModule = (function () {
    function AccessDeniedModule() {
    }
    AccessDeniedModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, accessdenied_routing_1.AccessDeniedRouting
            ],
            declarations: [accessdenied_1.AccessDenied],
        }), 
        __metadata('design:paramtypes', [])
    ], AccessDeniedModule);
    return AccessDeniedModule;
}());
exports.AccessDeniedModule = AccessDeniedModule;
//# sourceMappingURL=accessdenied.module.js.map