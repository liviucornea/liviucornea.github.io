export var HolidaySetCodeControlConfig =  {
    ChildType: "edit",
    ShallHideDeleteButton: false,
    PaginationPageLimit: 5,
    ShallHideAddButton: false,
    ColumnConfiguration: [{
        "dbColumnName": "Id",
        "htmlControlType": "text",
        "isVisible": false,
        "isComplexType": false,
        "displayName": "Id",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "isToggleable": false
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
            "isToggleable": true,
        },
        {
            "dbColumnName": "ExternalCode",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "External Code",
            "dataSourceAddress":undefined,
            "dataSource":undefined,
            "regex":"^[a-zA-Z.]{2,30}$",
            "isToggleable": false
        },
        {
            "dbColumnName": "IsActive",
            "htmlControlType": "checkbox",
            "isVisible": true,
            "isComplexType": false,
            "isRequired":true,
            "displayName": "Active",
            "dataSourceAddress":undefined,
            "dataSource":undefined,
            "isToggleable": false,
            "columnFormat": {format:"font-awesome",pattern:{false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg'}}
        },
        {
            "dbColumnName": "VersionStamp",
            "htmlControlType": "text",
            "isVisible": false,
            "isComplexType": false,
            "isRequired":false,
            "displayName": "VersionStamp",
            "dataSourceAddress":undefined,
            "dataSource":undefined,
            "isToggleable": false
        }]
};