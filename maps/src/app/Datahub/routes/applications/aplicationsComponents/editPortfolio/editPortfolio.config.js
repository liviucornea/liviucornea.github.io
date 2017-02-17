"use strict";
exports.PortfolioComponentConfig = {
    CustomButtons: [
        {
            name: 'OpenChangeForm',
            value: 'Open Change Form',
            disabled: false,
            visible: true,
            formValidate: false
        }, {
            name: 'Reset',
            value: 'Reset',
            disabled: false,
            visible: true,
            formValidate: false
        }, {
            name: 'Update',
            value: 'Update',
            disabled: false,
            visible: true,
            formValidate: true
        }
    ],
    ColumnConfiguration: [
        {
            "dbColumnName": "Search",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Search",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "PortfolioNumber",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "PortfolioNumber",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "PortfolioName",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "PortfolioName",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "PortfolioManager",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "IA Code",
            "dataSourceAddress": { tableName: "/Application/SqlStatementDetail/ManagedProgramDB_Lookup",
                dbColumnName: "id", displayColumnName: "name",
                dbParameters: { Parameters: [{ Name: "@type", Value: 3 }, { Name: "@GroupId", Value: 421 }, { Name: "@LoginName", Value: "ghindg2" }] } },
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "ProjectedAUM",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "ProjectedAUM",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "InceptionDate",
            "htmlControlType": "date",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "InceptionDate",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }, {
            "dbColumnName": "Notes",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Notes",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        }
    ],
    RulesConfig: []
};
//# sourceMappingURL=editPortfolio.config.js.map