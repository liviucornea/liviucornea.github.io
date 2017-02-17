"use strict";
exports.TheChild = {
    ChildType: "edit",
    ShallHideDeleteButton: true,
    ShallHideAddButton: false,
    ForeignKeyColumn: "UnitId",
    PrimaryKeyColumn: "ConfigValueTypeId",
    ColumnConfiguration: [{
            "dbColumnName": "ConfigValueTypeId",
            "htmlControlType": "text",
            "isVisible": false,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "ConfigValueTypeId",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        },
        {
            "dbColumnName": "MessageTypeId",
            "htmlControlType": "select",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Message Type",
            "dataSourceAddress": { tableName: "/config/messagetype", dbColumnName: "MessageTypeId", displayColumnName: "LookupKey" },
            "dataSource": undefined,
            "regex": "^[a-zA-Z.]{2,30}$",
        },
        {
            "dbColumnName": "UnitId",
            "htmlControlType": "select",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Unit",
            "dataSourceAddress": { tableName: "/config/unit", dbColumnName: "UnitId", displayColumnName: "LookupKey" },
            "dataSource": undefined,
            "regex": "^[a-zA-Z.]{2,30}$",
        },
        {
            "dbColumnName": "LookupKey",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Description",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": "^[a-zA-Z.]{2,30}$",
        },
        {
            "dbColumnName": "Template",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Template",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": "^[a-zA-Z.]{2,30}$",
            "type": "json"
        },
        {
            "dbColumnName": "VersionStamp",
            "htmlControlType": "text",
            "isVisible": false,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "VersionStamp",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }]
};
exports.ConfigUnitControlConfig = {
    ChildType: "edit",
    ShallHideDeleteButton: true,
    ShallHideAddButton: false,
    IsChildPage: "true",
    ChildControlConfig: exports.TheChild,
    PaginationPageLimit: 10,
    PrimaryKeyColumn: "UnitId",
    ColumnConfiguration: [{
            "dbColumnName": "UnitId",
            "htmlControlType": "text",
            "isVisible": false,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Id",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        },
        {
            "dbColumnName": "LookupKey",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Description",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": "^[a-zA-Z.]{2,30}$",
        },
        {
            "dbColumnName": "UnitTypeId",
            "htmlControlType": "select",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "Unit Type",
            "dataSourceAddress": { tableName: "/config/UnitType", dbColumnName: "UnitTypeId", displayColumnName: "UnitTypeLookupKey" },
            "dataSource": undefined,
            "regex": undefined,
        },
        {
            "dbColumnName": "VersionStamp",
            "htmlControlType": "text",
            "isVisible": false,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "VersionStamp",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }]
};
//# sourceMappingURL=configurationControlConfig.js.map