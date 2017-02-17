let AddUserFormBuilderConfig = {
    CustomButtons: [
        {
            name:'Add',
            value:'Add',
            disabled: false,
            visible: true,
            formValidate: true
        }
    ],
    ColumnConfiguration: [
        {
            "dbColumnName": "SystemType",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "SystemType",
            "dataSourceAddress": {tableName:"/Application/SqlStatementDetail/ManagedProgramDB_GetGroupType",
                dbColumnName: "ID", displayColumnName: "Description",
                dbParameters:{Parameters:[{Name:"@GroupTypeIDs", Value: "18,19,23"}]},
                defaultValue: [{Value:"", Name:""}]},
            "dataSource": undefined,
            "regex": undefined,
        },{
            "dbColumnName": "GroupType",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "GroupType",
            "dataSourceAddress": {dbColumnName: "ID", displayColumnName: "Description", defaultValue: [{Value:"", Name:""}]},
            "dataSource": undefined,
            "regex": undefined,
        },{
            "dbColumnName": "User",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "User",
            "dataSourceAddress": {dbColumnName: "ID", displayColumnName: "Name", defaultValue: [{Value:"", Name:""}]},
            "dataSource": undefined,
            "regex": undefined,
        }
    ],
    RulesConfig: [
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["required"],
            "ruleAssociates": ["SystemType", "GroupType", "User"],
            "apiObject": undefined
        }]
};

let AssignCSAListConfig = {
    CustomButtons: [
        {
            name:'Save',
            value:'Save',
            disabled: false,
            visible: true,
            formValidate: false
        }
    ],
    ListItemsConfiguration:
    {
        "inputListDataFields": {dbColumnName: "id", displayColumnName: "name"},
        "inputListTitle": "AvailableUsers",
        "assignedListDataFields": {dbColumnName: "id", displayColumnName: "name"},
        "assignedListTitle": "LinkedUsers",
    }
};

let AssignCSAFormBuilderConfig = {
    ColumnConfiguration: [
        {
            "dbColumnName": "SystemType",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "SystemType",
            "dataSourceAddress": {tableName:"/Application/SqlStatementDetail/ManagedProgramDB_GetGroupType",
                dbColumnName: "ID", displayColumnName: "Description",
                dbParameters:{Parameters:[{Name:"@GroupTypeIDs", Value: "18,19,23"}]},
                defaultValue: [{Value:"", Name:""}]},
            "dataSource": undefined,
            "regex": undefined,
        },{
            "dbColumnName": "ProjectManagers",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Project Managers",
            "dataSourceAddress": {dbColumnName: "ID", displayColumnName: "Name", defaultValue: [{Value:"", Name:""}]},
            "dataSource": undefined,
            "regex": undefined,
        }
    ],
    RulesConfig: [
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["required"],
            "ruleAssociates": ["SystemType", "ProjectManagers"],
            "apiObject": undefined
        }]
};

let ChangeSubstitutesListConfig = {
    CustomButtons: [
        {
            name:'Save',
            value:'Save',
            disabled: false,
            visible: true,
            formValidate: false
        }
    ],
    ListItemsConfiguration:
        {
            "inputListDataFields": {dbColumnName: "id", displayColumnName: "model"},
            "inputListTitle": "AllActiveModels",
            "assignedListDataFields": {dbColumnName: "ireplacemodelid", displayColumnName: "model"},
            "assignedListTitle": "Substitution",
        }
};

let ChangeSubstitutesFormBuilderConfig = {
    ColumnConfiguration: [
        {
            "dbColumnName": "Models",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Models",
            "dataSourceAddress": {tableName:"/Application/SqlStatementDetail/ManagedProgramDB_FixModels",
                dbColumnName: "imodelid", displayColumnName: "model",
                dbParameters:{Parameters:[]},
                defaultValue: [{Value:"", Name:""}]},
            "dataSource": undefined,
            "regex": undefined,
        }
    ],
    RulesConfig: [
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["required"],
            "ruleAssociates": ["Models"],
            "apiObject": undefined
        }]
};

let EditUserFormBuilderConfig = {
    CustomButtons: [
        {
            name:'Edit',
            value:'Edit',
            disabled: false,
            visible: true,
            formValidate: true
        }
    ],
    ColumnConfiguration: [
        {
            "dbColumnName": "SystemType",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "SystemType",
            "dataSourceAddress": {tableName:"/Application/SqlStatementDetail/ManagedProgramDB_GetGroupType",
                dbColumnName: "ID", displayColumnName: "Description",
                dbParameters:{Parameters:[{Name:"@GroupTypeIDs", Value: "18,19,23"}]},
                defaultValue: [{Value:"", Name:""}]},
            "dataSource": undefined,
            "regex": undefined,
        },{
            "dbColumnName": "GroupType",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "GroupType",
            "dataSourceAddress": {dbColumnName: "ID", displayColumnName: "Description", defaultValue: [{Value:"", Name:""}]},
            "dataSource": undefined,
            "regex": undefined,
        },{
            "dbColumnName": "User",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "User",
            "dataSourceAddress": {dbColumnName: "ID", displayColumnName: "Name", defaultValue: [{Value:"", Name:""}]},
            "dataSource": undefined,
            "regex": undefined,
        },{
            "dbColumnName": "Portfolios",
            "htmlControlType": "checkboxlist",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "ChangePortfolios",
            "dataSourceAddress": {dbColumnName: "ID", displayColumnName: "Portfolio"},
            "dataSource": undefined,
            "regex": undefined,
        },{
            "dbColumnName": "ToUser",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "To User",
            "dataSourceAddress": {dbColumnName: "ID", displayColumnName: "Name", defaultValue: [{Value:"", Name:""}]},
            "dataSource": undefined,
            "regex": undefined,
        }
    ],
    RulesConfig: [
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["required"],
            "ruleAssociates": ["SystemType", "GroupType", "User", "Portfolios", "ToUser"],
            "apiObject": undefined
        }]
};

