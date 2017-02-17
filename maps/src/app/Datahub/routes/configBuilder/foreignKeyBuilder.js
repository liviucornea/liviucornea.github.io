System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ForeignKeyBuilderConfig;
    return {
        setters:[],
        execute: function() {
            exports_1("ForeignKeyBuilderConfig", ForeignKeyBuilderConfig = {
                ColumnConfiguration: [
                    {
                        "dbColumnName": "tableName",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": true,
                        "isComplexType": false,
                        "displayName": "Foreign Table Name",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "",
                        "columnCss": "",
                        "isAllowGridLevelEdit": false,
                        "isToggleable": false,
                    },
                    {
                        "dbColumnName": "dbColumnName",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": true,
                        "isComplexType": false,
                        "displayName": " ForeignKey Column Name",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "",
                        "columnCss": "",
                        "isAllowGridLevelEdit": false,
                        "isToggleable": false,
                    },
                    {
                        "dbColumnName": "displayColumnName",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": true,
                        "isComplexType": false,
                        "displayName": "Display Column Name",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "",
                        "columnCss": "",
                        "isAllowGridLevelEdit": false,
                        "isToggleable": false,
                    }]
            });
        }
    }
});
//# sourceMappingURL=foreignKeyBuilder.js.map