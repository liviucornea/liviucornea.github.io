let AddPortfolioFormBuilderConfig = {
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
            visible: true,
            formValidate: true
        }
    ],
    ColumnConfiguration: [
        {
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
            "displayName": "PortfolioManager",
            "dataSourceAddress": {tableName:"/Application/SqlStatementDetail/ManagedProgramDB_Lookup",
                dbColumnName: "id", displayColumnName: "name",
                dbParameters:{Parameters:[{Name:"@type", Value: 3}, {Name:"@GroupId", Value:421}, {Name: "@LoginName", Value:"ghindg2"}]}},
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
            "ruleType": "OneOf",
            "applyTo": "OneOf",
            "ruleName": ["required"],
            "ruleAssociates":["PortfolioNumber", "PortfolioName"],
            "apiObject": undefined
        },{
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["required"],
            "ruleAssociates": ["PortfolioManager", "InceptionDate"],
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

export var  PortfolioConfig = {
    TabsList: [
        {
            TabKey: "AddPortfolio",
            TabName: "Add Portfolio",
            TabControls:[],
        },{
            TabKey: "EditPortfolio",
            TabName: "Edit Portfolio",
            TabControls:[],
        }
    ]
};
