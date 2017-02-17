"use strict";
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
            "dbColumnName": "ReportDate",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "Report Date",
            "dataSourceAddress": { tableName: "/Application/SqlStatementDetail/BloombergTradesPostDates", dbColumnName: "AddDate", displayColumnName: "AddDate", dbParameters: { Parameters: [] } },
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "ProductGroup",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "Product Group",
            "dataSourceAddress": { tableName: "/Application/SqlStatementDetail/BloombergProductGroups", dbColumnName: "Name", displayColumnName: "Name", dbParameters: { Parameters: [] }, defaultValue: [{ Value: "", Name: "All" }] },
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "PortfolioType",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "Portfolio Type",
            "dataSourceAddress": { dbColumnName: "Value", displayColumnName: "Description" },
            "dataSource": [{ Value: "", Description: "All" }, { Value: "1", Description: "IO Active" }],
            "regex": undefined
        }, {
            "dbColumnName": "Portfolio",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "Portfolio",
            "dataSourceAddress": { tableName: "/Application/SqlStatementDetail/BloombergPortfolios", dbColumnName: "Bloom", displayColumnName: "Bloom", dbParameters: { Parameters: [] }, defaultValue: [{ Value: "", Name: "All" }] },
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "CustodianAccount",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "Custodian Account",
            "dataSourceAddress": { tableName: "/Application/SqlStatementDetail/BloombergCustodianAccounts", dbColumnName: "CustodianAccount", displayColumnName: "CustodianAccount", dbParameters: { Parameters: [] }, defaultValue: [{ Value: "", Name: "All" }] },
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "CustodianBulkAccount",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "Custodian Bulk Account",
            "dataSourceAddress": { tableName: "/Application/SqlStatementDetail/BloombergCustodianBulkAccounts", dbColumnName: "CustodianBulkAccount", displayColumnName: "CustodianBulkAccount", dbParameters: { Parameters: [] }, defaultValue: [{ Value: "", Name: "All" }] },
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "Status",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "Status",
            "dataSourceAddress": { dbColumnName: "Value", displayColumnName: "Description" },
            "dataSource": [{ Value: "0", Description: "All" }, { Value: "1", Description: "Accepted" }, { Value: "2", Description: "Rejected" }],
            "regex": undefined
        }
    ],
    RulesConfig: [
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["required"],
            "ruleAssociates": ["ReportDate"],
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
var DetailsDisplayGridConfig = {
    ChildType: "",
    PrimaryKeyColumn: "ID",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsScrollableGrid: true,
    UseBusinessValidation: false,
    ColumnConfiguration: [{
            "dbColumnName": "ID",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Core ID",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "Status",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Status",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "ProductGroup",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Product Group",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "TraderName",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Portfolio",
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
            "dbColumnName": "CustodianBulkAccount",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Custodian Bulk Account",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "LongNote",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Long Note",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "TransactionNumber",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Transaction Number",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "SecurityId",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Security Id",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "BbId",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Bloomberg Id",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "BbUniqueId",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Bloomberg Unique Id",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "Currency",
            "htmlControlType": "number",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Currency",
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
            "dbColumnName": "Yield",
            "htmlControlType": "number",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Yield",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "DiscountRate",
            "htmlControlType": "number",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Discount Rate",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "TradeAmount",
            "htmlControlType": "number",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Trade Amount",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "Account",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Account",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "SystemTradeTime",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "System Trade Time",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "ExportDate",
            "htmlControlType": "date",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Export Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
            "columnFormat": { format: "date", pattern: "yMMMd" }
        }]
};
var SummaryDisplayGridConfig = {
    ChildType: "",
    PrimaryKeyColumn: "ID",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsScrollableGrid: true,
    UseBusinessValidation: false,
    ColumnConfiguration: [{
            "dbColumnName": "ID",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Core ID",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "Status",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Status",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "ProductGroup",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Product Group",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "TraderName",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Portfolio",
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
            "dbColumnName": "CustodianBulkAccount",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Custodian Bulk Account",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "TransactionNumber",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Transaction Number",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "IOAccountID",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "IO Account ID",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "IOSecurityID",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "IO Security ID",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "IOBrokerID",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "IO Broker ID",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "TradeDate",
            "htmlControlType": "date",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Trade Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
            "columnFormat": { format: "date", pattern: "yMMMd" }
        }, {
            "dbColumnName": "SettleDate",
            "htmlControlType": "date",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Settle Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
            "columnFormat": { format: "date", pattern: "yMMMd" }
        }, {
            "dbColumnName": "IOTranID",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "IO TranID",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "IOExportDate",
            "htmlControlType": "date",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "IO Export Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
            "columnFormat": { format: "date", pattern: "yMMMd" }
        }, {
            "dbColumnName": "IOStatus",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "IO Status",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "IOMessages",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "IO Messages",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }]
};
exports.PostingsByDateControlConfig = {
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
                    ComponentTitle: "Details",
                    ShowDefault: false,
                    ComponentName: "DetailsDisplayGrid",
                    PageType: "displaygrid",
                    gridSettings: DetailsDisplayGridConfig,
                    PageOperationType: 'view'
                },
                {
                    ComponentTitle: "Summary",
                    ShowDefault: false,
                    ComponentName: "SummaryDisplayGrid",
                    PageType: "displaygrid",
                    gridSettings: SummaryDisplayGridConfig,
                    PageOperationType: 'view'
                }
            ],
        }
    ]
};
//# sourceMappingURL=postingsByDate.config.js.map