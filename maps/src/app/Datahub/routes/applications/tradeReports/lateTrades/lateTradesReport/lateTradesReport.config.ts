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
            "dbColumnName": "FromDate",
            "htmlControlType": "date",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "From",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        },
        {
            "dbColumnName": "ToDate",
            "htmlControlType": "date",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "To",
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
            "ruleAssociates": ["FromDate", "ToDate"],
            "apiObject": undefined
        },
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["date"],
            "ruleAssociates":  ["FromDate", "ToDate"],
            "apiObject": undefined
        }]
};


let DisplayGridConfig= {
    ChildType: "",
    PrimaryKeyColumn: "Account_IO",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsScrollableGrid: true,
    UseBusinessValidation: false,
    ColumnConfiguration:[{
        "dbColumnName": "Account_IO",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Account IO",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Account_Name",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Account Name",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Security_IO",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Security IO",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Security_Name",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Security Name",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Trade_Type",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trade Type",
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
        "dbColumnName": "Units",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Units",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Postdate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Post Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "EffectiveDate",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Effective Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    }]
};


export var  LateTradesReportControlConfig = {
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

