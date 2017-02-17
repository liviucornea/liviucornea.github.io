"use strict";
exports.ForeignKeyBuilderConfig = {
    ColumnConfiguration: [
        {
            "dbColumnName": "tableName",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": true,
            "isComplexType": false,
            "displayName": "Foreign Table Name",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": "",
            "isAllowGridLevelEdit": false,
            "isToggleable": false,
        },
        {
            "dbColumnName": "dbColumnName",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": true,
            "isComplexType": false,
            "displayName": " ForeignKey Column Name",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": "",
            "isAllowGridLevelEdit": false,
            "isToggleable": false,
        },
        {
            "dbColumnName": "displayColumnName",
            "htmlControlType": "text",
            "isVisible": true,
            "isRequired": true,
            "isComplexType": false,
            "displayName": "Display Column Name",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": "",
            "isAllowGridLevelEdit": false,
            "isToggleable": false,
        }]
};
//# sourceMappingURL=foreignKeyBuilder.js.map