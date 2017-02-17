System.register(['@angular/router', "./home/home", "../app.router.metadata", "./routes/logs/logs", "./routes/logs/logs.routes", "./routes/auth/auth", "./routes/auth/auth.routes", "./routes/schematic/schematic", "./routes/schematic/schematic.routes", "./routes/schedule/schedule.routes", "./routes/schedule/schedule"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, home_1, app_router_metadata_1, logs_1, logs_routes_1, auth_1, auth_routes_1, schematic_1, schematic_routes_1, schedule_routes_1, schedule_1;
    var Datahub_RouteInfo, DATAHUB_ROUTES, datahub_routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (home_1_1) {
                home_1 = home_1_1;
            },
            function (app_router_metadata_1_1) {
                app_router_metadata_1 = app_router_metadata_1_1;
            },
            function (logs_1_1) {
                logs_1 = logs_1_1;
            },
            function (logs_routes_1_1) {
                logs_routes_1 = logs_routes_1_1;
            },
            function (auth_1_1) {
                auth_1 = auth_1_1;
            },
            function (auth_routes_1_1) {
                auth_routes_1 = auth_routes_1_1;
            },
            function (schematic_1_1) {
                schematic_1 = schematic_1_1;
            },
            function (schematic_routes_1_1) {
                schematic_routes_1 = schematic_routes_1_1;
            },
            function (schedule_routes_1_1) {
                schedule_routes_1 = schedule_routes_1_1;
            },
            function (schedule_1_1) {
                schedule_1 = schedule_1_1;
            }],
        execute: function() {
            exports_1("Datahub_RouteInfo", Datahub_RouteInfo = [
                { path: '', pathMatch: 'full', redirectTo: 'Home', name: 'Default', menuType: app_router_metadata_1.MenuType.NONE },
                { path: 'Home', component: home_1.Home, name: 'Home', menuType: app_router_metadata_1.MenuType.TOP },
                { path: 'Logs', component: logs_1.Logs, name: 'Logs', menuType: app_router_metadata_1.MenuType.TOP, children: logs_routes_1.LOGS_ROUTES.slice() },
                { path: 'Auth', component: auth_1.Auth, name: 'Auth', menuType: app_router_metadata_1.MenuType.TOP, children: auth_routes_1.AUTH_ROUTES.slice() },
                { path: 'Schedule', component: schedule_1.Schedule, name: 'Schedule', menuType: app_router_metadata_1.MenuType.TOP, children: schedule_routes_1.SCHEDULE_ROUTES.slice() },
                { path: 'Schematic', component: schematic_1.Schematic, name: 'Schematic', menuType: app_router_metadata_1.MenuType.TOP, children: schematic_routes_1.SCHEMATIC_ROUTES.slice() }
            ]);
            exports_1("DATAHUB_ROUTES", DATAHUB_ROUTES = Datahub_RouteInfo.slice());
            exports_1("datahub_routing", datahub_routing = router_1.RouterModule.forChild(DATAHUB_ROUTES));
        }
    }
});
//# sourceMappingURL=datahub.routes.js.map