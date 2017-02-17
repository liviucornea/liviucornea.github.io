System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TheChild, TheParent, RoleParentChildControlConfig;
    return {
        setters:[],
        execute: function() {
            TheChild = {
                ChildType: "edit",
                ShallHideDeleteButton: false,
                ShallHideAddButton: false,
                ForeignKeyColumn: "RoleId",
                ColumnConfiguration: [{
                        "dbColumnName": "Id",
                        "htmlControlType": "text",
                        "isVisible": false,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "Id",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                        "columnCss": undefined
                    },
                    {
                        "dbColumnName": "RoleId",
                        "htmlControlType": "select",
                        "isVisible": true,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "Role",
                        "dataSourceAddress": { tableName: "/auth/Role", dbColumnName: "Id", displayColumnName: "Description" },
                        "dataSource": undefined,
                        "regex": "^[a-zA-Z.]{2,30}$",
                        "columnCss": "col-6",
                    },
                    {
                        "dbColumnName": "ResourceId",
                        "htmlControlType": "select",
                        "isVisible": true,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "ApiUrl",
                        "dataSourceAddress": { tableName: "/auth/resource", dbColumnName: "Id", displayColumnName: "ApiUrl" },
                        "dataSource": undefined,
                        "regex": "^[a-zA-Z.]{2,30}$",
                        "columnCss": "col-6",
                    },
                    {
                        "dbColumnName": "Create",
                        "htmlControlType": "checkbox",
                        "isVisible": true,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "Create",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "^[a-zA-Z.]{2,30}$",
                        "columnCss": "col-2",
                    },
                    {
                        "dbColumnName": "Read",
                        "htmlControlType": "checkbox",
                        "isVisible": true,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "Read",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "^[a-zA-Z.]{2,30}$",
                        "columnCss": "col-2",
                    },
                    {
                        "dbColumnName": "Update",
                        "htmlControlType": "checkbox",
                        "isVisible": true,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "Update",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "^[a-zA-Z.]{2,30}$",
                        "columnCss": "col-2",
                    },
                    {
                        "dbColumnName": "Delete",
                        "htmlControlType": "checkbox",
                        "isVisible": true,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "Delete",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "^[a-zA-Z.]{2,30}$",
                        "columnCss": "col-2",
                    },
                    {
                        "dbColumnName": "VersionStamp",
                        "htmlControlType": "text",
                        "isVisible": false,
                        "isComplexType": false,
                        "isRequired": true,
                        "displayName": "VersionStamp",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                        "columnCss": undefined,
                    }]
            };
            TheParent = {
                ChildType: "edit",
                ShallHideDeleteButton: false,
                ShallHideAddButton: false,
                IsChildPage: "true",
                ColumnsList: ["Id", "Description", "Name", "VersionStamp"],
                ChildControlConfig: TheChild,
                RowSelectionMode: "None",
                ShowFilterRow: true,
                ColumnConfiguration: [{
                        "dbColumnName": "Id",
                        "htmlControlType": "text",
                        "isVisible": false,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "Id",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                        "columnCss": undefined
                    },
                    {
                        "dbColumnName": "Description",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "Description",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "^[a-zA-Z.]{2,30}$",
                        "columnCss": "col-6"
                    },
                    {
                        "dbColumnName": "Name",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "External Code",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "^[a-zA-Z.]{2,30}$",
                        "columnCss": "col-6"
                    },
                    {
                        "dbColumnName": "VersionStamp",
                        "htmlControlType": "text",
                        "isVisible": false,
                        "isComplexType": false,
                        "isRequired": true,
                        "displayName": "VersionStamp",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                        "columnCss": "col-3"
                    }]
            };
            exports_1("RoleParentChildControlConfig", RoleParentChildControlConfig = { theParent: TheParent, theChild: TheChild });
        }
    }
});
//# sourceMappingURL=roleControlConfig.js.map