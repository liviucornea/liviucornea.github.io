System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var HolidaySetCodeControlConfig;
    return {
        setters:[],
        execute: function() {
            exports_1("HolidaySetCodeControlConfig", HolidaySetCodeControlConfig = {
                ChildType: "edit",
                ShallHideDeleteButton: false,
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
                        "isToggleable": false
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
                        "columnCss": "col-6",
                        "isToggleable": true,
                    },
                    {
                        "dbColumnName": "ExternalCode",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "External Code",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "^[a-zA-Z.]{2,30}$",
                        "columnCss": "col-9",
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
                        "isToggleable": false,
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
                        "columnCss": undefined,
                        "isToggleable": false
                    }]
            });
        }
    }
});
//# sourceMappingURL=holidaySetCodeConfig.js.map