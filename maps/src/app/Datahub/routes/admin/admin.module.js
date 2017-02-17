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
var admin_1 = require("./admin");
var logs_Module_1 = require("./logs/logs.Module");
var auth_mainModule_1 = require("./auth/auth.mainModule");
var configBuilder_Module_1 = require("./configBuilder/configBuilder.Module");
var applicationBuilder_Module_1 = require("./applicationBuilder/applicationBuilder.Module");
var admin_MainRouting_1 = require("./admin.MainRouting");
var schedule_Module_1 = require("./schedule/schedule.Module");
var schematic_Module_1 = require("./schematic/schematic.Module");
var applicationTreeView_Module_1 = require("./applicationTreeView/applicationTreeView.Module");
var localization_Module_1 = require("./localization/localization.Module");
var Demo_Module_1 = require("./Demo/Demo.Module");
var adminApiService_1 = require("./adminApiService");
var settings_module_1 = require("./settings/settings.module");
var AdminModule = (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, admin_MainRouting_1.AdminMainRouting,
                schedule_Module_1.ScheduleModule, logs_Module_1.LogsModule, applicationBuilder_Module_1.ApplicationBuilderModule,
                auth_mainModule_1.AuthModule, applicationTreeView_Module_1.ApplicationTreeViewModule, configBuilder_Module_1.ConfigBuilderModule,
                schematic_Module_1.SchematicModule, localization_Module_1.LocalizationModule, Demo_Module_1.DemoModule, settings_module_1.SettingModule
            ],
            declarations: [admin_1.Admin],
            providers: [adminApiService_1.AdminApiService]
        }), 
        __metadata('design:paramtypes', [])
    ], AdminModule);
    return AdminModule;
}());
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map