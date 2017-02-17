"use strict";
exports.CustomizeFieldsListConfig = {
    CustomButtons: [
        {
            name: 'Save',
            value: 'Save',
            disabled: false,
            visible: true,
            formValidate: false
        }
    ],
    ListItemsConfiguration: {
        "inputListDataFields": { dbColumnName: "UniqueID", displayColumnName: "DisplayName" },
        "inputListTitle": "Available Fields",
        "assignedListDataFields": { dbColumnName: "UniqueID", displayColumnName: "DisplayName" },
        "assignedListTitle": "Selected Fields"
    }
};
var FormBuilderConfig = {
    CustomButtons: [
        {
            name: 'SummaryReport',
            value: 'Summary Report',
            disabled: false,
            visible: true,
            formValidate: true
        }, {
            name: 'DetailsReport',
            value: 'Details Report',
            disabled: false,
            visible: true,
            formValidate: true
        }, {
            name: 'CustomizeFields',
            value: 'Customize Fields',
            disabled: false,
            visible: true,
            formValidate: true
        }, {
            name: 'CustomReport',
            value: 'Custom Report',
            disabled: false,
            visible: true,
            formValidate: true
        }, {
            name: 'ResetParameters',
            value: 'Reset Parameters',
            disabled: false,
            visible: true,
            formValidate: true
        }, {
            name: 'Excel',
            value: 'Excel',
            disabled: true,
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
            "displayName": "Trade Hub IDs",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "System",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "System",
            "dataSourceAddress": { tableName: "/Application/SqlStatementDetail/SettlementGetSystem", dbColumnName: "ID", displayColumnName: "Name", dbParameters: { Parameters: [] }, defaultValue: [{ Value: "", Name: "All" }] },
            "dataSource": undefined
        }, {
            "dbColumnName": "Account",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Account",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "CustodianAccount",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Custodian Account",
            "dataSourceAddress": { tableName: "/Application/SqlStatementDetail/SettlementGetCustodianAccount", dbColumnName: "CustodianAccount", displayColumnName: "CustodianAccount", dbParameters: { Parameters: [] }, defaultValue: [{ Value: "", Name: "All" }] },
            "dataSource": undefined
        }, {
            "dbColumnName": "RIC",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "RIC",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "CUSIP",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "CUSIP",
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
            "dbColumnName": "SEDOL",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "SEDOL",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Broker",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Broker",
            "dataSourceAddress": { tableName: "/Application/SqlStatementDetail/SettlementGetBroker", dbColumnName: "io", displayColumnName: "io", dbParameters: { Parameters: [] }, defaultValue: [{ Value: "", Name: "All" }] },
            "dataSource": undefined
        }, {
            "dbColumnName": "NumberOfShares",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Number Of Shares",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "InvestOneMemo",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "InvestOne Memo #",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "StartDate",
            "htmlControlType": "date",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "Start Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "EndDate",
            "htmlControlType": "date",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "End Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "ProductGroup",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Product Group",
            "dataSourceAddress": { tableName: "/Application/SqlStatementDetail/SettlementGetProductGroups", dbColumnName: "ID", displayColumnName: "Name", dbParameters: { Parameters: [] }, defaultValue: [{ Value: "", Name: "All" }] },
            "dataSource": undefined
        }, {
            "dbColumnName": "ExcludeCancellations",
            "htmlControlType": "checkbox",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Exclude Cancellations",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }
    ],
    RulesConfig: [
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["inputmask"],
            "ruleAssociates": ["TradeHubID"],
            "ruleValue": "^([0-9]*,?)*$",
            "apiObject": "TradesRules"
        }, {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["inputmask"],
            "ruleAssociates": ["Account", "RIC", "CUSIP", "ISIN", "SEDOL"],
            "ruleValue": "[\\w\\s]*",
            "apiObject": "TradesRules"
        }, {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["inputmask"],
            "ruleAssociates": ["NumberOfShares"],
            "ruleValue": "^-?\\d*\\.?\\d*$",
            "apiObject": "TradesRules"
        }, {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["inputmask"],
            "ruleAssociates": ["InvestOneMemo"],
            "ruleValue": "^-?\\d*$",
            "apiObject": "TradesRules"
        }, {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["required"],
            "ruleAssociates": ["StartDate", "EndDate"],
            "apiObject": "TradesRules"
        }, {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["date"],
            "ruleAssociates": ["StartDate", "EndDate"],
            "apiObject": "TradesRules"
        }]
};
exports.ReportStatusChildGridConfig = {
    Name: "ReportStatusDisplayGridConfig",
    ChildType: "",
    ForeignKeyColumn: "CoreID",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    ServerPagination: false,
    IsScrollableGrid: true,
    "ColumnConfiguration": [
        {
            "dbColumnName": "Description",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Source Description",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "sourceId",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Source Tran ID",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "ExportDate",
            "htmlControlType": "date",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Export Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "columnFormat": { format: "date", pattern: "yMMMdjms" }
        }, {
            "dbColumnName": "Status",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Status",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Messages",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Messages",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }]
};
exports.ViewIssuesChildGridConfig = {
    Name: "ViewIssuesDisplayGridConfig",
    ChildType: "",
    PrimaryKeyColumn: "ID",
    ForeignKeyColumn: "CoreID",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    ServerPagination: false,
    IsScrollableGrid: true,
    UseBusinessValidation: true,
    CustomButtons: [
        {
            name: 'AddIssue',
            value: 'Add Issue',
            disabled: false,
            visible: true,
            formValidate: true
        }
    ],
    CustomRowButtons: [
        {
            name: 'CloseIssue',
            value: 'Close Issue',
            disabled: false,
            visible: true,
            formValidate: true
        }
    ],
    "ColumnConfiguration": [
        {
            "dbColumnName": "ID",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Issue ID",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Description",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Settlement Issue",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "CycleNine",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Cycle 9",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Note",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Settlement Issue Notes",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "IdentificationDate",
            "htmlControlType": "date",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Identification Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "columnFormat": { format: "date", pattern: "yMMMdjms" }
        }, {
            "dbColumnName": "IdentificationUser",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Identified by",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "ClosedDate",
            "htmlControlType": "date",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Closing Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "columnFormat": { format: "date", pattern: "yMMMdjms" }
        }, {
            "dbColumnName": "ClosedUser",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Closed by",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Closed",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Closed",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }]
};
var TradesSummaryDisplayGridConfig = {
    ChildType: "",
    ChildGridType: "displayGrid",
    PrimaryKeyColumn: "CoreID",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsScrollableGrid: true,
    UseBusinessValidation: true,
    ServerPagination: false,
    ColumnConfiguration: [{
            "dbColumnName": "CoreID",
            "htmlControlType": "number",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Tran. Id",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "isToggleable": true,
            "ChildControlConfig": exports.ReportStatusChildGridConfig
        }, {
            "dbColumnName": "Issues",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Issues",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "isToggleable": true,
            "ChildControlConfig": exports.ViewIssuesChildGridConfig
        }, {
            "dbColumnName": "System",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "System",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "TM",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Tran. Mode",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Security",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Security",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Cusip",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Cusip",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Portfolio",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Portfolio",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Side",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Side",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Broker",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Broker",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "TradeDate",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Trade Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "SettleDate",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Settle Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "SettleAmount",
            "htmlControlType": "number",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Settle Amount",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Price",
            "htmlControlType": "number",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Price",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Shares",
            "htmlControlType": "number",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Shares",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "CustodianAccount",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Custodian Account",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "AddedBy",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Added By",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Trade",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Trader",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }]
};
var TradesDetailsDisplayGridConfig = {
    ChildType: "",
    ChildGridType: "displayGrid",
    PrimaryKeyColumn: "CoreID",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsScrollableGrid: true,
    UseBusinessValidation: true,
    ServerPagination: false,
    ColumnConfiguration: [{
            "dbColumnName": "CoreID",
            "htmlControlType": "number",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Tran. Id",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "isToggleable": true,
            "ChildControlConfig": exports.ReportStatusChildGridConfig
        }, {
            "dbColumnName": "Issues",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Issues",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "isToggleable": true,
            "ChildControlConfig": exports.ViewIssuesChildGridConfig
        }, {
            "dbColumnName": "System",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "System",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "TM",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Tran. Mode",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "SI",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Sec. Id. Type",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Security",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Security",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Cusip",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Cusip",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Sedol",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Sedol",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Isin",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Isin",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "BloomUniqueID",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Bloomberg Id",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Portfolio",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Portfolio",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Port",
            "htmlControlType": "number",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Port #",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Side",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Side",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Broker",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Broker",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "TradeDate",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Trade Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "SettleDate",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Settle Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "SettleAmount",
            "htmlControlType": "number",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Settle Amount",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Principal",
            "htmlControlType": "number",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Principal",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Price",
            "htmlControlType": "number",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Price",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Shares",
            "htmlControlType": "number",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Shares",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Comission",
            "htmlControlType": "number",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Comission",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Fees",
            "htmlControlType": "number",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Fees",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Taxes",
            "htmlControlType": "number",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Taxes",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Other",
            "htmlControlType": "number",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Other Amount",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "AccrInterest",
            "htmlControlType": "number",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Accrued Interest",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "IndexRatio",
            "htmlControlType": "number",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Index Ratio",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "CustodianAccount",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Custodian Account",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "CustodianBulkAccount",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Custodian Bulk Account",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "TransDate",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Trans. Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "SecurityName",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Security Desc.",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "TradeCurrency",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Trade Currency",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "IOExportDate",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "IOExportDate",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "IOTranID",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "MemoNumber",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "IOMessages",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "IOMessages",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "SecurityDesc",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Description",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "AddedBy",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Added By",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }, {
            "dbColumnName": "Trade",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Trader",
            "dataSourceAddress": undefined,
            "dataSource": undefined
        }]
};
exports.TradesControlConfig = {
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
                }, {
                    ComponentTitle: "Summary",
                    ShowDefault: false,
                    ComponentName: "TradesSummaryDisplayGrid",
                    PageType: "displaygrid",
                    gridSettings: TradesSummaryDisplayGridConfig,
                    PageOperationType: 'view'
                }, {
                    ComponentTitle: "Details",
                    ShowDefault: false,
                    ComponentName: "TradesDetailsDisplayGrid",
                    PageType: "displaygrid",
                    gridSettings: TradesDetailsDisplayGridConfig,
                    PageOperationType: 'view'
                }
            ]
        }
    ]
};
//# sourceMappingURL=trades.config.js.map