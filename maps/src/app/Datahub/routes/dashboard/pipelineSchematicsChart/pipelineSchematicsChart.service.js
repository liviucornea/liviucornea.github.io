"use strict";
var core_1 = require('@angular/core');
var httpAbstract_1 = require("../../../../ReusableServices/httpAbstract");
var theme_configProvider_1 = require('../../../theme/theme.configProvider');
var PipelinesSchematicsChartService = (function () {
    function PipelinesSchematicsChartService(_baConfig, httpServ) {
        this._baConfig = _baConfig;
        this.httpServ = httpServ;
        this.dashBoardURL = '/dashboard';
        this._data = {
            processesData: {
                labels: [],
                series: [],
                legendItems: []
            },
            processesOptions: {
                fullWidth: true,
                donut: true,
                showLabel: true,
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
    PipelinesSchematicsChartService.prototype.getScheduledProcesses = function () {
        return this.httpServ.fetch(this.dashBoardURL + '/scheduled');
    };
    PipelinesSchematicsChartService.prototype.getRunningProcesses = function () {
        return this.httpServ.fetch(this.dashBoardURL + '/running');
    };
    PipelinesSchematicsChartService.prototype.getColorThresholds = function () {
        return this.httpServ.fetch('/application/configuration/SchematicThresholds');
    };
    PipelinesSchematicsChartService.prototype.getHistoryProcesses = function () {
        return this.httpServ.fetch(this.dashBoardURL + '/history');
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
        core_1.Injectable(), 
        __metadata('design:paramtypes', [theme_configProvider_1.BaThemeConfigProvider, httpAbstract_1.HttpAbstract])
    ], PipelinesSchematicsChartService);
    return PipelinesSchematicsChartService;
}());
exports.PipelinesSchematicsChartService = PipelinesSchematicsChartService;
var LegendItem = (function () {
    function LegendItem(label, percentage, order, color, value) {
        this.label = label;
        this.percentage = percentage;
        this.order = order;
        this.color = color;
        this.value = value;
    }
    return LegendItem;
}());
exports.LegendItem = LegendItem;
/*
 simpleDonutData: {
 labels: ['Aborted', 'Completed', 'Scheduled'],
 series: [30, 60, 70],
 legendItems: [
 {
 value: 2000,
 color: 'black',
 label: 'Aborted',
 percentage: 50,
 order: 1,
 }, {
 value: 2000,
 color: 'black',
 label: 'Completed',
 percentage: 40,
 order: 4,
 }, {
 value: 2000,
 color: 'black',
 label: 'Scheduled',
 percentage: 95,
 order: 3,
 }
 ]
 }

 */ 
//# sourceMappingURL=pipelineSchematicsChart.service.js.map