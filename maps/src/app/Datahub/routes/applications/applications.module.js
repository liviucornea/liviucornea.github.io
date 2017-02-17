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