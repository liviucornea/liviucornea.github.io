"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require("@angular/platform-browser");
var user_routing_1 = require("./user.routing");
var user_1 = require("./user");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var AuthUserModule = (function () {
    function AuthUserModule() {
    }
    AuthUserModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, user_routing_1.UserRouting, SharedModule_1.SharedModule],
            declarations: [user_1.AuthUser],
        }), 
        __metadata('design:paramtypes', [])
    ], AuthUserModule);
    return AuthUserModule;
}());
exports.AuthUserModule = AuthUserModule;
//# sourceMappingURL=user.Module.js.map