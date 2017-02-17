"use strict";
var msiValidationFunctions_1 = require('./msiValidationFunctions');
exports.TheChild = {
    Name: "DisplayGridChildConfig",
    ChildType: "",
    ForeignKeyColumn: "CountryCode",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsScrollableGrid: true,
    ShowFooterRow: true,
    ColumnConfiguration: [{
            "dbColumnName": "CountryCode",
            "htmlControlType": "text",
            "isVisible": false,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Country Code",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "Weight",
            "htmlControlType": "number",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Weight",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
            "isTotalVisible": true,
            "columnFormat": { format: "number", pattern: "1.1-3" }
        }, {
            "dbColumnName": "Date",
            "htmlControlType": "Date",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
            "columnFormat": { format: "date", pattern: "yMMMd" },
        }, {
            "dbColumnName": "Name",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Name",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "TICKER",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "TICKER",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "index_market_cap",
            "htmlControlType": "number",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Index Market Cap",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
            "columnFormat": { format: "number", pattern: "1.1-2" }
        }, {
            "dbColumnName": "foreign_inclusion_factor",
            "htmlControlType": "number",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Foreign Inclusion Factor",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
            "columnFormat": { format: "number", pattern: "1.1-2" }
        }, {
            "dbColumnName": "price",
            "htmlControlType": "number",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Price",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
            "columnFormat": { format: "number", pattern: "1.1-2" }
        }, {
            "dbColumnName": "Price_ISO_currency_symbol",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Currency",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }]
};
exports.DisplayGridMasterConfig = {
    ChildType: "",
    ShallHideAddButton: true,
    ShallHideDeleteButton: true,
    ChildControlConfig: exports.TheChild,
    PrimaryKeyColumn: "CountryCode",
    ChildGridType: "displayGrid",
    IsScrollableGrid: true,
    ShowFooterRow: true,
    ColumnConfiguration: [{
            "dbColumnName": "RegionCountry",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Region/Country",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
            "isToggleable": true
        }, {
            "dbColumnName": "CountryCode",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": true,
            "isComplexType": false,
            "displayName": "Country Code",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined
        }, {
            "dbColumnName": "ClosingMarketCap",
            "htmlControlType": "number",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Closing Market Cap",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
            "isTotalVisible": true,
            "columnFormat": { format: "currency", pattern: "USD:true:1.2-2" }
        }, {
            "dbColumnName": "Weight",
            "htmlControlType": "number",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "Weight",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
            "isTotalVisible": true,
            "columnFormat": { format: "number", pattern: "1.1-3" }
        }]
};
var FormBuilderConfig = {
    CustomButtons: [
        {
            name: 'Preview',
            value: 'Preview',
            disabled: false,
            visible: true,
            formValidate: true
        }
    ],
    ColumnConfiguration: [
        {
            "dbColumnName": "ReportDate",
            "htmlControlType": "date",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Report Date",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        },
        {
            "dbColumnName": "IndexType",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Index Type",
            "dataSourceAddress": { dbColumnName: "ID", displayColumnName: "Description" },
            "dataSource": [{ ID: "REGION", Description: "REGION" }, { ID: "COUNTRY", Description: "COUNTRY" }],
            "regex": undefined,
        }, {
            "dbColumnName": "Region",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Region",
            "dataSourceAddress": { tableName: "/Application/SqlStatementDetail/MSCIRegionLookup",
                dbColumnName: "value", displayColumnName: "name", defaultValue: [{ Value: "", Name: "" }], dbParameters: { Parameters: [] } },
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "Country",
            "htmlControlType": "customselect",
            "isVisible": false,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Country",
            "dataSourceAddress": { tableName: "/Application/SqlStatementDetail/MSCICountryLookup",
                dbColumnName: "value", displayColumnName: "name", defaultValue: [{ Value: "", Name: "" }], dbParameters: { Parameters: [] } },
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "IndexTypeInclude",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Include Index Type",
            "dataSourceAddress": { dbColumnName: "ID", displayColumnName: "Description" },
            "dataSource": [{ ID: "NONE", Description: "NONE" }, { ID: "REGION", Description: "REGION" }, { ID: "COUNTRY", Description: "COUNTRY" }],
            "regex": undefined,
        }, {
            "dbColumnName": "RegionInclude",
            "htmlControlType": "customselect",
            "isVisible": false,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Include Region",
            "dataSourceAddress": { tableName: "/Application/SqlStatementDetail/MSCIRegionLookup",
                dbColumnName: "value", displayColumnName: "name", defaultValue: [{ Value: "", Name: "" }], dbParameters: { Parameters: [] } },
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "CountryInclude",
            "htmlControlType": "customselect",
            "isVisible": false,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Include Country",
            "dataSourceAddress": { tableName: "/Application/SqlStatementDetail/MSCICountryLookup",
                dbColumnName: "value", displayColumnName: "name", defaultValue: [{ Value: "", Name: "" }], dbParameters: { Parameters: [] } },
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "IndexTypeExclude",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Exclude Index Type",
            "dataSourceAddress": { dbColumnName: "ID", displayColumnName: "Description" },
            "dataSource": [{ ID: "NONE", Description: "NONE" }, { ID: "REGION", Description: "REGION" }, { ID: "COUNTRY", Description: "COUNTRY" }],
            "regex": undefined,
        }, {
            "dbColumnName": "RegionExclude",
            "htmlControlType": "customselect",
            "isVisible": false,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Exclude Region",
            "dataSourceAddress": { tableName: "/Application/SqlStatementDetail/MSCIRegionLookup",
                dbColumnName: "value", displayColumnName: "name", defaultValue: [{ Value: "", Name: "" }], dbParameters: { Parameters: [] } },
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "CountryExclude",
            "htmlControlType": "customselect",
            "isVisible": false,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Exclude Country",
            "dataSourceAddress": { tableName: "/Application/SqlStatementDetail/MSCICountryLookup",
                dbColumnName: "value", displayColumnName: "name", defaultValue: [{ Value: "", Name: "" }], dbParameters: { Parameters: [] } },
            "dataSource": undefined,
            "regex": undefined,
        }
    ],
    RulesConfig: [
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["required", "date"],
            "ruleAssociates": ["ReportDate"],
            "apiObject": undefined
        }, {
            "ruleType": "OneOf",
            "applyTo": "OneOf",
            "ruleName": ["requiredTarget"],
            "ruleValue": { "targets": ["RegionExclude", "CountryExclude"], "ruleFunction": msiValidationFunctions_1.ValidateTargetForExclude },
            "ruleAssociates": ["IndexTypeExclude"],
            "apiObject": undefined
        }, {
            "ruleType": "OneOf",
            "applyTo": "OneOf",
            "ruleName": ["requiredTarget"],
            "ruleValue": { "targets": ["RegionInclude", "CountryInclude"], "ruleFunction": msiValidationFunctions_1.ValidateTargetForInclude },
            "ruleAssociates": ["IndexTypeInclude"],
            "apiObject": undefined
        }
    ]
};
exports.MsciControlConfig = {
    TabsList: [
        {
            TabKey: "OneTab",
            TabName: "OneTab",
            TabControls: [
                {
                    ShowDefault: true,
                    ComponentName: "FormBuilder",
                    PageType: "formbuilder",
                    gridSettings: FormBuilderConfig,
                    PageOperationType: 'dynamicform'
                },
                {
                    ShowDefault: false,
                    ComponentName: "DisplayGrid",
                    PageType: "displaygrid",
                    gridSettings: exports.DisplayGridMasterConfig,
                    PageOperationType: 'view'
                }
            ],
        }
    ]
};
//# sourceMappingURL=msci.config.js.map