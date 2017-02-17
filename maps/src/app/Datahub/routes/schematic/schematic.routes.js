System.register(["../../../app.router.metadata", "./configuration/configuration", "@angular/router", "./designer/schematicDesigner", "./Execution/schematicExecution"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var app_router_metadata_1, configuration_1, router_1, schematicDesigner_1, schematicExecution_1;
    var Schematic_RouteInfo, SCHEMATIC_ROUTES, schmeatic_routing;
    return {
        setters:[
            function (app_router_metadata_1_1) {
                app_router_metadata_1 = app_router_metadata_1_1;
            },
            function (configuration_1_1) {
                configuration_1 = configuration_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (schematicDesigner_1_1) {
                schematicDesigner_1 = schematicDesigner_1_1;
            },
            function (schematicExecution_1_1) {
                schematicExecution_1 = schematicExecution_1_1;
            }],
        execute: function() {
            exports_1("Schematic_RouteInfo", Schematic_RouteInfo = [
                { path: '', pathMatch: 'full', redirectTo: 'Configuration', name: 'Default', menuType: app_router_metadata_1.MenuType.NONE },
                { path: 'Configuration', component: configuration_1.Configuration, name: 'Configuration', menuType: app_router_metadata_1.MenuType.LEFT },
                { path: 'SchematicDesigner', component: schematicDesigner_1.SchematicDesigner, name: 'SchematicDesigner', menuType: app_router_metadata_1.MenuType.LEFT },
                { path: 'SchematicExecution', component: schematicExecution_1.SchematicExecution, name: 'SchematicExecution', menuType: app_router_metadata_1.MenuType.LEFT }
            ]);
            exports_1("SCHEMATIC_ROUTES", SCHEMATIC_ROUTES = Schematic_RouteInfo.slice());
            exports_1("schmeatic_routing", schmeatic_routing = router_1.RouterModule.forChild(SCHEMATIC_ROUTES));
        }
    }
});
//# sourceMappingURL=schematic.routes.js.map