let ModuleUpdateDisplayGridConfig= {
    ChildType: "",
    IsSpreadsheetGrid: true,
    ShallHideDeleteButton:true,
    ShallHideAddButton:true,
    IsChildPage:false,
    IsScrollableGrid:true,
    ShowFilterRow: false,
    ShowFooterRow: false,
    UseBusinessValidation: true,
    CustomButtons: [
    {
        name:'Submit',
        value:'Submit',
        formValidate: true,
        disabled: false,
        visible: true
    }],
    RulesConfig: [
       /* {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["range"],
            "ruleAssociates":["Mid"],
            "ruleValue": [0, 100],
            "apiObject": undefined
        },*/
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["inputmask"],
            "ruleAssociates":["Mid"],
            "ruleValue":"^100(.00)?|([1-9]?[0-9])(\.[0-9]{2})?$",
            "apiObject": undefined
        },{
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["required"],
            "ruleAssociates":["Mid"],
            "apiObject": undefined
        }],
    ColumnConfiguration:[{
        "dbColumnName":"ID",
        "htmlControlType":"text",
        "isVisible":false,
        "isRequired":false,
        "isComplexType":false,
        "displayName":"ID",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
    },{
        "dbColumnName":"Model",
        "htmlControlType":"text",
        "isVisible":true,
        "readOnly":true,
        "isRequired":false,
        "isComplexType":false,
        "displayName":"Model",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
    },{
        "dbColumnName":"Name",
        "htmlControlType":"text",
        "isVisible":true,
        "readOnly":true,
        "isRequired":false,
        "isComplexType":false,
        "displayName":"Name",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
    },{
        "dbColumnName":"Mid",
        "htmlControlType":"text",
        "isAllowGridLevelEdit": true,
        "isVisible":true,
        "isRequired":true,
        "isComplexType":false,
        "displayName":"Mid",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
    }]
};

let ModuleUpdateFormBuilderConfig = {
    ColumnConfiguration: [
        {
            "dbColumnName": "Module",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Module",
            "dataSourceAddress": {tableName:"/Application/SqlStatementDetail/ManagedProgramDB_GetModule", dbColumnName: "id", displayColumnName: "Name",
                dbParameters:{Parameters:[{Name:"@ModuleType", Value: null}], defaultValue: [{Value:"", Name:""}]}},
            "dataSource": undefined,
            "regex": undefined,
        }
    ],
    RulesConfig: [
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["required"],
            "ruleAssociates": ["Module"],
            "apiObject": undefined
        }]
};

export var  MpdbAdministrationConfig = {
    TabsList: [
        {
            TabKey: "addUser",
            TabName: "Add User",
            TabControls:[
                {
                    ShowDefault: true,
                    ComponentName: "AddUserFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: AddUserFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                }
            ],
        },{
            TabKey: "AssignCSA",
            TabName: "Assign CSA",
            TabControls:[
                {
                    ShowDefault: true,
                    ComponentName: "AssignCSAFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: AssignCSAFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                }, {
                    ShowDefault: true,
                    ComponentName: "AssignCSAList",
                    PageType: "assignablelist",
                    gridSettings: AssignCSAListConfig,
                    PageOperationType: 'dynamicform'
                }
            ],
        },{
            TabKey: "ChangeSubstitutes",
            TabName: "Change Substitutes",
            TabControls:[
                {
                    ShowDefault: true,
                    ComponentName: "ChangeSubstitutesFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: ChangeSubstitutesFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                }, {
                    ShowDefault: true,
                    ComponentName: "ChangeSubstitutesList",
                    PageType: "assignablelist",
                    gridSettings: ChangeSubstitutesListConfig,
                    PageOperationType: 'dynamicform'
                }
            ],
        },{
            TabKey: "editUser",
            TabName: "Edit User",
            TabControls:[
                {
                    ShowDefault: true,
                    ComponentName: "EditUserFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: EditUserFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                }
            ],
        },{
            TabKey: "ModuleUpdate",
            TabName: "Module Update",
            TabControls:[
                {
                    ShowDefault: true,
                    ComponentName: "ModuleUpdateFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: ModuleUpdateFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                },{
                    ShowDefault: false,
                    ComponentName: "ModuleUpdateDisplayGrid",
                    PageType: "displaygrid",
                    gridSettings: ModuleUpdateDisplayGridConfig,
                    PageOperationType: 'view'
                }
            ],
        }
    ]
};