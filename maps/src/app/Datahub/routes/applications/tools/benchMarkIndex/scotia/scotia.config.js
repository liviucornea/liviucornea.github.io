"use strict";
var DisplayGridConfig = {
    ChildType: "",
    PrimaryKeyColumn: "SecurityID",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    RowSelectionMode: "None",
    IsChildPage: false,
    IsScrollableGrid: true,
    ShowFilterRow: false,
    ShowFooterRow: true,
    UseBusinessValidation: false,
    ColumnConfiguration: [{
            "dbColumnName": "Name",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Name",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "CUSIP",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "CUSIP",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "SEDOL",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "SEDOL",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "ISIN",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "ISIN",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "TICKER",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "TICKER",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "MOD",
            "htmlControlType": "number",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "MOD",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
            "columnFormat": { format: "number", pattern: "1.1-5" },
            "isTotalVisible": true
        }, {
            "dbColumnName": "Duration",
            "htmlControlType": "number",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "MOD Duration",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "columnFormat": { format: "number", pattern: "1.1-2" },
            "regex": undefined,
        }, {
            "dbColumnName": "AverageRating",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Average Rating",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "SourceID",
            "htmlControlType": "text",
            "isVisible": false,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Source ID",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "SecurityID",
            "htmlControlType": "text",
            "isVisible": false,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Security ID",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "Weight",
            "htmlControlType": "number",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Weight",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
            "isTotalVisible": true,
            "columnFormat": { format: "number", pattern: "1.1-3" },
        }, {
            "dbColumnName": "MarketCap",
            "htmlControlType": "number",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "isTotalVisible": true,
            "displayName": "Market Cap",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
            "columnFormat": { format: "currency", pattern: "CAD:true:1.2-2" }
        }, {
            "dbColumnName": "Share_Cumulative",
            "htmlControlType": "number",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Share Cumulative",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
            "isTotalVisible": true,
            "columnFormat": { format: "number", pattern: "1.1-2" },
        }, {
            "dbColumnName": "Date",
            "htmlControlType": "Date",
            "isVisible": true,
            "isRequired": true,
            "isComplexType": false,
            "displayName": "Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
            "columnFormat": { format: "date", pattern: "yMMMd" },
        }]
};
var FormBuilderConfig = {
    CustomButtons: [
        {
            name: 'Preview',
            value: 'Preview',
            disabled: false,
            visible: true,
            formValidate: true
        }
    ],
    ColumnConfiguration: [
        {
            "dbColumnName": "ReportDate",
            "htmlControlType": "date",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Report Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
            "isEmitEvent": true
        }, {
            "dbColumnName": "IndexName",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Index Name",
            "dataSourceAddress": { dbColumnName: "value", displayColumnName: "name", defaultValue: [{ Value: "", Name: "" }] },
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "IndexDescription",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Index Description",
            "dataSourceAddress": { dbColumnName: "Acronym", displayColumnName: "Description", defaultValue: [{ Value: "", Name: "" }] },
            "dataSource": undefined,
            "regex": undefined,
        }
    ],
    RulesConfig: [
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["required"],
            "ruleAssociates": ["ReportDate", "IndexName", "IndexDescription"],
            "apiObject": undefined
        },
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["date"],
            "ruleAssociates": ["ReportDate"],
            "apiObject": undefined
        }]
};
exports.ScotiaControlConfig = {
    TabsList: [
        {
            TabKey: "OneTab",
            TabName: "OneTab",
            TabControls: [
                {
                    ShowDefault: true,
                    ComponentName: "FormBuilder",
                    PageType: "formbuilder",
                    gridSettings: FormBuilderConfig,
                    PageOperationType: 'dynamicform'
                },
                {
                    ShowDefault: false,
                    ComponentName: "DisplayGrid",
                    PageType: "displaygrid",
                    gridSettings: DisplayGridConfig,
                    PageOperationType: 'view'
                }
            ],
        }
    ]
};
//# sourceMappingURL=scotia.config.js.map