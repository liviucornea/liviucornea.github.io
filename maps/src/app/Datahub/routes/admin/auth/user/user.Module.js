"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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