"use strict";
exports.ConfigBuilderSchema = {
    "definitions": {
        "ColumnObject": {
            "type": [
                "object",
                "null"
            ],
            "properties": {
                "dbColumnName": {
                    "type": "string",
                    "minLength": 4,
                    "maxLength": 50
                },
                "htmlControlType": {
                    "type": "string",
                    "minLength": 4,
                    "maxLength": 50
                },
                "isVisible": {
                    "type": "boolean"
                },
                "isRequired": {
                    "type": "boolean"
                },
                "isComplexType": {
                    "type": "boolean"
                },
                "displayName": {
                    "type": "string",
                    "minLength": 4,
                    "maxLength": 50
                },
                "dataSourceAddress": {
                    "type": "object",
                    "properties": {
                        "tableName": {
                            "type": "string",
                            "minLength": 0,
                            "maxLength": 50
                        },
                        "dbColumnName": {
                            "type": "string",
                            "minLength": 0,
                            "maxLength": 50
                        },
                        "displayColumnName": {
                            "type": "string",
                            "minLength": 0,
                            "maxLength": 50
                        }
                    },
                    "isRequired": [
                        "tableName",
                        "dbColumnName",
                        "displayColumnName"
                    ]
                },
                "regex": {
                    "type": "string",
                    "minLength": 4,
                    "maxLength": 50
                },
                "columnCss": {
                    "type": "string",
                    "minLength": 4,
                    "maxLength": 50
                }
            },
            "isRequired": [
                "dbColumnName",
                "htmlControlType",
                "isVisible",
                "isRequired",
                "isComplexType",
                "displayName",
                "dataSourceAddress",
                "regex",
                "columnCss"
            ]
        },
        "FK": {
            "$ref": "#/definitions/ColumnObject/properties/dataSourceAddress"
        }
    },
    "type": "object",
    "properties": {
        "ChildType": {
            "type": "string",
            "minLength": 4,
            "maxLength": 50
        },
        "PrimaryKeyColumn": {
            "type": "string",
            "minLength": 0,
            "maxLength": 50
        },
        "ForeignKeyColumn": {
            "type": "string",
            "minLength": 0,
            "maxLength": 50
        },
        "ShallHideDeleteButton": {
            "type": "boolean"
        },
        "ShallHideAddButton": {
            "type": "boolean"
        },
        "IsChildPage": {
            "type": "boolean"
        },
        "PaginationPageLimit": {
            "type": "string",
            "minLength": 0,
            "maxLength": 2
        },
        "ColumnConfiguration": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/ColumnObject"
            }
        }
    },
    "isRequired": [
        "ChildType",
        "PrimaryKeyColumn",
        "ForeignKeyColumn",
        "ShallHideDeleteButton",
        "ShallHideAddButton",
        "IsChildPage",
        "PaginationPageLimit",
        "ColumnConfiguration"
    ]
};
//# sourceMappingURL=configBuilderSchema.js.map