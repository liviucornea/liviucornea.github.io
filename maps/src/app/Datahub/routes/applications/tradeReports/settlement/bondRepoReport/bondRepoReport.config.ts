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
            "dbColumnName": "StartDate",
            "htmlControlType": "date",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Start Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        },{
            "dbColumnName": "EndDate",
            "htmlControlType": "date",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "End Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        },{
            "dbColumnName": "Account",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Account",
            "dataSourceAddress": {tableName:"/Application/SqlStatementDetail/BondReport_GetAccount", dbColumnName: "AccountID", displayColumnName: "IO", dbParameters:{Parameters:[]}, defaultValue: [{Value:"", Name:"All"}]},
            "dataSource": undefined,
            "regex": undefined
        },{
            "dbColumnName": "ShowCancellations",
            "htmlControlType": "checkbox",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Cancellation",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }
    ],
    RulesConfig: [
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["required"],
            "ruleAssociates": ["StartDate", "EndDate"],
            "apiObject": undefined
        },
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["date"],
            "ruleAssociates":["StartDate", "EndDate"],
            "apiObject": undefined
        }]
};


let DisplayGridConfig= {
    ChildType: "",
    PrimaryKeyColumn: "",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsScrollableGrid: true,
    UseBusinessValidation: false,
    ColumnConfiguration:[{
        "dbColumnName": "Description",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Tran. Mode",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "InvestOneSecCode",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Security",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "cusip",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "CUSIP",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "isin",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "ISIN",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "PortfolioName",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "AccountCode",
        "htmlControlType": "numeric",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Port #",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "side",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Side (Tran Code)",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "BrokerName",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Broker",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "BrokerCode",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType" :false,
        "displayName": "Broker Code",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "tradedate",
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
        "dbColumnName": "settledate",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType" :false,
        "displayName": "Settle Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "Principal",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType" :false,
        "displayName": "Settle Amount/Par",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "price",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType" :false,
        "displayName": "Price",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Units",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Shares",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "accrInterest",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Accrued Interest",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "RepoRateLN4",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Repo Rate",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "CustodianAccount",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Custodian Account",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "importdate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Tran. Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMdjms"}
    },{
        "dbColumnName": "DescriptionLong",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Security Description Long",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "CouponRate",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Coupon Rate",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "MaturityDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Maturity Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "IndexRatio",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Index Ratio",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "TradeCurrency",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trade Currency",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Trader",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trader",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "PriceSource",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Price Source",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    }]
};


export var  BondRepoReportControlConfig = {
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
            ]
        }
    ]
};

