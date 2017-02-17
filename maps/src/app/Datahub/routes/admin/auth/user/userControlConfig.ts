export var UserRoleFormControlConfig={
    ColumnConfiguration:[
        {
            "dbColumnName": "Login",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isRequired":false,
            "isComplexType": false,
            "displayName": "Login",
            "dataSourceAddress":{ tableName: "/auth/user", dbColumnName: "Id", displayColumnName: "Login" },
            "dataSource":undefined,
            "regex":"^[a-zA-Z.]{2,30}$",
        },
    ]
}

export var UserRoleControlConfig={
    ChildType: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    RowSelectionMode:'Multi',
    UseBusinessValidation: true,
    CustomButtons: [
        {
            name:'Save',
            value:'Save',
            disabled: false,
            visible: true,
            formValidate: false
        },
        {
            name:'Cancel',
            value:'Cancel',
            disabled: false,
            visible: true,
            formValidate: false
        }
    ],
    ColumnConfiguration: [{
        "dbColumnName": "Id",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired":false,
        "isComplexType": false,
        "displayName": "Id",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
    },
        {
            "dbColumnName": "ApplicationId",
            "htmlControlType": "select",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Application",
            "dataSourceAddress":{ tableName: "/auth/Application", dbColumnName: "Id", displayColumnName: "Name" },
            "dataSource":undefined,
            "regex":"^[a-zA-Z.]{2,30}$",
        },
        {
            "dbColumnName": "RoleId",
            "htmlControlType": "select",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Role",
            "dataSourceAddress":{ tableName: "/auth/role", dbColumnName: "Id", displayColumnName: "Name" },
            "dataSource":undefined,
            "regex":"^[a-zA-Z.]{2,30}$",
        }]
};

export var UserControlConfig = {
    ChildType: "editInline",
    ShallHideDeleteButton: false,
    ShallHideAddButton: false,
    PaginationPageLimit: 10,
    ShowFilterRow: true,
    IsScrollableGrid:true,
    ColumnConfiguration: [{
        "dbColumnName": "Id",
        "htmlControlType": "text",
        "isVisible": false,
        "isComplexType": false,
        "displayName": "Id",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
    },
        {
            "dbColumnName": "Name",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Name",
            "dataSourceAddress":undefined,
            "dataSource":undefined,
            "regex":"^[a-zA-Z.]{2,30}$",
        },
        {
            "dbColumnName": "Login",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "UserName",
            "dataSourceAddress":undefined,
            "dataSource":undefined,
            "regex":"^[a-zA-Z.]{2,30}$",
        },
        {
            "dbColumnName": "CostCentre",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "isRequired":true,
            "displayName": "Cost Centre",
            "dataSourceAddress":undefined,
            "dataSource":undefined,
        },
        {
            "dbColumnName": "VersionStamp",
            "htmlControlType": "text",
            "isVisible": false,
            "isComplexType": false,
            "displayName": "VersionStamp",
            "dataSourceAddress":undefined,
            "dataSource":undefined,
        }],
    "RulesConfig": [
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": [
                "required"
            ],
            "ruleAssociates": [
                "Name",
                "Login",
                "CostCentre"
            ],
            "apiObject": "User"
        }]
};


export var UserTabControlConfig = {
    TabsList: [
        {
            TabKey: "User",
            TabName: "User",
            TabControls: [
                {
                    ShowDefault: true,
                    ComponentName: "user",
                    PageType: "displaygrid",
                    gridSettings: UserControlConfig
                }
            ],
        },
        {
            TabKey: "UserRoles",
            TabName: "User Roles",
            TabControls: [
                {
                    ShowDefault: true,
                    ComponentName: "userroleform",
                    PageType: "formbuilder",
                    gridSettings: UserRoleFormControlConfig,
                    PageOperationType: 'dynamicform'
                },
                {
                    ShowDefault: false,
                    ComponentName: "userrolegrid",
                    PageType: "displaygrid",
                    gridSettings: UserRoleControlConfig
                }
            ],
        }
    ]
};