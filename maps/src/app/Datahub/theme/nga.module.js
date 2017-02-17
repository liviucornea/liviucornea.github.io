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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var baCard_component_1 = require('./components/baCard/baCard.component');
var baChartistChart_component_1 = require('./components/baChartistChart/baChartistChart.component');
var baAppPicture_pipe_1 = require('./pipes/baAppPicture/baAppPicture.pipe');
var baKameleonPicture_pipe_1 = require('./pipes/baKameleonPicture/baKameleonPicture.pipe');
var baProfilePicture_pipe_1 = require('./pipes/baProfilePicture/baProfilePicture.pipe');
var baImageLoader_service_1 = require('./services/baImageLoader/baImageLoader.service');
var baThemePreloader_service_1 = require('./services/baThemePreloader/baThemePreloader.service');
var baThemeSpinner_service_1 = require('./services/baThemeSpinner/baThemeSpinner.service');
var theme_config_1 = require('./theme.config');
var theme_configProvider_1 = require('./theme.configProvider');
var baCardBlur_directive_1 = require('./components/baCard/baCardBlur.directive');
var NGA_COMPONENTS = [
    baCard_component_1.BaCard,
    baChartistChart_component_1.BaChartistChart
];
var NGA_DIRECTIVES = [
    baCardBlur_directive_1.BaCardBlur
];
var NGA_PIPES = [
    baAppPicture_pipe_1.BaAppPicturePipe,
    baKameleonPicture_pipe_1.BaKameleonPicturePipe,
    baProfilePicture_pipe_1.BaProfilePicturePipe
];
var NGA_SERVICES = [
    baImageLoader_service_1.BaImageLoaderService,
    baThemePreloader_service_1.BaThemePreloader,
    baThemeSpinner_service_1.BaThemeSpinner
];
var NgaModule = (function () {
    function NgaModule() {
    }
    NgaModule = __decorate([
        core_1.NgModule({
            declarations: NGA_DIRECTIVES.concat(NGA_PIPES, NGA_COMPONENTS),
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
            ],
            exports: NGA_PIPES.concat(NGA_DIRECTIVES, NGA_COMPONENTS),
            providers: [
                theme_configProvider_1.BaThemeConfigProvider,
                theme_config_1.BaThemeConfig
            ].concat(NGA_SERVICES)
        }), 
        __metadata('design:paramtypes', [])
    ], NgaModule);
    return NgaModule;
}());
exports.NgaModule = NgaModule;
//# sourceMappingURL=nga.module.js.map