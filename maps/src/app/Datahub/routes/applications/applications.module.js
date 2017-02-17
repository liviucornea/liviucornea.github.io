"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var applications_1 = require("./applications");
var applications_routes_1 = require("./applications.routes");
var tools_module_1 = require("./tools/tools.module");
var exceptionReports_module_1 = require("./exceptionReports/exceptionReports.module");
var tradesReports_module_1 = require("./tradeReports/tradesReports.module");
var applicationsComponentsModule_1 = require("./aplicationsComponents/applicationsComponentsModule");
var ApplicationsModule = (function () {
    function ApplicationsModule() {
    }
    ApplicationsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, applications_routes_1.ApplicationsMainRouting, tools_module_1.ToolsModule, exceptionReports_module_1.ExceptionReportsModule, tradesReports_module_1.TradeReportsModule, applicationsComponentsModule_1.ApplicationsCommonModule
            ],
            declarations: [applications_1.Applications],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], ApplicationsModule);
    return ApplicationsModule;
}());
exports.ApplicationsModule = ApplicationsModule;
//# sourceMappingURL=applications.module.js.map