System.register(["../../../app.router.metadata", "./list/list", "@angular/router"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var app_router_metadata_1, list_1, router_1;
    var Logs_RouteInfo, LOGS_ROUTES, logs_routing;
    return {
        setters:[
            function (app_router_metadata_1_1) {
                app_router_metadata_1 = app_router_metadata_1_1;
            },
            function (list_1_1) {
                list_1 = list_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            exports_1("Logs_RouteInfo", Logs_RouteInfo = [
                { path: '', pathMatch: 'full', redirectTo: 'List', name: 'Default', menuType: app_router_metadata_1.MenuType.NONE },
                { path: 'List', component: list_1.List, name: 'List', menuType: app_router_metadata_1.MenuType.LEFT }
            ]);
            exports_1("LOGS_ROUTES", LOGS_ROUTES = Logs_RouteInfo.slice());
            exports_1("logs_routing", logs_routing = router_1.RouterModule.forChild(LOGS_ROUTES));
        }
    }
});
//# sourceMappingURL=logs.routes.js.map