"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require("@angular/platform-browser");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var role_1 = require("./role");
var role_routing_1 = require("./role.routing");
var AuthRoleModule = (function () {
    function AuthRoleModule() {
    }
    AuthRoleModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, role_routing_1.RoleRouting, SharedModule_1.SharedModule],
            declarations: [role_1.AuthRole],
        }), 
        __metadata('design:paramtypes', [])
    ], AuthRoleModule);
    return AuthRoleModule;
}());
exports.AuthRoleModule = AuthRoleModule;
//# sourceMappingURL=roler.Module.js.map