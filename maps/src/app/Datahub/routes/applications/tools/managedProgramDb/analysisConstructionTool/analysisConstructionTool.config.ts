let AdminFormBuilderConfig = {
    ColumnConfiguration: [

    ],
    RulesConfig: [

        ]
};

let LockdownFormBuilderConfig = {
    ColumnConfiguration: [

    ],
    RulesConfig: [

    ]
};

let ConstructionToolFormBuilderConfig = {
    ColumnConfiguration: [

    ],
    RulesConfig: [

    ]
};

export var  AnalysisConstructionToolConfig = {
    TabsList: [
        {
            TabKey: "Admin",
            TabName: "Administration",
            TabControls:[
                {
                    ShowDefault: true,
                    ComponentName: "AdminFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: AdminFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                }
            ],
        },{
            TabKey: "Lockdown",
            TabName: "Lockdown",
            TabControls:[
                {
                    ShowDefault: true,
                    ComponentName: "LockdownFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: LockdownFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                }
            ],
        },{
            TabKey: "ConstructionTool",
            TabName: "Portfolio Analysis and Construction Tool",
            TabControls:[
                {
                    ShowDefault: true,
                    ComponentName: "ConstructionToolFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: ConstructionToolFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                }
            ],
        }
    ]
};
