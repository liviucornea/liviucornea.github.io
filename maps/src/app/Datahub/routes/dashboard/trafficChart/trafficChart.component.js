"use strict";
var core_1 = require('@angular/core');
var trafficChart_service_1 = require('./trafficChart.service');
var TrafficChart = (function () {
    function TrafficChart(trafficChartService) {
        this.trafficChartService = trafficChartService;
        this.doughnutData = trafficChartService.getData();
    }
    TrafficChart.prototype.ngAfterViewInit = function () {
        this._loadDoughnutCharts();
    };
    TrafficChart.prototype._loadDoughnutCharts = function () {
        var el = jQuery('.chart-area').get(0);
        /*
            new Chart(el.getContext('2d')).Doughnut(this.doughnutData, {
              segmentShowStroke: false,
              percentageInnerCutout : 64,
              responsive: true
            });
        */
    };
    TrafficChart = __decorate([
        core_1.Component({
            selector: 'traffic-chart',
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [require('./trafficChart.scss')],
            template: require('./trafficChart.html')
        }), 
        __metadata('design:paramtypes', [trafficChart_service_1.TrafficChartService])
    ], TrafficChart);
    return TrafficChart;
}());
exports.TrafficChart = TrafficChart;
//# sourceMappingURL=trafficChart.component.js.map