"use strict";
var FormBuilderConfig = {
    CustomButtons: [
        {
            name: 'RunReport',
            value: 'Run Report',
            disabled: false,
            visible: true,
            formValidate: true
        },
        {
            name: 'ResetParameters',
            value: 'Reset Parameters',
            disabled: false,
            visible: true,
            formValidate: true
        }
    ],
    ColumnConfiguration: [
        {
            "dbColumnName": "TradeHubID",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Trade Hub IDs",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "System",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "System",
            "dataSourceAddress": { tableName: "/Application/SqlStatementDetail/SettlementGetSystem", dbColumnName: "ID", displayColumnName: "Name", dbParameters: { Parameters: [] }, defaultValue: [{ Value: "", Name: "All" }] },
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "Account",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Account",
            "dataSourceAddress": { tableName: "/Application/SqlStatementDetail/GetAccountsByPM", dbColumnName: "AccountID", displayColumnName: "Account", dbParameters: { Parameters: [{ Name: "@sPMLogin", Value: "" }] }, defaultValue: [{ Value: "", Name: "All" }] },
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "CustodianAccount",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Custodian Account",
            "dataSourceAddress": { tableName: "/Application/SqlStatementDetail/SettlementGetCustodianAccount", dbColumnName: "CustodianAccount", displayColumnName: "CustodianAccount", dbParameters: { Parameters: [] }, defaultValue: [{ Value: "", Name: "All" }] },
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "RIC",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "RIC",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "CUSIP",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "CUSIP",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "ISIN",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "ISIN",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "SEDOL",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "SEDOL",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "Broker",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Broker",
            "dataSourceAddress": { tableName: "/Application/SqlStatementDetail/SettlementGetBroker", dbColumnName: "io", displayColumnName: "io", dbParameters: { Parameters: [] }, defaultValue: [{ Value: "", Name: "All" }] },
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "NumberOfShares",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Number Of Shares",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "InvestOneMemo",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "InvestOne Memo #",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "StartDate",
            "htmlControlType": "date",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "Start Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "EndDate",
            "htmlControlType": "date",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "End Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "ProductGroup",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Product Group",
            "dataSourceAddress": { tableName: "/Application/SqlStatementDetail/SettlementGetProductGroups", dbColumnName: "ID", displayColumnName: "Name", dbParameters: { Parameters: [] }, defaultValue: [{ Value: "", Name: "All" }] },
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "ExcludeCancellations",
            "htmlControlType": "checkbox",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Exclude Cancellations",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }
    ],
    RulesConfig: [
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["inputmask"],
            "ruleAssociates": ["TradeHubID"],
            "ruleValue": "^([0-9]*,?)*$",
            "apiObject": undefined
        }, {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["inputmask"],
            "ruleAssociates": ["RIC", "CUSIP", "ISIN", "SEDOL"],
            "ruleValue": "[\\w\\s]*",
            "apiObject": undefined
        }, {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["inputmask"],
            "ruleAssociates": ["NumberOfShares"],
            "ruleValue": "^-?\\d*\\.?\\d*$",
            "apiObject": undefined
        }, {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["inputmask"],
            "ruleAssociates": ["InvestOneMemo"],
            "ruleValue": "^-?\\d*$",
            "apiObject": undefined
        }, {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["required"],
            "ruleAssociates": ["StartDate", "EndDate"],
            "apiObject": undefined
        }, {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["date"],
            "ruleAssociates": ["StartDate", "EndDate"],
            "apiObject": undefined
        }]
};
var DisplayGridConfig = {
    ChildType: "",
    PrimaryKeyColumn: "CoreID",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsScrollableGrid: true,
    UseBusinessValidation: false,
    ColumnConfiguration: [{
            "dbColumnName": "CoreID",
            "htmlControlType": "number",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Tran. Id",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "System",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "System",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "TM",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Tran. Mode",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "Security",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Security",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "Cusip",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Cusip",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "BloomUniqueID",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Bloomberg Id",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "SecurityName",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Security Name",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "SecurityDesc",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Description",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "Port",
            "htmlControlType": "number",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Port #",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "Side",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Side",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "Broker",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Broker",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "TradeDate",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Trade Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "SettleDate",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Settle Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "SettleAmount",
            "htmlControlType": "number",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Settle Amount",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "Price",
            "htmlControlType": "number",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Price",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "Shares",
            "htmlControlType": "number",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Shares",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "AccrInterest",
            "htmlControlType": "number",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Accrued Interest",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "IndexRatio",
            "htmlControlType": "number",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Index Ratio",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "CustodianAccount",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Custodian Account",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "Trade",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Trader",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "TransDate",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Trans. Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "IOExportDate",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "IOExportDate",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "IOTranID",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "MemoNumber",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "IOMessages",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "IOMessages",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }]
};
exports.TradeReportByPMControlConfig = {
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
            ]
        }
    ]
};
//# sourceMappingURL=tradeReportByPM.config.js.map