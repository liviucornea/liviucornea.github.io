System.register(["../app.router.metadata"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var app_router_metadata_1;
    var Auth_RouteInfo, AUTH_ROUTES, TradeReports_RouteInfo, TRADE_REPORTS_ROUTES, Tools_RouteInfo, TOOLS_ROUTES, ExceptionReports_RouteInfo, EXCEPTION_REPORTS_ROUTES, Applications_RouteInfo, APPLICATIONS_ROUTES, Schedule_RouteInfo, SCHEDULE_ROUTES, Logs_RouteInfo, LOGS_ROUTES, Localization_RouteInfo, LOCALIZATION_ROUTES, Schematic_RouteInfo, SCHEMATIC_ROUTES, Admin_RouteInfo, ADMIN_ROUTES, Datahub_RouteInfo, DATAHUB_ROUTES, HtmlRoutes;
    return {
        setters:[
            function (app_router_metadata_1_1) {
                app_router_metadata_1 = app_router_metadata_1_1;
            }],
        execute: function() {
            Auth_RouteInfo = [
                { path: 'User', name: 'User', title: 'User', menuType: app_router_metadata_1.MenuType.LEFT },
                { path: 'Role', name: 'Role', title: 'Role', menuType: app_router_metadata_1.MenuType.LEFT },
                { path: 'Resource', name: 'Resource', title: 'Resource', menuType: app_router_metadata_1.MenuType.LEFT },
                { path: 'NotificationAlert', name: 'NotificationAlert', title: 'Notification Alert', menuType: app_router_metadata_1.MenuType.LEFT },
                { path: 'MenuItem', name: 'MenuItem', title: 'Menu Items', menuType: app_router_metadata_1.MenuType.LEFT }
            ];
            AUTH_ROUTES = [
                ...Auth_RouteInfo
            ];
            TradeReports_RouteInfo = [
                { path: 'PostingsByDate', name: 'PostingsByDate', title: 'Postings By Date', menuType: app_router_metadata_1.MenuType.LEFT },
            ];
            TRADE_REPORTS_ROUTES = [
                ...TradeReports_RouteInfo
            ];
            Tools_RouteInfo = [
                { path: 'BenchMarkIndex', name: 'BenchMarkIndex', title: 'BenchMark Index', menuType: app_router_metadata_1.MenuType.LEFT },
                { path: 'BloombergAIM', name: 'BloombergAIM', title: 'Bloomberg AIM', menuType: app_router_metadata_1.MenuType.LEFT },
            ];
            TOOLS_ROUTES = [
                ...Tools_RouteInfo
            ];
            ExceptionReports_RouteInfo = [
                { path: 'NewSecurities', name: 'NewSecurities', title: 'New Securities', menuType: app_router_metadata_1.MenuType.LEFT },
            ];
            EXCEPTION_REPORTS_ROUTES = [
                ...ExceptionReports_RouteInfo
            ];
            Applications_RouteInfo = [
                { path: 'Tools', name: 'Tools', title: 'Tools', menuType: app_router_metadata_1.MenuType.TOP, children: [...TOOLS_ROUTES] },
                { path: 'ExceptionReports', name: 'ExceptionReports', title: 'Exception Reports', menuType: app_router_metadata_1.MenuType.TOP, children: [...EXCEPTION_REPORTS_ROUTES] },
                { path: 'TradeReports', name: 'TradeReports', title: 'Trade Reports', menuType: app_router_metadata_1.MenuType.TOP, children: [...TRADE_REPORTS_ROUTES] },
            ];
            APPLICATIONS_ROUTES = [
                ...Applications_RouteInfo
            ];
            Schedule_RouteInfo = [
                { path: 'HolidaySetCode', name: 'HolidaySetCode', title: 'Holiday Set Code', menuType: app_router_metadata_1.MenuType.TOP },
                { path: 'Holiday', name: 'Holiday', title: 'Holiday', menuType: app_router_metadata_1.MenuType.TOP },
                { path: 'Config', name: 'Config', title: 'Config', menuType: app_router_metadata_1.MenuType.TOP },
            ];
            SCHEDULE_ROUTES = [
                ...Schedule_RouteInfo
            ];
            Logs_RouteInfo = [
                { path: 'List', name: 'List', title: 'List', menuType: app_router_metadata_1.MenuType.LEFT }
            ];
            LOGS_ROUTES = [
                ...Logs_RouteInfo
            ];
            Localization_RouteInfo = [
                { path: 'Language', name: 'Language', title: 'Language', menuType: app_router_metadata_1.MenuType.TOP },
                { path: 'ValueSet', name: 'ValueSet', title: 'Value Set', menuType: app_router_metadata_1.MenuType.TOP },
            ];
            LOCALIZATION_ROUTES = [
                ...Localization_RouteInfo
            ];
            Schematic_RouteInfo = [
                { path: 'Configuration', name: 'Configuration', title: 'Configuration', menuType: app_router_metadata_1.MenuType.LEFT },
                { path: 'Pipeline', name: 'Pipeline', title: 'Pipeline', menuType: app_router_metadata_1.MenuType.LEFT },
                { path: 'SchematicDesigner', name: 'SchematicDesigner', title: 'Schematic Designer', menuType: app_router_metadata_1.MenuType.LEFT },
                { path: 'SchematicExecution', name: 'SchematicExecution', title: 'Schematic Execution', menuType: app_router_metadata_1.MenuType.LEFT }
            ];
            SCHEMATIC_ROUTES = [
                ...Schematic_RouteInfo
            ];
            Admin_RouteInfo = [
                { path: 'Auth', name: 'Auth', title: 'Authorization', menuType: app_router_metadata_1.MenuType.TOP, children: [...AUTH_ROUTES] },
                { path: 'Logs', name: 'Logs', title: 'Logs', menuType: app_router_metadata_1.MenuType.TOP, children: [...LOGS_ROUTES] },
                { path: 'Schedule', name: 'Schedule', title: 'Schedule', menuType: app_router_metadata_1.MenuType.TOP, children: [...SCHEDULE_ROUTES] },
                { path: 'Schematic', name: 'Schematic', title: 'Schematic', menuType: app_router_metadata_1.MenuType.TOP, children: [...SCHEMATIC_ROUTES] },
                { path: 'configBuilder', name: 'configBuilder', title: 'Config Builder', menuType: app_router_metadata_1.MenuType.TOP },
                { path: 'ApplicationTreeView', name: 'ApplicationTreeView', title: 'Application TreeView', menuType: app_router_metadata_1.MenuType.TOP, paramValue: { modelName: 'customerinfo', id: '1' } },
                { path: 'CustomerInfo', name: 'ApplicationTreeView', title: 'Customer Info', menuType: app_router_metadata_1.MenuType.TOP, paramValue: { modelName: 'customerinfo', id: '1' } },
                { path: 'ApplicationBuilder', name: 'ApplicationBuilder', title: 'Application Builder', menuType: app_router_metadata_1.MenuType.TOP },
                { path: 'Localization', name: 'Localization', title: 'Localization', menuType: app_router_metadata_1.MenuType.TOP, children: [...LOCALIZATION_ROUTES] }
            ];
            ADMIN_ROUTES = [
                ...Admin_RouteInfo
            ];
            Datahub_RouteInfo = [
                { path: 'Home', name: 'Home', title: 'Home', menuType: app_router_metadata_1.MenuType.TOP },
                { path: 'Admin', name: 'Admin', title: 'Administration', menuType: app_router_metadata_1.MenuType.TOP, children: [...ADMIN_ROUTES] },
                { path: 'AccessDenied', name: 'AccessDenied', title: 'Access Denied', menuType: app_router_metadata_1.MenuType.NONE },
                { path: 'Applications', name: 'Applications', title: 'Applications', menuType: app_router_metadata_1.MenuType.TOP, children: [...APPLICATIONS_ROUTES] }
            ];
            DATAHUB_ROUTES = [
                ...Datahub_RouteInfo
            ];
            exports_1("HtmlRoutes", HtmlRoutes = [
                { path: 'Datahub', name: "Datahub", title: "Default", children: [...DATAHUB_ROUTES], menuType: app_router_metadata_1.MenuType.LEFT },
            ]);
        }
    }
});
//# sourceMappingURL=htmlRoutes.js.map