"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var PipelinesSchematicsChartService = (function () {
    function PipelinesSchematicsChartService(_baConfig) {
        this._baConfig = _baConfig;
        this._data = {
            simpleDonutData: {
                labels: ['ALL', 'Aborted', 'Completed', 'Initialized'],
                series: [25, 25, 25, 25],
                legendItems: [
                    {
                        value: 2000,
                        color: 'black',
                        label: 'ALL',
                        percentage: 25,
                        order: 1,
                    }, {
                        value: 2000,
                        color: 'black',
                        label: 'Aborted',
                        percentage: 25,
                        order: 4,
                    }, {
                        value: 2000,
                        color: 'black',
                        label: 'Initialized',
                        percentage: 25,
                        order: 3,
                    }, {
                        value: 2000,
                        color: 'black',
                        label: 'Completed',
                        percentage: 25,
                        order: 3,
                    }
                ]
            },
            simpleDonutOptions: {
                fullWidth: true,
                donut: true,
                height: '300px',
                weight: '300px',
                labelDirection: 'explode',
                labelInterpolationFnc: function (value) {
                    return value[0];
                }
            },
        };
    }
    PipelinesSchematicsChartService.prototype.getAll = function () {
        return this._data;
    };
    PipelinesSchematicsChartService.prototype.getResponsive = function (padding, offset) {
        return [
            ['screen and (min-width: 1550px)', {
                    chartPadding: padding,
                    labelOffset: offset,
                    labelDirection: 'explode',
                    labelInterpolationFnc: function (value) {
                        return value;
                    }
                }],
            ['screen and (max-width: 1200px)', {
                    chartPadding: padding,
                    labelOffset: offset,
                    labelDirection: 'explode',
                    labelInterpolationFnc: function (value) {
                        return value;
                    }
                }],
            ['screen and (max-width: 600px)', {
                    chartPadding: 0,
                    labelOffset: 0,
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }]
        ];
    };
    PipelinesSchematicsChartService = __decorate([
        core_1.Injectable()
    ], PipelinesSchematicsChartService);
    return PipelinesSchematicsChartService;
}());
exports.PipelinesSchematicsChartService = PipelinesSchematicsChartService;
