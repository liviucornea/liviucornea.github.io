"use strict";
var Validation_1 = require("../../../../../../ReusableServices/rulesSource/StandardValidation/Validation");
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
            "dbColumnName": "Duration",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Duration",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
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
            "displayName": "Market Cap",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
            "isTotalVisible": true,
            "columnFormat": { format: "number", pattern: "1.1-2" },
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
            "columnFormat": { format: "date", pattern: "shortDate" },
        }]
};
var FormBuilderConfig = {
    CustomButtons: [
        {
            name: 'RunReport',
            value: 'Run Report',
            disabled: false,
            visible: true,
            formValidate: true
        }
    ],
    ColumnConfiguration: [
        {
            "dbColumnName": "StartDate",
            "htmlControlType": "date",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Start Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "EndDate",
            "htmlControlType": "date",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "End Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "RiskAnalyticsBenchmarksIndex",
            "htmlControlType": "checkboxlist",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Select Index",
            "dataSourceAddress": { dbColumnName: "value", displayColumnName: "name" },
            "dataSource": undefined,
            "regex": undefined,
        }
    ],
    RulesConfig: [
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["required"],
            "ruleAssociates": ["StartDate", "EndDate", "RiskAnalyticsBenchmarksIndex"],
            "apiObject": "",
        }, {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["date"],
            "ruleAssociates": ["StartDate", "EndDate"],
            "apiObject": "",
        }, {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["dateCompare"],
            "ruleAssociates": ["StartDate"],
            "apiObject": "",
            "ruleValue": { CompareTo: "EndDate", CompareOperator: Validation_1.CompareOperator.LessThanEqual }
        }]
};
exports.RiskAnalyticsBenchmarksControlConfig = {
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
//# sourceMappingURL=riskAnalyticsBenchmarks.config.js.map