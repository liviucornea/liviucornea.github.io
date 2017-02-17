"use strict";
var AdminFormBuilderConfig = {
    ColumnConfiguration: [
        {
            "dbColumnName": "Module",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Module",
            "dataSourceAddress": { tableName: "/Application/SqlStatementDetail/ManagedProgramDB_GetModule", dbColumnName: "id", displayColumnName: "Name",
                dbParameters: { Parameters: [{ Name: "@ModuleType", Value: null }], defaultValue: [{ Value: "", Name: "" }] } },
            "dataSource": undefined,
            "regex": undefined,
        }
    ],
    RulesConfig: [
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["required"],
            "ruleAssociates": ["Module"],
            "apiObject": undefined
        }]
};
exports.ModalGridConfig = {
    ChildType: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsChildPage: false,
    ShowFilterRow: false,
    ShowFooterRow: false,
    ColumnConfiguration: [{
            "dbColumnName": "PortfolioNumber",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Portfolio Number",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "PortfolioName",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Portfolio Name",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }]
};
var AdminDisplayGridConfig = {
    ChildType: "",
    IsSpreadsheetGrid: true,
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsChildPage: false,
    IsScrollableGrid: true,
    ShowFilterRow: false,
    ShowFooterRow: false,
    CustomButtons: [
        {
            name: 'Edit',
            value: 'Edit',
            formValidate: false,
            disabled: false,
            visible: true
        }],
    ColumnConfiguration: [{
            "dbColumnName": "Model_Value",
            "htmlControlType": "text",
            "isVisible": false,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Model_Value",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "Model",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Model",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "Model Weight",
            "htmlControlType": "number",
            "isAllowGridLevelEdit": true,
            "isVisible": true,
            "isRequired": true,
            "isComplexType": false,
            "displayName": "Percent",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
            "columnFormat": { format: "number", pattern: "1.1-4" }
        }, {
            "dbColumnName": "Priority",
            "htmlControlType": "number",
            "isAllowGridLevelEdit": true,
            "isVisible": true,
            "isRequired": true,
            "isComplexType": false,
            "displayName": "Priority",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }]
};
var AdminEditGridConfig = {
    ChildType: "editInline",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsChildPage: false,
    IsScrollableGrid: true,
    ShowFilterRow: false,
    ShowFooterRow: false,
    CustomButtons: [
        {
            name: 'Setup',
            value: 'Setup',
            formValidate: true,
            disabled: false,
            visible: true
        }],
    ColumnConfiguration: [{
            "dbColumnName": "Model_Value",
            "htmlControlType": "text",
            "isVisible": false,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Model_Value",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "Model",
            "htmlControlType": "text",
            "isVisible": true,
            "readOnly": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Model",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "ModelName",
            "htmlControlType": "text",
            "isVisible": true,
            "readOnly": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Model Name",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "Percent",
            "htmlControlType": "number",
            "isAllowGridLevelEdit": true,
            "isVisible": true,
            "isRequired": true,
            "isComplexType": false,
            "displayName": "Percent",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
            "columnFormat": { format: "number", pattern: "1.1-4" }
        }, {
            "dbColumnName": "Priority",
            "htmlControlType": "number",
            "isAllowGridLevelEdit": true,
            "isVisible": true,
            "isRequired": true,
            "isComplexType": false,
            "displayName": "Priority",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }]
};
var LockdownFormBuilderConfig = {
    ColumnConfiguration: [],
    RulesConfig: []
};
var ConstructionToolFormBuilderConfig = {
    ColumnConfiguration: [],
    RulesConfig: []
};
exports.AnalysisConstructionToolConfig = {
    TabsList: [
        {
            TabKey: "Admin",
            TabName: "Administration",
            TabControls: [
                {
                    ShowDefault: true,
                    ComponentName: "AdminFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: AdminFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                }, {
                    ShowDefault: false,
                    ComponentName: "AdminDisplayGrid",
                    PageType: "displaygrid",
                    gridSettings: AdminDisplayGridConfig,
                    PageOperationType: 'view'
                }
            ],
        }, {
            TabKey: "Lockdown",
            TabName: "Lockdown",
            TabControls: [
                {
                    ShowDefault: true,
                    ComponentName: "LockdownFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: LockdownFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                }
            ],
        }, {
            TabKey: "ConstructionTool",
            TabName: "Portfolio Analysis and Construction Tool",
            TabControls: [
                {
                    ShowDefault: true,
                    ComponentName: "ConstructionToolFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: ConstructionToolFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                }
            ],
        }
    ]
};
//# sourceMappingURL=analysisConstructionTool.config.js.map