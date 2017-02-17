let DisplayGridConfig= {
    ChildType:"",
    PrimaryKeyColumn:"SecurityID",
    ForeignKeyColumn:"",
    ShallHideDeleteButton:true,
    ShallHideAddButton:true,
    RowSelectionMode: "None",
    IsChildPage:false,
    IsScrollableGrid:true,
    ShowFilterRow: false,
    ShowFooterRow: true,
    UseBusinessValidation: false,
    ColumnConfiguration:[{
        "dbColumnName":"Name",
        "htmlControlType":"text",
        "isVisible":true,
        "isRequired":false,
        "isComplexType":false,
        "displayName":"Name",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
    },{
        "dbColumnName":"CUSIP",
        "htmlControlType":"text",
        "isVisible":true,
        "isRequired":false,
        "isComplexType":false,
        "displayName":"CUSIP",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
    },{
        "dbColumnName":"SEDOL",
        "htmlControlType":"text",
        "isVisible":true,
        "isRequired":false,
        "isComplexType":false,
        "displayName":"SEDOL",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
    },{
        "dbColumnName":"ISIN",
        "htmlControlType":"text",
        "isVisible":true,
        "isRequired":false,
        "isComplexType":false,
        "displayName":"ISIN",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
    },{
        "dbColumnName":"TICKER",
        "htmlControlType":"text",
        "isVisible":true,
        "isRequired":false,
        "isComplexType":false,
        "displayName":"TICKER",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
    },{
        "dbColumnName":"Duration",
        "htmlControlType":"text",
        "isVisible":true,
        "isRequired":false,
        "isComplexType":false,
        "displayName":"Duration",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
    },{
        "dbColumnName":"AverageRating",
        "htmlControlType":"text",
        "isVisible":true,
        "isRequired":false,
        "isComplexType":false,
        "displayName":"Average Rating",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
    },{
        "dbColumnName":"Weight",
        "htmlControlType":"number",
        "isVisible":true,
        "isRequired":false,
        "isComplexType":false,
        "displayName":"Weight",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "isTotalVisible":true,
        "columnFormat": {format:"number",pattern:"1.1-3"},
    },{
        "dbColumnName":"Quoted_Market_Value",
        "htmlControlType":"number",
        "isVisible":true,
        "isRequired":false,
        "isComplexType":false,
        "displayName":"Quoted Market Value",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "isTotalVisible":true,
        "columnFormat": {format:"number",pattern:"1.1-2"},
    },{
        "dbColumnName":"Date",
        "htmlControlType":"Date",
        "isVisible":true,
        "isRequired":true,
        "isComplexType":false,
        "displayName":"Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date",pattern:"yMMMd"},
    }]
};

let FormBuilderConfig = {
    CustomButtons: [
        {
            name:'Preview',
            value:'Preview',
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
            "isRequired": false,
            "displayName": "Report Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        },{
            "dbColumnName": "TsxSubIndex",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "TSX Sub Index",
            "dataSourceAddress": {dbColumnName: "value", displayColumnName: "name", defaultValue: [{Value:"", Name:""}]},
            "dataSource": undefined,
            "regex": undefined,
        }
    ],
    RulesConfig: [
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["required"],
            "ruleAssociates": ["ReportDate", "TsxSubIndex"],
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


export var  TsxControlConfig = {
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

