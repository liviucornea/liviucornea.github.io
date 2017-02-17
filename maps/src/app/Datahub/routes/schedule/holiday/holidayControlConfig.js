System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var HolidayControlConfig;
    return {
        setters:[],
        execute: function() {
            exports_1("HolidayControlConfig", HolidayControlConfig = {
                ChildType: "editInline",
                ShallHideDeleteButton: false,
                IsSpreadsheetGrid: true,
                ShallHideAddButton: false,
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
                        "columnCss": undefined,
                        "isAllowGridLevelEdit": false,
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
                        "columnCss": "col-5",
                        "isAllowGridLevelEdit": true,
                    },
                    {
                        "dbColumnName": "HolidayDate",
                        "htmlControlType": "datetime-local",
                        "isVisible": true,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "Holiday Date",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                        "columnCss": "col-5",
                        "isAllowGridLevelEdit": true,
                    },
                    {
                        "dbColumnName": "HolidaysSetCodeId",
                        "htmlControlType": "select",
                        "isVisible": true,
                        "isComplexType": false,
                        "isRequired": true,
                        "displayName": "Holiday Set Code",
                        "dataSourceAddress": { tableName: "/schedules/holidayssetcode", dbColumnName: "Id", displayColumnName: "Description" },
                        "dataSource": undefined,
                        "regex": undefined,
                        "columnCss": "col-4",
                        "isAllowGridLevelEdit": true,
                        "isToggleable": false
                    },
                    {
                        "dbColumnName": "IsActive",
                        "htmlControlType": "checkbox",
                        "isVisible": true,
                        "isComplexType": false,
                        "isRequired": true,
                        "displayName": "Active",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                        "columnCss": "col-3",
                        "isAllowGridLevelEdit": true,
                        "isToggleable": true
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
                        "columnCss": "col-3",
                        "isAllowGridLevelEdit": false,
                    }]
            });
        }
    }
});
//# sourceMappingURL=holidayControlConfig.js.map