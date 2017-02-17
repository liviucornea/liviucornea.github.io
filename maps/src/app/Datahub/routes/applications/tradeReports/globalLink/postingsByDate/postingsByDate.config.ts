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
            "dbColumnName": "ReportDate",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "Report Date",
            "dataSourceAddress": {tableName:"/Application/SqlStatementDetail/GlobalLinkTradeReportDates", dbColumnName: "ImportDate", displayColumnName: "ImportDate", dbParameters:{Parameters:[]}},
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


let DisplayGridConfig= {
    ChildType: "",
    PrimaryKeyColumn: "ID",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsScrollableGrid: true,
    UseBusinessValidation: false,
    ColumnConfiguration:[{
        "dbColumnName": "AccountNumber",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "IO Acct",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
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
        "dbColumnName": "ExportDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Export Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "ExternalLayerID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Xtrl Layer ID",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "ID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Core ID",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TranMode",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Tran Mode",
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
        "dbColumnName": "ExchangeRate",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType" :false,
        "displayName": "Exchange Rate",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
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
        "dbColumnName": "BuyQuantity",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Buy Quantity",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "SellCurrency",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Sell Currency",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "SellQuantity",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Sell Quantity",
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
        "dbColumnName": "IOTranID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "IO TranID",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOExportDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "IO Export Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "IOStatus",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "IO Status",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "IOMessages",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "IO Messages",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TDAMUSAIOTranID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "TDAM USA IO TranID",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TDAMUSAIOExportDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "TDAM USA IO Export Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "TDAMUSAIOStatus",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "TDAM USA IO Status",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TDAMUSAIOMessages",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "TDAM USA IO Messages",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    }]
};


export var  PostingsByDateControlConfig = {
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

