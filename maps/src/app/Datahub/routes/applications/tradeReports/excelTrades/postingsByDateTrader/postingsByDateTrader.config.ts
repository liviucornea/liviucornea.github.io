let FormBuilderConfig = {
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
            "dbColumnName": "TradeType",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "Trade Type",
            "dataSourceAddress": {dbColumnName: "Value", displayColumnName: "Description"},
            "dataSource": [{Value:"B", Description:"Bond"}, {Value:"E", Description:"Equities"}, {Value:"F", Description:"Futures"}, {Value:"FX", Description:"FX"}, {Value:"MF", Description:"Mutual Fund"}, {Value:"CP", Description:"CPR Trades"}],
            "regex": undefined
        },{
            "dbColumnName": "ReportDate",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "Report Date",
            "dataSourceAddress": {tableName:"/Application/SqlStatementDetail/ExcelTradesPostDates", dbColumnName: "PostDate", displayColumnName: "PostDate", dbParameters:{Parameters:[{Name:"@TraderID", Value:""}]}},
            "dataSource": undefined,
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
            "ruleAssociates":["ReportDate"],
            "apiObject": undefined
        }]
};


export var DetailsDisplayGridConfig_B = {
    ChildType: "",
    PrimaryKeyColumn: "ID",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsScrollableGrid: true,
    UseBusinessValidation: false,
    ColumnConfiguration:[{
        "dbColumnName": "Status",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Status",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOStatus",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Status",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOTranID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Memo No",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "SecurityName",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Security",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOAcct",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TransType",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trans Type",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Broker",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Broker",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TradeDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trade Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "SettleDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Settle Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "Price",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Price",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Shares",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "# of Shares",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Principal",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Principal",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Interest",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Interest",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "SettleAmount",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType" :false,
        "displayName": "Settle Amount",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Messages",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Messages",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOMessages",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "IO Messages",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "ID",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "ID",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    }]
};


export var SummaryDisplayGridConfig_B = {
    ChildType: "",
    PrimaryKeyColumn: "ID",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsScrollableGrid: true,
    UseBusinessValidation: false,
    ColumnConfiguration:[{
        "dbColumnName": "Status",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Status",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOStatus",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Status",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TranMode",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trade Mode",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TransType",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trans Type",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "CUSIP",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Security No",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "SEDOL",
        "htmlControlType": "date",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "SEDOL",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "Broker",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Broker",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TradeDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trade Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "SettleDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Settle Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "IOAcct",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOTranID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Memo No",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "ID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Core Id",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    }]
};


export var DetailsDisplayGridConfig_E = {
    ChildType: "",
    PrimaryKeyColumn: "ID",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsScrollableGrid: true,
    UseBusinessValidation: false,
    ColumnConfiguration:[{
        "dbColumnName": "Status",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Status",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOStatus",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Status",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOTranID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Memo No",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "SecurityID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Security",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOAcct",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TransType",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trans Type",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Broker",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Broker",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TradeDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trade Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "SettleDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Settle Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "SettleCurrency",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Settle Currency",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "SettleAmount",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType" :false,
        "displayName": "Settle Amount",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Price",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Price",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Shares",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "# of Shares",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Principal",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Principal",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Commission",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType" :false,
        "displayName": "Commission",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Messages",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Messages",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOMessages",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "IO Messages",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "ID",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "ID",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    }]
};


export var SummaryDisplayGridConfig_E = {
    ChildType: "",
    PrimaryKeyColumn: "ID",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsScrollableGrid: true,
    UseBusinessValidation: false,
    ColumnConfiguration:[{
        "dbColumnName": "Status",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Status",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOStatus",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Status",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TranMode",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trade Mode",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TransType",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trans Type",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "SecurityID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Security",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Broker",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Broker",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TradeDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trade Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "SettleDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Settle Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "IOAcct",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOTranID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Memo No",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "ID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Core Id",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    }]
};


export var DetailsDisplayGridConfig_F = {
    ChildType: "",
    PrimaryKeyColumn: "ID",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsScrollableGrid: true,
    UseBusinessValidation: false,
    ColumnConfiguration:[{
        "dbColumnName": "Status",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Status",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOStatus",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Status",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOTranID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Memo No",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "SecurityID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Security",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOAcct",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TransType",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trans Type",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Broker",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Broker",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "ClearBroker",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Clr. Broker",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TradeDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trade Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "SettleDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Settle Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "Price",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Price",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Shares",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "# of Shares",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Messages",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Messages",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOMessages",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "IO Messages",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "ID",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "ID",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    }]
};


export var SummaryDisplayGridConfig_F = {
    ChildType: "",
    PrimaryKeyColumn: "ID",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsScrollableGrid: true,
    UseBusinessValidation: false,
    ColumnConfiguration:[{
        "dbColumnName": "Status",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Status",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOStatus",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Status",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TranMode",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trade Mode",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TransType",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trans Type",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "SecurityID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Security",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Broker",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Broker",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TradeDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trade Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "SettleDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Settle Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "IOAcct",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOTranID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Memo No",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "ID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Core Id",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    }]
};


export var DetailsDisplayGridConfig_FX = {
    ChildType: "",
    PrimaryKeyColumn: "ID",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsScrollableGrid: true,
    UseBusinessValidation: false,
    ColumnConfiguration:[{
        "dbColumnName": "Status",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Status",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOStatus",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Status",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOTranID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Memo No",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "SecurityID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Security",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOAcct",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TransType",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trans Type",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Broker",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Broker",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TradeDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trade Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "SettleDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Settle Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "BuyCurrency",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Buy Currency",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "BuyShares",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Buy Qty",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "SettleCurrency",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Sell Currency",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Principal",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Sell Qty",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Messages",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Messages",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOMessages",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "IO Messages",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "ID",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "ID",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    }]
};


export var SummaryDisplayGridConfig_FX = {
    ChildType: "",
    PrimaryKeyColumn: "ID",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsScrollableGrid: true,
    UseBusinessValidation: false,
    ColumnConfiguration:[{
        "dbColumnName": "Status",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Status",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOStatus",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Status",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TranMode",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trade Mode",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TransType",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trans Type",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "BuyCurrency",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Security",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Broker",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Broker",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TradeDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trade Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "SettleDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Settle Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "IOAcct",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOTranID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Memo No",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "ID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Core Id",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    }]
};


export var DetailsDisplayGridConfig_MF = {
    ChildType: "",
    PrimaryKeyColumn: "ID",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsScrollableGrid: true,
    UseBusinessValidation: false,
    ColumnConfiguration:[{
        "dbColumnName": "Status",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Status",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOStatus",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Status",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOTranID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Memo No",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "SecurityID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Security",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOAcct",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TransType",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trans Type",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Broker",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Broker",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TradeDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trade Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "SettleDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Settle Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "SettleCurrency",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Settle Currency",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "SettleAmount",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Settle Amount",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Price",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Price",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Shares",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "# of Shares",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Principal",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Principal",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Commission",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Commission",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Messages",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Messages",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOMessages",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "IO Messages",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "ID",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "ID",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    }]
};


export var SummaryDisplayGridConfig_MF = {
    ChildType: "",
    PrimaryKeyColumn: "ID",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsScrollableGrid: true,
    UseBusinessValidation: false,
    ColumnConfiguration:[{
        "dbColumnName": "Status",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Status",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOStatus",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Status",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TranMode",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trade Mode",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TransType",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trans Type",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "SecurityID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Security",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Broker",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Broker",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TradeDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trade Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "SettleDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Settle Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "IOAcct",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOTranID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Memo No",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "ID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Core Id",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    }]
};


export var  PostingsByDateTraderControlConfig = {
    TabsList: [
        {
            TabKey: "OneTab",
            TabName: "OneTab",
            TabControls:[
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
                    gridSettings: DetailsDisplayGridConfig_B,
                    PageOperationType: 'view'
                },
                {
                    ComponentTitle: "Summary",
                    ShowDefault: false,
                    ComponentName: "SummaryDisplayGrid",
                    PageType: "displaygrid",
                    gridSettings: SummaryDisplayGridConfig_B,
                    PageOperationType: 'view'
                }
            ],
        }
    ]
};

