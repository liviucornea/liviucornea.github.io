"use strict";
var core_1 = require('@angular/core');
var pieChart_service_1 = require('./pieChart.service');
require('./pieChart.loader.ts');
var PieChart = (function () {
    function PieChart(_pieChartService) {
        this._pieChartService = _pieChartService;
        this._init = false;
        this.charts = this._pieChartService.getData();
    }
    PieChart.prototype.ngAfterViewInit = function () {
        if (!this._init) {
            this._loadPieCharts();
            this._updatePieCharts();
            this._init = true;
        }
    };
    PieChart.prototype._loadPieCharts = function () {
        jQuery('.chart').each(function () {
            var chart = jQuery(this);
            chart['easyPieChart']({
                easing: 'easeOutBounce',
                onStep: function (from, to, percent) {
                    jQuery(this.el).find('.percent').text(Math.round(percent));
                },
                barColor: jQuery(this).attr('data-rel'),
                trackColor: 'rgba(0,0,0,0)',
                size: 84,
                scaleLength: 0,
                animation: 2000,
                lineWidth: 9,
                lineCap: 'round',
            });
        });
    };
    PieChart.prototype._updatePieCharts = function () {
        var getRandomArbitrary = function (min, max) { return Math.random() * (max - min) + min; };
        jQuery('.pie-charts .chart').each(function (index, chart) {
            jQuery(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
        });
    };
    PieChart = __decorate([
        core_1.Component({
            selector: 'pie-chart',
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [require('./pieChart.scss')],
            template: require('./pieChart.html')
        }), 
        __metadata('design:paramtypes', [pieChart_service_1.PieChartService])
    ], PieChart);
    return PieChart;
}());
exports.PieChart = PieChart;
//# sourceMappingURL=pieChart.component.js.map