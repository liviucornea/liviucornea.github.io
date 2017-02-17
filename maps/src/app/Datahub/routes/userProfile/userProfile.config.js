"use strict";
/**
 * Created by vikhnv2 on 11/30/2016.
 */
exports.ComponentSettings = {
    'Api': { "BaseUrl": "http://localhost:17752/api/tdam/datahub/ae/" }
};
exports.CollapsePanelConfig = {
    Panels: [
        {
            Title: "My Roles",
            DataSetKey: "Roles",
            GridConfiguration: {
                ChildType: "",
                IsSpreadsheetGrid: false,
                ShallHideDeleteButton: true,
                ShallHideAddButton: true,
                ColumnConfiguration: [
                    {
                        "dbColumnName": "Id",
                        "htmlControlType": "text",
                        "isVisible": false,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "Id",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined
                    },
                    {
                        "dbColumnName": "Name",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": true,
                        "isComplexType": false,
                        "displayName": "Name",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined
                    },
                    {
                        "dbColumnName": "Description",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": true,
                        "isComplexType": false,
                        "displayName": "Description",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined
                    }
                ]
            }
        },
        {
            Title: "My Applications",
            DataSetKey: "Applications",
            GridConfiguration: {
                ChildType: "",
                IsSpreadsheetGrid: false,
                ShallHideDeleteButton: true,
                ShallHideAddButton: true,
                ColumnConfiguration: [
                    {
                        "dbColumnName": "Id",
                        "htmlControlType": "text",
                        "isVisible": false,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "Id",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined
                    },
                    {
                        "dbColumnName": "Name",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": true,
                        "isComplexType": false,
                        "displayName": "Name",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined
                    },
                    {
                        "dbColumnName": "Description",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": true,
                        "isComplexType": false,
                        "displayName": "Description",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined
                    }
                ]
            }
        },
        {
            Title: "My Menu Items",
            DataSetKey: "MenuItems",
            GridConfiguration: {
                ChildType: "",
                IsSpreadsheetGrid: false,
                ShallHideDeleteButton: true,
                ShallHideAddButton: true,
                ColumnConfiguration: [
                    {
                        "dbColumnName": "Id",
                        "htmlControlType": "text",
                        "isVisible": false,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "Id",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined
                    },
                    {
                        "dbColumnName": "Title",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": true,
                        "isComplexType": false,
                        "displayName": "Title",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined
                    },
                    {
                        "dbColumnName": "Create",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": true,
                        "isComplexType": false,
                        "displayName": "Create",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                        "columnFormat": { format: "font-awesome", pattern: { false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg' } }
                    },
                    {
                        "dbColumnName": "Delete",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": true,
                        "isComplexType": false,
                        "displayName": "Delete",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                        "columnFormat": { format: "font-awesome", pattern: { false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg' } }
                    },
                    {
                        "dbColumnName": "Read",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": true,
                        "isComplexType": false,
                        "displayName": "Read",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                        "columnFormat": { format: "font-awesome", pattern: { false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg' } }
                    },
                    {
                        "dbColumnName": "Update",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": true,
                        "isComplexType": false,
                        "displayName": "Update",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                        "columnFormat": { format: "font-awesome", pattern: { false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg' } }
                    }
                ]
            }
        },
        {
            Title: "My Resources",
            DataSetKey: "Resources",
            GridConfiguration: {
                ChildType: "",
                IsSpreadsheetGrid: false,
                ShallHideDeleteButton: true,
                ShallHideAddButton: true,
                ColumnConfiguration: [
                    {
                        "dbColumnName": "Id",
                        "htmlControlType": "text",
                        "isVisible": false,
                        "isRequired": false,
                        "isComplexType": false,
                        "displayName": "Id",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined
                    },
                    {
                        "dbColumnName": "Name",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": true,
                        "isComplexType": false,
                        "displayName": "Name",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined
                    },
                    {
                        "dbColumnName": "Description",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": true,
                        "isComplexType": false,
                        "displayName": "Description",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined
                    },
                    {
                        "dbColumnName": "Create",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": true,
                        "isComplexType": false,
                        "displayName": "Create",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                        "columnFormat": { format: "font-awesome", pattern: { false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg' } }
                    },
                    {
                        "dbColumnName": "Delete",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": true,
                        "isComplexType": false,
                        "displayName": "Delete",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                        "columnFormat": { format: "font-awesome", pattern: { false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg' } }
                    },
                    {
                        "dbColumnName": "Read",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": true,
                        "isComplexType": false,
                        "displayName": "Read",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                        "columnFormat": { format: "font-awesome", pattern: { false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg' } }
                    },
                    {
                        "dbColumnName": "Update",
                        "htmlControlType": "text",
                        "isVisible": true,
                        "isRequired": true,
                        "isComplexType": false,
                        "displayName": "Update",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": undefined,
                        "columnFormat": { format: "font-awesome", pattern: { false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg' } }
                    }
                ]
            }
        }
    ]
};
//# sourceMappingURL=userProfile.config.js.map