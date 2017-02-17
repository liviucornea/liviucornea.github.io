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
            "isComplexType": false,
            "displayName": "Name",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "CUSIP",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "CUSIP",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
        }, {
            "dbColumnName": "SEDOL",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "SEDOL",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "ISIN",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "ISIN",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "TICKER",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "TICKER",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Duration",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Duration",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "AverageRating",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Average Rating",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "SourceID",
            "htmlControlType": "text",
            "isVisible": false,
            "isComplexType": false,
            "displayName": "Source ID",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "SecurityID",
            "htmlControlType": "text",
            "isVisible": false,
            "isComplexType": false,
            "displayName": "Security ID",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Weight",
            "htmlControlType": "number",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Weight",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "isTotalVisible": true,
            "columnFormat": { format: "number", pattern: "1.1-3" },
        }, {
            "dbColumnName": "MarketCap",
            "htmlControlType": "number",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Market Cap",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "isTotalVisible": true,
            "columnFormat": { format: "number", pattern: "1.1-2" },
        }, {
            "dbColumnName": "Share_Cumulative",
            "htmlControlType": "number",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Share Cumulative",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
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
            "displayName": "Report Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
        }, {
            "dbColumnName": "SandPSubIndex",
            "htmlControlType": "select",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "S&P Sub Index",
            "dataSourceAddress": {
                tableName: "/Application/SqlStatementDetail/GetSPLookup",
                dbColumnName: "value", displayColumnName: "name", defaultValue: [{ Value: "", Name: "" }], dbParameters: { Parameters: [] }
            },
            "dataSource": undefined,
        }
    ],
    RulesConfig: [
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["required"],
            "ruleAssociates": ["ReportDate", "SandPSubIndex"],
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
exports.SandPControlConfig = {
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
//# sourceMappingURL=sAndP.config.js.map