System.register(['@angular/router', "../../../app.router.metadata", "./user/user", "./role/role", "./resource/resource", "./notificationAlert/notificationAlert"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, app_router_metadata_1, user_1, role_1, resource_1, notificationAlert_1;
    var Auth_RouteInfo, AUTH_ROUTES, auth_routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_router_metadata_1_1) {
                app_router_metadata_1 = app_router_metadata_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (role_1_1) {
                role_1 = role_1_1;
            },
            function (resource_1_1) {
                resource_1 = resource_1_1;
            },
            function (notificationAlert_1_1) {
                notificationAlert_1 = notificationAlert_1_1;
            }],
        execute: function() {
            exports_1("Auth_RouteInfo", Auth_RouteInfo = [
                { path: '', pathMatch: 'full', redirectTo: 'User', name: 'User', menuType: app_router_metadata_1.MenuType.NONE },
                { path: 'User', component: user_1.AuthUser, name: 'User', menuType: app_router_metadata_1.MenuType.LEFT },
                { path: 'Role', component: role_1.AuthRole, name: 'Role', menuType: app_router_metadata_1.MenuType.LEFT },
                { path: 'Resource', component: resource_1.AuthResource, name: 'Resource', menuType: app_router_metadata_1.MenuType.LEFT },
                { path: 'NotificationAlert', component: notificationAlert_1.NotificationAlert, name: 'NotificationAlert', menuType: app_router_metadata_1.MenuType.LEFT }
            ]);
            exports_1("AUTH_ROUTES", AUTH_ROUTES = Auth_RouteInfo.slice());
            exports_1("auth_routing", auth_routing = router_1.RouterModule.forChild(AUTH_ROUTES));
        }
    }
});
//# sourceMappingURL=auth.routes.js.map