"use strict";
var AdminFormBuilderConfig = {
    ColumnConfiguration: [],
    RulesConfig: []
};
var LockdownFormBuilderConfig = {
    ColumnConfiguration: [],
    RulesConfig: []
};
var ConstructionToolFormBuilderConfig = {
    ColumnConfiguration: [],
    RulesConfig: []
};
exports.AnalysisConstructionToolConfig = {
    TabsList: [
        {
            TabKey: "Admin",
            TabName: "Administration",
            TabControls: [
                {
                    ShowDefault: true,
                    ComponentName: "AdminFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: AdminFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                }
            ],
        }, {
            TabKey: "Lockdown",
            TabName: "Lockdown",
            TabControls: [
                {
                    ShowDefault: true,
                    ComponentName: "LockdownFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: LockdownFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                }
            ],
        }, {
            TabKey: "ConstructionTool",
            TabName: "Portfolio Analysis and Construction Tool",
            TabControls: [
                {
                    ShowDefault: true,
                    ComponentName: "ConstructionToolFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: ConstructionToolFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                }
            ],
        }
    ]
};
//# sourceMappingURL=analysisConstructionTool.config.js.map