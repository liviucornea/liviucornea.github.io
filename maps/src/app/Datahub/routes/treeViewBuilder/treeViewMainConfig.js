System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var treeViewMainConfig;
    return {
        setters:[],
        execute: function() {
            exports_1("treeViewMainConfig", treeViewMainConfig = {
                "RootModel": "Customer",
                "expanded": true,
                "Level": 0,
                "Definitions": [
                    {
                        "ModelName": "Customer",
                        "Expanded": false,
                        "Level": 1,
                        "ColumnDefinitions": [
                            {
                                "dbColumnName": "Customer_Id",
                                "htmlControlType": "text",
                                "isVisible": true,
                                "isRequired": false,
                                "isComplexType": false,
                                "displayName": "Id",
                                "regex": null,
                                "columnCss": null
                            },
                            {
                                "dbColumnName": "FirstName",
                                "htmlControlType": "text",
                                "isVisible": true,
                                "isRequired": false,
                                "isComplexType": false,
                                "displayName": "FirstName",
                                "regex": "^[a-zA-Z.]{2,30}$",
                                "columnCss": "col-3"
                            },
                            {
                                "dbColumnName": "LastName",
                                "htmlControlType": "text",
                                "isVisible": true,
                                "isRequired": false,
                                "isComplexType": false,
                                "displayName": "LastName",
                                "regex": "^[a-zA-Z.]{2,30}$",
                                "columnCss": "col-3"
                            }
                        ],
                        "NodeModels": [
                            "Address", "Equity"
                        ]
                    },
                    {
                        "ModelName": "Address",
                        "Expanded": true,
                        "Level": 2,
                        "NodeClass": "tdam-treeview-panel",
                        "ColumnDefinitions": [
                            {
                                "dbColumnName": "Address_Id",
                                "htmlControlType": "text",
                                "isVisible": true,
                                "isRequired": true,
                                "isComplexType": false,
                                "displayName": "Address Id",
                                "dataSourceAddress": "",
                                "dataSource": "",
                                "regex": "",
                                "columnCss": "",
                                "isAllowGridLevelEdit": false,
                                "isToggleable": false,
                            },
                            {
                                "dbColumnName": "AddressType",
                                "htmlControlType": "text",
                                "isVisible": true,
                                "isRequired": true,
                                "isComplexType": false,
                                "displayName": "Address Type",
                                "dataSourceAddress": "",
                                "dataSource": "",
                                "regex": "",
                                "columnCss": "",
                                "isAllowGridLevelEdit": false,
                                "isToggleable": false,
                            },
                            {
                                "dbColumnName": "StreetAddress1",
                                "htmlControlType": "text",
                                "isVisible": true,
                                "isRequired": true,
                                "isComplexType": false,
                                "displayName": "Street Address 1",
                                "dataSourceAddress": "",
                                "dataSource": "",
                                "regex": "",
                                "columnCss": "",
                                "isAllowGridLevelEdit": false,
                                "isToggleable": false,
                            },
                            {
                                "dbColumnName": "City",
                                "htmlControlType": "text",
                                "isVisible": true,
                                "isRequired": true,
                                "isComplexType": false,
                                "displayName": "City",
                                "dataSourceAddress": "",
                                "dataSource": "",
                                "regex": "",
                                "columnCss": "",
                                "isAllowGridLevelEdit": false,
                                "isToggleable": false,
                            },
                            {
                                "dbColumnName": "Province",
                                "htmlControlType": "text",
                                "isVisible": true,
                                "isRequired": true,
                                "isComplexType": false,
                                "displayName": "Province",
                                "dataSourceAddress": "",
                                "dataSource": "",
                                "regex": "",
                                "columnCss": "",
                                "isAllowGridLevelEdit": false,
                                "isToggleable": false,
                            }
                        ],
                        "NodeModels": []
                    },
                    {
                        "ModelName": "Equity",
                        "Expanded": true,
                        "Level": 2,
                        "NodeClass": "tdam-treeview-panel",
                        "ColumnDefinitions": [
                            {
                                "dbColumnName": "Equity_Id",
                                "htmlControlType": "text",
                                "isVisible": true,
                                "isRequired": true,
                                "isComplexType": false,
                                "displayName": "Equity Id",
                                "dataSourceAddress": "",
                                "dataSource": "",
                                "regex": "",
                                "columnCss": "",
                                "isAllowGridLevelEdit": false,
                                "isToggleable": false,
                            },
                            {
                                "dbColumnName": "Stock",
                                "htmlControlType": "text",
                                "isVisible": true,
                                "isRequired": true,
                                "isComplexType": false,
                                "displayName": "Stock",
                                "dataSourceAddress": "",
                                "dataSource": "",
                                "regex": "",
                                "columnCss": "",
                                "isAllowGridLevelEdit": false,
                                "isToggleable": false,
                            },
                        ],
                        "NodeModels": [
                            "Holdings"
                        ]
                    },
                    {
                        "ModelName": "Holdings",
                        "Expanded": false,
                        "Level": 3,
                        "NodeClass": "",
                        "ColumnDefinitions": [
                            {
                                "dbColumnName": "Holdings_Id",
                                "htmlControlType": "text",
                                "isVisible": true,
                                "isRequired": true,
                                "isComplexType": false,
                                "displayName": "Holding Id",
                                "dataSourceAddress": "",
                                "dataSource": "",
                                "regex": "",
                                "columnCss": "",
                                "isAllowGridLevelEdit": false,
                                "isToggleable": false,
                            },
                            {
                                "dbColumnName": "Name",
                                "htmlControlType": "text",
                                "isVisible": true,
                                "isRequired": true,
                                "isComplexType": false,
                                "displayName": "Name",
                                "dataSourceAddress": "",
                                "dataSource": "",
                                "regex": "",
                                "columnCss": "",
                                "isAllowGridLevelEdit": false,
                                "isToggleable": false,
                            },
                            {
                                "dbColumnName": "Price",
                                "htmlControlType": "text",
                                "isVisible": true,
                                "isRequired": true,
                                "isComplexType": false,
                                "displayName": "Price",
                                "dataSourceAddress": "",
                                "dataSource": "",
                                "regex": "",
                                "columnCss": "",
                                "isAllowGridLevelEdit": false,
                                "isToggleable": false,
                            },
                        ],
                        "NodeModels": [
                            "ThirdLevel"
                        ]
                    },
                    {
                        "ModelName": "ThirdLevel",
                        "Expanded": false,
                        "Level": 4,
                        "NodeClass": "",
                        "ColumnDefinitions": [
                            {
                                "dbColumnName": "ThirdLevel1",
                                "htmlControlType": "text",
                                "isVisible": true,
                                "isRequired": true,
                                "isComplexType": false,
                                "displayName": "ThirdLevel1",
                                "dataSourceAddress": "",
                                "dataSource": "",
                                "regex": "",
                                "columnCss": "",
                                "isAllowGridLevelEdit": false,
                                "isToggleable": false,
                            },
                            {
                                "dbColumnName": "ThirdLevel2",
                                "htmlControlType": "text",
                                "isVisible": true,
                                "isRequired": true,
                                "isComplexType": false,
                                "displayName": "ThirdLevel2",
                                "dataSourceAddress": "",
                                "dataSource": "",
                                "regex": "",
                                "columnCss": "",
                                "isAllowGridLevelEdit": false,
                                "isToggleable": false,
                            }
                        ],
                        "NodeModels": []
                    }
                ]
            });
        }
    }
});
//# sourceMappingURL=treeViewMainConfig.js.map