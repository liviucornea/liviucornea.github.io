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
//import {BaThemeConfigProvider, colorHelper} from '../../../theme';
var theme_configProvider_1 = require('../../../theme/theme.configProvider');
var theme_constants_1 = require('../../../theme/theme.constants');
var TrafficChartService = (function () {
    function TrafficChartService(_baConfig) {
        this._baConfig = _baConfig;
    }
    TrafficChartService.prototype.getData = function () {
        var dashboardColors = this._baConfig.get().colors.dashboard;
        return [
            {
                value: 2000,
                color: dashboardColors.red,
                highlight: theme_constants_1.colorHelper.shade(dashboardColors.surfieGreen, 15),
                label: 'Scheduled but not run yet',
                percentage: 87,
                order: 1,
            }, {
                value: 1500,
                color: dashboardColors.gossip,
                highlight: theme_constants_1.colorHelper.shade(dashboardColors.gossip, 15),
                label: 'Finished',
                percentage: 22,
                order: 4,
            }, {
                value: 1000,
                color: dashboardColors.silverTree,
                highlight: theme_constants_1.colorHelper.shade(dashboardColors.silverTree, 15),
                label: 'Pipelines',
                percentage: 70,
                order: 3,
            }, {
                value: 1200,
                color: dashboardColors.surfieGreen,
                highlight: theme_constants_1.colorHelper.shade(dashboardColors.surfieGreen, 15),
                label: 'Schematics',
                percentage: 38,
                order: 2,
            }, {
                value: 400,
                color: dashboardColors.blueStone,
                highlight: theme_constants_1.colorHelper.shade(dashboardColors.blueStone, 15),
                label: 'Finished with warnings',
                percentage: 17,
                order: 0,
            },
        ];
    };
    TrafficChartService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [theme_configProvider_1.BaThemeConfigProvider])
    ], TrafficChartService);
    return TrafficChartService;
}());
exports.TrafficChartService = TrafficChartService;
//# sourceMappingURL=trafficChart.service.js.map