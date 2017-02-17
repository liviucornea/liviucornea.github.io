"use strict";
var core_1 = require('@angular/core');
var managedProgramDb_routes_1 = require("./managedProgramDb.routes");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var managedProgramDb_1 = require("./managedProgramDb");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var administration_module_1 = require("./administration/administration.module");
var analysisConstructionTool_module_1 = require("./analysisConstructionTool/analysisConstructionTool.module");
var databaseUploadTool_module_1 = require("./databaseUploadTool/databaseUploadTool.module");
var reports_module_1 = require("./reports/reports.module");
var tasks_module_1 = require("./tasks/tasks.module");
var portfolio_module_1 = require("./portfolio/portfolio.module");
var ManagedProgramDbModule = (function () {
    function ManagedProgramDbModule() {
    }
    ManagedProgramDbModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, managedProgramDb_routes_1.ManagedProgramDbRouting,
                administration_module_1.MpdbAdministrationModule, analysisConstructionTool_module_1.MpdbAnalysisConstructionToolModule, databaseUploadTool_module_1.MpdbDatabaseUploadToolModule,
                portfolio_module_1.MpdbPortfolioModule, reports_module_1.MpdbReportsModule, tasks_module_1.MpdbTasksModule
            ],
            declarations: [managedProgramDb_1.ManagedProgramDb],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], ManagedProgramDbModule);
    return ManagedProgramDbModule;
}());
exports.ManagedProgramDbModule = ManagedProgramDbModule;
//# sourceMappingURL=managedProgramDb.module.js.map