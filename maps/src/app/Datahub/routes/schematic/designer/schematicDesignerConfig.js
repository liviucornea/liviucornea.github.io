System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ProcessDesignerConfig;
    return {
        setters:[],
        execute: function() {
            exports_1("ProcessDesignerConfig", ProcessDesignerConfig = {
                ChildType: "edit",
                ShallHideDeleteButton: false,
                ShallHideAddButton: false,
                ColumnConfiguration: [{
                        "dbColumnName": "StepNo",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "Step Number",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                        "columnCss": "col-4",
                    },
                    {
                        "dbColumnName": "UnitName",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "Unit Name",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                        "columnCss": "col-4",
                    },
                    {
                        "dbColumnName": "ConfigurationTypeName",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "Configuration Type",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                        "columnCss": "col-4",
                    },
                    {
                        "dbColumnName": "ConfigurationTypeValue",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "Configuration Type Value",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                        "columnCss": "col-4",
                    }]
            });
        }
    }
});
//# sourceMappingURL=schematicDesignerConfig.js.map