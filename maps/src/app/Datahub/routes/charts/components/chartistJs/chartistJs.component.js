"use strict";
var core_1 = require('@angular/core');
var chartistJs_service_1 = require('./chartistJs.service');
var displayGridFilterService_1 = require("../../../../../ReusableComponents/displayGrid/displayGridFilterService");
var ChartistJs = (function () {
    function ChartistJs(_chartistJsService, filterService) {
        this._chartistJsService = _chartistJsService;
        this.filterService = filterService;
    }
    ChartistJs.prototype.ngOnInit = function () {
        this.data = this._chartistJsService.getAll();
    };
    ChartistJs.prototype.getResponsive = function (padding, offset) {
        return this._chartistJsService.getResponsive(padding, offset);
    };
    ChartistJs.prototype.doFilterBy = function (strFilter) {
        // alert('You filetered by:' + strFilter);
        if (strFilter === 'ALL') {
            this.filterService.doFilterBy.next({ filterName: 'Status', filterValue: '' });
        }
        else {
            this.filterService.doFilterBy.next({ filterName: 'Status', filterValue: strFilter });
        }
    };
    ChartistJs = __decorate([
        core_1.Component({
            selector: 'chartist-js',
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [require('../../../../../../../node_modules/chartist/dist/chartist.css'), require('./chartistJs.scss')],
            template: require('./chartistJs.html')
        }), 
        __metadata('design:paramtypes', [chartistJs_service_1.ChartistJsService, displayGridFilterService_1.DisplayGridFilterService])
    ], ChartistJs);
    return ChartistJs;
}());
exports.ChartistJs = ChartistJs;
//# sourceMappingURL=chartistJs.component.js.map