/**
 * Created by matesc2 on 10/14/2016.
 */
export var TheChild = {
    Name:"LogsControlConfig",
    ChildType: "",
    ForeignKeyColumn: "TaskGUID",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    DefaultSortColumn: "creationdate",
    DefaultSortDirection: "asc",
    ServerPagination: true,
    IsScrollableGrid: true,
        "ColumnConfiguration": [
            {
                "dbColumnName": "TaskGUID",
                "htmlControlType": "text",
                "isVisible": false,
                "isComplexType": false,
                "displayName": "TaskGUID",
                "dataSourceAddress": undefined,
                "dataSource": undefined,
                "filterable": false,
            },
            {
                "dbColumnName": "SchematicId",
                "htmlControlType": "text",
                "isVisible": true,
                "isComplexType": false,
                "displayName": "Schematic ID",
                "dataSourceAddress": undefined,
                "dataSource": undefined,
                "filterable": true,
            },
            {
                "dbColumnName": "StepId",
                "htmlControlType": "text",
                "isVisible": true,
                "isComplexType": false,
                "displayName": "Step No",
                "dataSourceAddress": undefined,
                "dataSource": undefined,
                "filterable": false,
            },
            {
                "dbColumnName": "Message",
                "htmlControlType": "text",
                "isVisible": true,
                "isComplexType": false,
                "displayName": "Message",
                "dataSourceAddress": undefined,
                "dataSource": undefined,
                "filterable": false,
            },
            {
                "dbColumnName": "CreationDate",
                "htmlControlType": "datetime-local",
                "isVisible": true,
                "isComplexType": false,
                "displayName": "Creation Date",
                "dataSourceAddress": undefined,
                "dataSource": undefined,
                "filterable": false
            },
            {
                "dbColumnName": "Level",
                "htmlControlType": "text",
                "isVisible": true,
                "isComplexType": false,
                "displayName": "Level",
                "dataSourceAddress": undefined,
                "dataSource": undefined,
                "filterable": false,
            },
            {
                "dbColumnName": "Logger",
                "htmlControlType": "text",
                "isVisible": false,
                "isComplexType": false,
                "displayName": "Logger",
                "dataSourceAddress": undefined,
                "dataSource": undefined,
                "filterable": false,
            },
            {
                "dbColumnName": "LogType",
                "htmlControlType": "text",
                "isVisible": true,
                "isComplexType": false,
                "displayName": "Log Type",
                "dataSourceAddress": undefined,
                "dataSource": undefined,

                "filterable": true,
            }]
};

export var LogsControlConfig = {
    ChildType: "editInline",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsChildPage: "false",
    ChildControlConfig: TheChild,
    PrimaryKeyColumn: "TaskGUID",
    DefaultSortColumn: "startdate",
    DefaultSortDirection: "desc",
    ServerPagination: true,
    PaginationPageLimit: 10,
    ChildGridType: "displayGrid",
    "ColumnConfiguration": [
        {
            "dbColumnName": "TaskGUID",
            "htmlControlType": "text",
            "isVisible": false,
            "readOnly": true,
            "isComplexType": false,
            "displayName": "TaskGUID",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "filterable": false,
            "isToggleable": false
        },
        {
            "dbColumnName": "Entity",
            "htmlControlType": "text",
            "isVisible": true,
            "readOnly": true,
            "isComplexType": false,
            "displayName": "Pipeline/Schematic",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "filterable": true,
            "isToggleable": true
        },
        {
            "dbColumnName": "Description",
            "htmlControlType": "text",
            "isVisible": true,
            "readOnly": true,
            "isComplexType": false,
            "displayName": "Description",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "filterable": false,
            "isToggleable": false
        },
        {
            "dbColumnName": "StartDate",
            "htmlControlType": "datetime-local",
            "isVisible": true,
            "readOnly": true,
            "isComplexType": false,
            "displayName": "Start Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "filterable": true,
            "isToggleable": false
        },
        {
            "dbColumnName": "EndDate",
            "htmlControlType": "datetime-local",
            "isVisible": true,
            "readOnly": true,
            "isComplexType": false,
            "displayName": "End Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "filterable": false,
            "isToggleable": false
        },
        {
            "dbColumnName": "Status",
            "htmlControlType": "text",
            "isVisible": true,
            "readOnly": true,
            "isComplexType": false,
            "displayName": "Status",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "filterable": true,
            "isToggleable": false
        },
        {
            "dbColumnName": "UserName",
            "htmlControlType": "text",
            "isVisible": false,
            "readOnly": true,
            "isComplexType": false,
            "displayName": "User Name",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "filterable": false,
            "isToggleable": false
        },
        {
            "dbColumnName": "MachineName",
            "htmlControlType": "text",
            "isVisible": false,
            "readOnly": true,
            "isComplexType": false,
            "displayName": "Machine Name",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "filterable": false,
            "isToggleable": false
        },
        {
            "dbColumnName": "Resolved",
            "htmlControlType": "checkbox",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Resolved",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "filterable": false,
            "isToggleable": false,
            "columnFormat": {format:"font-awesome",pattern:{false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg'}}
        },
        {
            "dbColumnName": "Comments",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "displayName": "Comments",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "filterable": false,
            "isToggleable": false
        },
        {
            "dbColumnName": "ResUserName",
            "htmlControlType": "text",
            "isVisible": true,
            "readOnly": true,
            "isComplexType": false,
            "displayName": "Resolved By",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "filterable": false,
            "isToggleable": false
        },
        {
            "dbColumnName": "VersionStamp",
            "htmlControlType": "text",
            "isVisible": false,
            "isComplexType": false,
            "displayName": "VersionStamp",
            "dataSourceAddress":undefined,
            "dataSource":undefined,
        }]
};

