export var TheChild = {
    ChildType: "edit",
    ShallHideDeleteButton: false,
    ShallHideAddButton: false,
    PaginationPageLimit: 10,
    ForeignKeyColumn: "RoleId",
    ColumnConfiguration: [{
        "dbColumnName": "Id",
        "htmlControlType": "text",
        "isVisible": false,
        "isComplexType": false,
        "displayName": "Id",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "isAlwaysVisibleOn": ["FormBuilder"]
    },
        {
            "dbColumnName": "RoleId",
            "htmlControlType": "select",
            "isVisible": true,
            "isRequired": true,
            "isComplexType": false,
            "displayName": "Role",
            "dataSourceAddress": { tableName: "/auth/Role", dbColumnName: "Id", displayColumnName: "Description" },
            "dataSource": undefined,
            "regex": "^[a-zA-Z.]{2,30}$",
        },
        {
            "dbColumnName": "ResourceId",
            "htmlControlType": "select",
            "isVisible": true,
            "isRequired": true,
            "isComplexType": false,
            "displayName": "ApiUrl",
            "dataSourceAddress": { tableName: "/auth/resource", dbColumnName: "Id", displayColumnName: "ApiUrl" },
            "dataSource": undefined,
            "regex": "^[a-zA-Z.]{2,30}$",
        },
        {
            "dbColumnName": "Create",
            "htmlControlType": "checkbox",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Create",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": "^[a-zA-Z.]{2,30}$",
            "columnFormat": {format:"font-awesome",pattern:{false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg'}}
        },
        {
            "dbColumnName": "Read",
            "htmlControlType": "checkbox",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Read",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": "^[a-zA-Z.]{2,30}$",
            "columnFormat": {format:"font-awesome",pattern:{false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg'}}
        },
        {
            "dbColumnName": "Update",
            "htmlControlType": "checkbox",
            "isVisible": true,
             "isComplexType": false,
            "displayName": "Update",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": "^[a-zA-Z.]{2,30}$",
            "columnFormat": {format:"font-awesome",pattern:{false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg'}}
        },
        {
            "dbColumnName": "Delete",
            "htmlControlType": "checkbox",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Delete",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": "^[a-zA-Z.]{2,30}$",
            "columnFormat": {format:"font-awesome",pattern:{false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg'}}
        },
        {
            "dbColumnName": "VersionStamp",
            "htmlControlType": "text",
            "isVisible": false,
            "isComplexType": false,
            "displayName": "VersionStamp",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "isAlwaysVisibleOn": ["FormBuilder"]
        }]
};
export var RoleControlConfig = {
    ChildType: "edit",
    ShallHideDeleteButton: false,
    ShallHideAddButton: false,
    IsChildPage: "true",
    ChildControlConfig: TheChild,
    PaginationPageLimit: 10,
    RowSelectionMode: "None",
    ShowFilterRow: true,
    ChildGridType: "displayGrid",
    ColumnConfiguration: [{
        "dbColumnName": "Id",
        "htmlControlType": "text",
        "isVisible": false,
        "isComplexType": false,
        "displayName": "Id",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "isAlwaysVisibleOn": ["FormBuilder"]
    },
        {
            "dbColumnName": "Description",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Description",
            "dataSourceAddress":undefined,
            "dataSource":undefined,
            "regex":"^[a-zA-Z.]{2,30}$",
        },
        {
            "dbColumnName": "Name",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "External Code",
            "dataSourceAddress":undefined,
            "dataSource":undefined,
            "regex":"^[a-zA-Z.]{2,30}$",
        },
        {
            "dbColumnName": "VersionStamp",
            "htmlControlType": "text",
            "isVisible": false,
            "isComplexType": false,
            "displayName": "VersionStamp",
            "dataSourceAddress":undefined,
            "dataSource":undefined,
            "isAlwaysVisibleOn": ["FormBuilder"]
        }]
};




