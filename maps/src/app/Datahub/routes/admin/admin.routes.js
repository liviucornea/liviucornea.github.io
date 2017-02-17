System.register(['@angular/router', "../../../app.router.metadata", "./logs/logs", "./logs/logs.routes", "./auth/auth.routes", "./auth/auth", "./configBuilder/configBuilder", "./schedule/schedule", "./schematic/schematic.routes", "./schematic/schematic", "./treeViewBuilder/treeViewBuilder", "./applicationBuilder/applicationBuilder", "../../../ReusableServices/AuthGuard", "./schedule/schedule.routes"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, app_router_metadata_1, logs_1, logs_routes_1, auth_routes_1, auth_1, configBuilder_1, schedule_1, schematic_routes_1, schematic_1, treeViewBuilder_1, applicationBuilder_1, AuthGuard_1, schedule_routes_1;
    var Admin_RouteInfo, ADMIN_ROUTES, admin_routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
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
            function (auth_routes_1_1) {
                auth_routes_1 = auth_routes_1_1;
            },
            function (auth_1_1) {
                auth_1 = auth_1_1;
            },
            function (configBuilder_1_1) {
                configBuilder_1 = configBuilder_1_1;
            },
            function (schedule_1_1) {
                schedule_1 = schedule_1_1;
            },
            function (schematic_routes_1_1) {
                schematic_routes_1 = schematic_routes_1_1;
            },
            function (schematic_1_1) {
                schematic_1 = schematic_1_1;
            },
            function (treeViewBuilder_1_1) {
                treeViewBuilder_1 = treeViewBuilder_1_1;
            },
            function (applicationBuilder_1_1) {
                applicationBuilder_1 = applicationBuilder_1_1;
            },
            function (AuthGuard_1_1) {
                AuthGuard_1 = AuthGuard_1_1;
            },
            function (schedule_routes_1_1) {
                schedule_routes_1 = schedule_routes_1_1;
            }],
        execute: function() {
            exports_1("Admin_RouteInfo", Admin_RouteInfo = [
                { path: '', pathMatch: 'full', redirectTo: 'Auth', name: 'AdminDefault', title: 'AdminDefault', menuType: app_router_metadata_1.MenuType.NONE },
                { path: 'Auth', component: auth_1.Auth, name: 'Auth', title: 'Authorization', menuType: app_router_metadata_1.MenuType.TOP, children: [...auth_routes_1.AUTH_ROUTES] },
                { path: 'Logs', component: logs_1.Logs, name: 'Logs', title: 'Logs', menuType: app_router_metadata_1.MenuType.TOP, children: [...logs_routes_1.LOGS_ROUTES] },
                { path: 'Schedule', component: schedule_1.Schedule, name: 'Schedule', title: 'Schedule', menuType: app_router_metadata_1.MenuType.TOP, children: [...schedule_routes_1.SCHEDULE_ROUTES] },
                { path: 'Schematic', component: schematic_1.Schematic, name: 'Schematic', title: 'Schematic', menuType: app_router_metadata_1.MenuType.TOP, children: [...schematic_routes_1.SCHEMATIC_ROUTES] },
                { path: 'configBuilder', component: configBuilder_1.ConfigBuilder, name: 'configBuilder', title: 'Config Builder', menuType: app_router_metadata_1.MenuType.TOP },
                { path: 'treeViewBuilder', component: treeViewBuilder_1.TreeViewBuilder, name: 'treeViewBuilder', title: 'TreeView Builder', menuType: app_router_metadata_1.MenuType.TOP },
                { path: 'ApplicationBuilder', component: applicationBuilder_1.ApplicationBuilder, name: 'ApplicationBuilder', canActivate: [AuthGuard_1.AuthGuard], title: 'Application Builder', menuType: app_router_metadata_1.MenuType.TOP }
            ]);
            exports_1("ADMIN_ROUTES", ADMIN_ROUTES = [
                ...Admin_RouteInfo
            ]);
            exports_1("admin_routing", admin_routing = router_1.RouterModule.forChild(ADMIN_ROUTES));
        }
    }
});
//# sourceMappingURL=admin.routes.js.map