let EditPortfolioFormBuilderConfig = {
    CustomButtons: [

    ],
    ColumnConfiguration: [
        {
            "dbColumnName": "PortfolioSearchOptions",
            "htmlControlType": "radio",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Portfolio Search Options",
            "dataSourceAddress": {dbColumnName: "Value", displayColumnName: "Description"},
            "dataSource": [{Value: 'PortfolioNumber', Description: 'Portfolio Number'}, {Value: 'PortfolioName', Description: 'Portfolio Name'}],
            "regex": undefined,
        },{
            "dbColumnName": "SearchByNumberAndName",
            "htmlControlType": "searchlist",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Search",
            "dataSourceAddress": {displayList:{Fields:["PortfolioNumber", "PortfolioName"], Delimeter: " - "},
                searchFilterFields:["PortfolioSearchOptions"]},
            "dataSource": undefined,
            "regex": undefined,
        }
    ],
    RulesConfig: [

    ]
};

export var  PortfolioConfig = {
    TabsList: [
        {
            TabKey: "AddPortfolio",
            TabName: "Add Portfolio",
            TabControls:[

            ],
        },{
            TabKey: "EditPortfolio",
            TabName: "Edit Portfolio",
            TabControls:[
                {
                    ShowDefault: true,
                    ComponentName: "EditPortfolioFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: EditPortfolioFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                }

            ],
        }
    ]
};
