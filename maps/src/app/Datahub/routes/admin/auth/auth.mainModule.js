"use strict";
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