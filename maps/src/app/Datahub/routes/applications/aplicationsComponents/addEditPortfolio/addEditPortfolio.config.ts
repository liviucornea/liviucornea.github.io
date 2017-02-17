export var AddEditPortfolioFormBuilderConfig = {
    CustomButtons: [
        {
            name:'Reset',
            value:'Reset',
            disabled: false,
            visible: true,
            formValidate: false
        },{
            name:'Add',
            value:'Add',
            disabled: false,
            visible: false,
            formValidate: true
        },{
            name:'Update',
            value:'Update',
            disabled: false,
            visible: false,
            formValidate: true
        },{
            name:'OpenChangeForm',
            value:'Open Change Form',
            disabled: false,
            visible: false,
            formValidate: true
        }
    ],
    ColumnConfiguration: [
        {
            "dbColumnName": "Id",
            "htmlControlType": "text",
            "isVisible": false,
            "isRequired":false,
            "isComplexType": false,
            "displayName": "Id",
            "dataSourceAddress":undefined,
            "dataSource":undefined,
        },{
            "dbColumnName": "PortfolioNumber",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "PortfolioNumber",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        },{
            "dbColumnName": "PortfolioName",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "PortfolioName",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        },{
            "dbColumnName": "PortfolioManager",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "IA Code",
            "dataSourceAddress": {dbColumnName: "id", displayColumnName: "name", defaultValue: [{Value:"", Name:""}]},
            "dataSource": undefined,
            "regex": undefined,
        },{
            "dbColumnName": "ProjectedAUM",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "ProjectedAUM",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        },{
            "dbColumnName": "InceptionDate",
            "htmlControlType": "date",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "InceptionDate",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
            "columnFormat": {format:"date",pattern:"yyyy-MM-dd"}
        },{
            "dbColumnName": "Notes",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Notes",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }
    ],
    RulesConfig: [
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["required"],
            "ruleAssociates": ["PortfolioNumber", "PortfolioName", "PortfolioManager", "ProjectedAUM", "InceptionDate"],
            "apiObject": undefined
        },{
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["inputmask"],
            "ruleAssociates":["ProjectedAUM"],
            "ruleValue":"^(0[.]\\d+)$|^([1-9]+\\d*([.]\\d+)?)$|^0$",
            "apiObject": undefined
        },{
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["date"],
            "ruleAssociates":["InceptionDate"],
            "apiObject": undefined
        }
    ]
};
