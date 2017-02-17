"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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