export var SqlStatementControlConfig = {
    ChildType: "edit",
    ShallHideDeleteButton: false,
    ShallHideAddButton: false,
    PaginationPageLimit: 10,
    ShowFilterRow: true,
    IsScrollableGrid:true,
    PrimaryKeyColumn: "ID",
    ColumnConfiguration: [
        {
            "dbColumnName": "ID",
            "htmlControlType": "text",
            "isVisible": false,
            "isRequired":false,
            "isComplexType": false,
            "displayName": "ID",
            "dataSourceAddress":undefined,
            "dataSource": undefined,
            "regex": undefined,
        },
        {
            "dbColumnName": "DataKey",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired":true,
            "isComplexType": false,
            "displayName": "Data Key",
            "dataSourceAddress":undefined,
            "dataSource":undefined,
            "regex": undefined,
        },
        {
            "dbColumnName": "ConnectionString",
            "htmlControlType": "select",
            "isVisible": true,
            "isRequired": true,
            "isComplexType": false,
            "displayName": "Connection String",
            "dataSourceAddress": { tableName: "/Application/ConnectionString", dbColumnName: "ID", displayColumnName: "DataKey" },
            "dataSource": undefined,
            "regex": undefined,
        },
        {
            "dbColumnName": "Query",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": true,
            "isComplexType": false,
            "displayName": "Query",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        },
        {
            "dbColumnName": "IsDynamic",
            "htmlControlType": "checkbox",
            "isVisible": true,
            "isRequired": true,
            "isComplexType": false,
            "displayName": "Is Dynamic",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": "",
            "isAllowGridLevelEdit": false,
            "isToggleable": false,
            //"columnFormat": { format: "font-awesome", pattern: { false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg' } }
        }]
};