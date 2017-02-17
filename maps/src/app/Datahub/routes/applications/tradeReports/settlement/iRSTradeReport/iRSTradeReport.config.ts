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
    PrimaryKeyColumn: "ID",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsScrollableGrid: true,
    UseBusinessValidation: false,
    ColumnConfiguration:[{
        "dbColumnName": "IO Account Number",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "IO Account Number",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Account Name",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Account Name",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Security Number",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Security Number",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Effective Date",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Effective Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "Tran. ID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Tran. ID",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Transaction Code",
        "htmlControlType": "numeric",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Transaction Code",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Description",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Description",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "SWAP Type",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "SWAP Type",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Trade Date",
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
        "dbColumnName": "Contractual Settlement Date",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType" :false,
        "displayName": "Contractual Settlement Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "Shares or Par Value",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType" :false,
        "displayName": "Shares or Par Value",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Custodian Account",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType" :false,
        "displayName": "Custodian Account",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Issue Currency",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Issue Currency",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Accrual Start Date",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Accrual Start Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "Expiration Date",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Expiration Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "Trading/Clearing Broker",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trading/Clearing Broker",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Trader Name",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trader Name",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Receivable Leg: First Payment Date",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Receivable Leg: First Payment Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "Receivable Leg: Payment Frequency",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Receivable Leg: Payment Frequency",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Receivable Leg: Interest Rate",
        "htmlControlType": "number",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Receivable Leg: Interest Rate",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Receivable Leg: Coupon Currency",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Receivable Leg: Coupon Currency",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Receivable Leg: Benchmark Security ID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Receivable Leg: Benchmark Security ID",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Receivable Leg: Rate Change Frequency",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Receivable Leg: Rate Change Frequency",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Receivable Leg: Next Rate Change Date",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Receivable Leg: Next Rate Change Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "Receivable Leg: Annual Rate Type",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Receivable Leg: Annual Rate Type",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Payable Leg: First Payment Date",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Payable Leg: First Payment Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "Payable Leg: Payment Frequency",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Payable Leg: Payment Frequency",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Payable Leg: Interest Rate",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Payable Leg: Interest Rate",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Payable Leg: Coupon Currency",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Payable Leg: Coupon Currency",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Payable Leg: Benchmark Security ID",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Payable Leg: Benchmark Security ID",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Payable Leg: Rate Change Frequency",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Payable Leg: Rate Change Frequency",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    },{
        "dbColumnName": "Payable Leg: Next Rate Change Date",
        "htmlControlType": "date",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Payable Leg: Next Rate Change Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "Payable Leg: Annual Rate Type",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Payable Leg: Annual Rate Type",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined
    }]
};


export var  IRSTradeReportControlConfig = {
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

