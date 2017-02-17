System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MenuChild, NotificationAlertChild, TabDemoMainControlConfig;
    return {
        setters:[],
        execute: function() {
            MenuChild = {
                ChildType: "edit",
                ShallHideDeleteButton: true,
                ShallHideAddButton: true,
                PaginationPageLimit: 10,
                ShowFilterRow: true,
                IsScrollableGrid: true,
                ColumnConfiguration: [{
                        "dbColumnName": "Id",
                        "htmlControlType": "text",
                        "isVisible": false,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "Id",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                    },
                    {
                        "dbColumnName": "LookupKey",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": true,
                        "isComplexType": false,
                        "displayName": "LookupKey",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "^[a-zA-Z.]{2,30}$",
                    },
                    {
                        "dbColumnName": "Route",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": true,
                        "isComplexType": false,
                        "displayName": "Route",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "^[a-zA-Z.]{2,30}$",
                    },
                    {
                        "dbColumnName": "ViewConfig",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isComplexType": false,
                        "isRequired": false,
                        "displayName": "ViewConfig",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                    },
                    {
                        "dbColumnName": "Title",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": true,
                        "isComplexType": false,
                        "displayName": "Title",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "^[a-zA-Z.]{2,30}$",
                    },
                    {
                        "dbColumnName": "MenuType",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "Menu Type",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "^[a-zA-Z.]{2,30}$",
                    },
                    {
                        "dbColumnName": "Parameter",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "Parameters",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "^[a-zA-Z.]{2,30}$",
                    },
                    {
                        "dbColumnName": "VersionStamp",
                        "htmlControlType": "text",
                        "isVisible": false,
                        "isComplexType": false,
                        "isRequired": false,
                        "displayName": "VersionStamp",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                    }]
            };
            NotificationAlertChild = {
                ChildType: "edit",
                ShallHideDeleteButton: true,
                ShallHideAddButton: false,
                CustomButtons: [{ name: 'Publish', value: 'Publish' }, { name: 'Return', value: 'Return' }],
                ColumnConfiguration: [{
                        "dbColumnName": "Id",
                        "htmlControlType": "text",
                        "isVisible": false,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "Id",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                    },
                    {
                        "dbColumnName": "Description",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "Description",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "^[a-zA-Z.]{2,30}$",
                    },
                    {
                        "dbColumnName": "StartDate",
                        "htmlControlType": "datetime-local",
                        "isVisible": true,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "Start Date",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                    },
                    {
                        "dbColumnName": "EndDate",
                        "htmlControlType": "datetime-local",
                        "isVisible": true,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "End Date",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                    },
                    {
                        "dbColumnName": "IsActive",
                        "htmlControlType": "checkbox",
                        "isVisible": true,
                        "isComplexType": false,
                        "isRequired": false,
                        "displayName": "Active",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                    },
                    {
                        "dbColumnName": "RoleId",
                        "htmlControlType": "select",
                        "isVisible": true,
                        "isComplexType": false,
                        "isRequired": false,
                        "displayName": "Role",
                        "dataSourceAddress": { tableName: "/auth/role", dbColumnName: "Id", displayColumnName: "Description" },
                        "dataSource": undefined,
                        "regex": undefined,
                    },
                    {
                        "dbColumnName": "CreatedBy",
                        "htmlControlType": "select",
                        "isVisible": true,
                        "isComplexType": false,
                        "isRequired": false,
                        "displayName": "CreatedBy",
                        "dataSourceAddress": { tableName: "/auth/User", dbColumnName: "Id", displayColumnName: "Login" },
                        "dataSource": undefined,
                        "regex": undefined,
                    },
                    {
                        "dbColumnName": "VersionStamp",
                        "htmlControlType": "text",
                        "isVisible": false,
                        "isComplexType": false,
                        "isRequired": false,
                        "displayName": "VersionStamp",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                    }]
            };
            exports_1("TabDemoMainControlConfig", TabDemoMainControlConfig = {
                TabsList: [
                    {
                        TabKey: "Menu",
                        TabName: "Menu",
                        TabControls: [
                            {
                                ShowDefault: true,
                                PageName: "alert",
                                PageType: "formbuilder",
                                gridSettings: NotificationAlertChild,
                                PageOperationType: 'dynamicform'
                            },
                            {
                                ShowDefault: false,
                                PageName: "menuitem",
                                PageType: "displaygrid",
                                gridSettings: MenuChild,
                                PageOperationType: 'view'
                            }
                        ],
                    },
                    {
                        TabKey: "NotificationAlert",
                        TabName: "Notification Alert",
                        TabControls: [
                            {
                                ShowDefault: true,
                                PageName: "alert",
                                PageType: "formbuilder",
                                gridSettings: NotificationAlertChild,
                                PageOperationType: 'dynamicform'
                            }
                        ],
                    }
                ]
            });
        }
    }
});
//# sourceMappingURL=tabDemoConfig.js.map