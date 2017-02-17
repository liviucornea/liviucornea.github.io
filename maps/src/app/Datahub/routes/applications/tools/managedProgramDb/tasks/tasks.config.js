"use strict";
var ImportNewAccountsFormBuilderConfig = {
    ColumnConfiguration: [],
    RulesConfig: []
};
var InitiateAutoUploadFormBuilderConfig = {
    ColumnConfiguration: [],
    RulesConfig: []
};
exports.TasksConfig = {
    TabsList: [
        {
            TabKey: "ImportNewAccounts",
            TabName: "Import New Accounts",
            TabControls: [
                {
                    ShowDefault: true,
                    ComponentName: "ImportNewAccountsFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: ImportNewAccountsFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                }
            ],
        }, {
            TabKey: "InitiateAutoUpload",
            TabName: "Initiate Auto Upload",
            TabControls: [
                {
                    ShowDefault: true,
                    ComponentName: "InitiateAutoUploadFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: InitiateAutoUploadFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                }
            ],
        }
    ]
};
//# sourceMappingURL=tasks.config.js.map