 import {Injectable} from "angular2/core";
 @Injectable()
 export class ConfigBuilder {

     constructor() {
         let configObject = Object.create(null);
         //var childTypes={{name}}
         var pageLevel = {
             ChildType: "edit",
             ShallHideDeleteBtn: true,
             shallHideAddBtn: false,
             ColumnsList: ["ConfigValueTypeId", "UserId", "RoleId", "Template", "VersionStamp"],
             ForeignKeyColumn: "UnitId",
             PrimaryKeyColumn: "ConfigValueTypeId"
         }
         Object.assign(configObject,pageLevel);
         var testr = configObject;
     }
 }



let TheChild = {

    "ConfigValueTypeId": {
        "htmlControlType": "text",
        "visibility": false,
        "required": false,
        "isComplexType": false,
        "displayName": "ConfigValueTypeId",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnCss": undefined,
    },
    "MessageTypeId": {
        "htmlControlType": "select",
        "visibility": true,
        "required": false,
        "isComplexType": false,
        "displayName": "Message Type",
        "dataSourceAddress": { tableName: "/config/messagetype", dbColumnName: "MessageTypeId", displayColumnName: "LookupKey" },
        "dataSource": undefined,
        "regex": "^[a-zA-Z.]{2,30}$",
        "columnCss": "col-4",
    },
    "UnitId": {
        "htmlControlType": "select",
        "visibility": true,
        "required": false,
        "isComplexType": false,
        "displayName": "Unit",
        "dataSourceAddress": { tableName: "/config/unit", dbColumnName: "UnitId", displayColumnName: "LookupKey" },
        "dataSource": undefined,
        "regex": "^[a-zA-Z.]{2,30}$",
        "columnCss": "col-3",
    },
    "LookupKey": {
        "htmlControlType": "text",
        "visibility": true,
        "required": false,
        "isComplexType": false,
        "displayName": "Description",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": "^[a-zA-Z.]{2,30}$",
        "columnCss": "col-4",
    },
    "Template": {
        "htmlControlType": "text",
        "visibility": true,
        "required": false,
        "isComplexType": false,
        "displayName": "Template",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": "^[a-zA-Z.]{2,30}$",
        "columnCss": "col-6",
        "type": "json"
    },
    "VersionStamp": {
        "htmlControlType": "text",
        "visibility": false,
        "isComplexType": false,
        "required": true,
        "displayName": "VersionStamp",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnCss": undefined,
    }
};

export var configunitControlConfig = {
    ChildType: "edit",
    ShallHideDeleteBtn: true,
    shallHideAddBtn: false,
    IsChildPage: "true",
    childControlconfig: TheChild,
    PaginationPageLimit: 10,
    PrimaryKeyColumn: "UnitId",
    ColumnsList: ["UnitId", "LookupKey", "UnitTypeId", "VersionStamp"],
    "UnitId": {
        "htmlControlType": "text",
        "visibility": false,
        "required": false,
        "isComplexType": false,
        "displayName": "Id",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnCss": undefined,
    },
    "LookupKey": {
        "htmlControlType": "text",
        "visibility": true,
        "required": false,
        "isComplexType": false,
        "displayName": "Description",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": "^[a-zA-Z.]{2,30}$",
        "columnCss": "col-10",
    },
    "UnitTypeId": {
        "htmlControlType": "select",
        "visibility": true,
        "isComplexType": false,
        "required": true,
        "displayName": "Unit Type",
        "dataSourceAddress": { tableName: "/config/UnitType", dbColumnName: "UnitTypeId", displayColumnName: "UnitTypeLookupKey"},
        "dataSource": undefined,
        "regex": undefined,
        "columnCss": "col-4",
    },
    "VersionStamp": {
        "htmlControlType": "text",
        "visibility": false,
        "isComplexType": false,
        "required": false,
        "displayName": "VersionStamp",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnCss": undefined,
    }
};

