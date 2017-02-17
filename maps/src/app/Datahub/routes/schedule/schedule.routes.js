System.register(['@angular/router', "../../../app.router.metadata", "./holidaySetCode/holidaySetCode", "./holiday/holiday", "./config/config"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, app_router_metadata_1, holidaySetCode_1, holiday_1, config_1;
    var Schedule_RouteInfo, SCHEDULE_ROUTES, schedule_routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_router_metadata_1_1) {
                app_router_metadata_1 = app_router_metadata_1_1;
            },
            function (holidaySetCode_1_1) {
                holidaySetCode_1 = holidaySetCode_1_1;
            },
            function (holiday_1_1) {
                holiday_1 = holiday_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }],
        execute: function() {
            exports_1("Schedule_RouteInfo", Schedule_RouteInfo = [
                { path: '', pathMatch: 'full', redirectTo: 'HolidaySetCode', name: 'Default', menuType: app_router_metadata_1.MenuType.NONE },
                { path: 'HolidaySetCode', component: holidaySetCode_1.HolidaySetCode, name: 'HolidaySetCode', menuType: app_router_metadata_1.MenuType.TOP },
                { path: 'Holiday', component: holiday_1.Holiday, name: 'Holiday', menuType: app_router_metadata_1.MenuType.TOP },
                { path: 'Config', component: config_1.Config, name: 'Config', menuType: app_router_metadata_1.MenuType.TOP },
            ]);
            exports_1("SCHEDULE_ROUTES", SCHEDULE_ROUTES = Schedule_RouteInfo.slice());
            exports_1("schedule_routing", schedule_routing = router_1.RouterModule.forChild(SCHEDULE_ROUTES));
        }
    }
});
//# sourceMappingURL=schedule.routes.js.map