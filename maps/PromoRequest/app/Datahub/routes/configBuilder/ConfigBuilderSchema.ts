export var ConfigBuilderSchema= {
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
                "visiblity": {
                    "type": "boolean"
                },
                "required": {
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
                "displayOrder": {
                    "type": "number"
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
                    "required": [
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
            "required": [
                "dbColumnName",
                "htmlControlType",
                "visiblity",
                "required",
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
        "ShallHideDeleteBtn": {
            "type": "boolean"
        },
        "shallHideAddBtn": {
            "type": "boolean"
        },
        "IsChildPage": {
            "type": "boolean"
        },
        "PaginationPageLimit": {
            "type": "string",
            "minLength": 0,
            "maxLength": 2
            /*"minimum": 1.0,
            "maximum": 99999.0*/
        },
        "ColumnConfiguration": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/ColumnObject"
            }
        }
    },
    "required": [
        "ChildType",
        "PrimaryKeyColumn",
        "ForeignKeyColumn",
        "ShallHideDeleteBtn",
        "shallHideAddBtn",
        "IsChildPage",
        "PaginationPageLimit",
        "ColumnConfiguration"
    ]
}
