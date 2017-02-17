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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var SharedModule_1 = require("../../../../ReusableComponents/SharedModule");
var auth_1 = require("./auth");
var user_Module_1 = require("./user/user.Module");
var roler_Module_1 = require("./role/roler.Module");
var auth_routes_1 = require("./auth.routes");
var resource_Module_1 = require("./resource/resource.Module");
var notification_Module_1 = require("./notificationAlert/notification.Module");
var menuItem_Module_1 = require("./menuItem/menuItem.Module");
var adminAuthApiService_1 = require("./adminAuthApiService");
var applicationsList_module_1 = require("./applicationsList/applicationsList.module");
var AuthModule = (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, auth_routes_1.AuthRouting, user_Module_1.AuthUserModule, roler_Module_1.AuthRoleModule, resource_Module_1.ResourceModule,
                notification_Module_1.NotificationModule, menuItem_Module_1.MenuItemModule, applicationsList_module_1.ApplicationsListModule
            ],
            declarations: [auth_1.Auth],
            providers: [adminAuthApiService_1.AdminAuthApiService]
        }), 
        __metadata('design:paramtypes', [])
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.mainModule.js.map