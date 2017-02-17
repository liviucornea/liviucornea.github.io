System.register(['@angular/core', "../Datahub/routes/logs/list/logsControlConfig", "../Datahub/routes/auth/role/roleControlConfig", "../Datahub/routes/auth/resource/resourceControlConfig", "../Datahub/routes/auth/user/userControlConfig", "../Datahub/routes/auth/notificationAlert/notificationAlertControlConfig", "../Datahub/routes/applications/tools/benchMarkIndex/benchMarkIndexConfig", "../Datahub/routes/schematic/configuration/configurationControlConfig", "../Datahub/routes/schematic/designer/schematicDesignerConfig", "../Datahub/routes/schedule/config/controlConfig", "../Datahub/routes/schedule/holiday/holidayControlConfig", "../Datahub/routes/schedule/holidaySetCode/holidaySetCodeConfig"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, logsControlConfig_1, roleControlConfig_1, resourceControlConfig_1, userControlConfig_1, notificationAlertControlConfig_1, benchMarkIndexConfig_1, configurationControlConfig_1, schematicDesignerConfig_1, controlConfig_1, holidayControlConfig_1, holidaySetCodeConfig_1;
    var ComponentsConfigService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (logsControlConfig_1_1) {
                logsControlConfig_1 = logsControlConfig_1_1;
            },
            function (roleControlConfig_1_1) {
                roleControlConfig_1 = roleControlConfig_1_1;
            },
            function (resourceControlConfig_1_1) {
                resourceControlConfig_1 = resourceControlConfig_1_1;
            },
            function (userControlConfig_1_1) {
                userControlConfig_1 = userControlConfig_1_1;
            },
            function (notificationAlertControlConfig_1_1) {
                notificationAlertControlConfig_1 = notificationAlertControlConfig_1_1;
            },
            function (benchMarkIndexConfig_1_1) {
                benchMarkIndexConfig_1 = benchMarkIndexConfig_1_1;
            },
            function (configurationControlConfig_1_1) {
                configurationControlConfig_1 = configurationControlConfig_1_1;
            },
            function (schematicDesignerConfig_1_1) {
                schematicDesignerConfig_1 = schematicDesignerConfig_1_1;
            },
            function (controlConfig_1_1) {
                controlConfig_1 = controlConfig_1_1;
            },
            function (holidayControlConfig_1_1) {
                holidayControlConfig_1 = holidayControlConfig_1_1;
            },
            function (holidaySetCodeConfig_1_1) {
                holidaySetCodeConfig_1 = holidaySetCodeConfig_1_1;
            }],
        execute: function() {
            ComponentsConfigService = (function () {
                function ComponentsConfigService() {
                    this.LogsControlConfig = logsControlConfig_1.LogsControlConfig;
                    this.AuthRoleControlConfig = roleControlConfig_1.RoleParentChildControlConfig;
                    this.AuthResourceControlConfig = resourceControlConfig_1.ResourceParentChildControlConfig;
                    this.AuthUserControlConfig = userControlConfig_1.UserControlConfig;
                    this.NotificationAlertControlConfig = notificationAlertControlConfig_1.NotificationAlertControlConfig;
                    this.BenchMarkIndexControlConfig = benchMarkIndexConfig_1.BenchMarkIndexControlConfig;
                    this.ConfigunitControlConfig = configurationControlConfig_1.configunitControlConfig;
                    this.ProcessDesignerConfig = schematicDesignerConfig_1.ProcessDesignerConfig;
                    this.ScheduleConfigControlConfig = controlConfig_1.ControlConfig;
                    this.HolidayControlConfig = holidayControlConfig_1.HolidayControlConfig;
                    this.HolidaySetCodeControlConfig = holidaySetCodeConfig_1.HolidaySetCodeControlConfig;
                }
                ComponentsConfigService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ComponentsConfigService);
                return ComponentsConfigService;
            }());
            exports_1("ComponentsConfigService", ComponentsConfigService);
            ;
        }
    }
});
//# sourceMappingURL=componentsConfigService.js.map