let ImportNewAccountsFormBuilderConfig = {
    ColumnConfiguration: [

    ],
    RulesConfig: [

    ]
};

let InitiateAutoUploadFormBuilderConfig = {
    ColumnConfiguration: [

    ],
    RulesConfig: [

    ]
};

export var  TasksConfig = {
    TabsList: [
        {
            TabKey: "ImportNewAccounts",
            TabName: "Import New Accounts",
            TabControls:[
                {
                    ShowDefault: true,
                    ComponentName: "ImportNewAccountsFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: ImportNewAccountsFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                }
            ],
        },{
            TabKey: "InitiateAutoUpload",
            TabName: "Initiate Auto Upload",
            TabControls:[
                {
                    ShowDefault: true,
                    ComponentName: "InitiateAutoUploadFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: InitiateAutoUploadFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                }
            ],
        }
    ]
};
