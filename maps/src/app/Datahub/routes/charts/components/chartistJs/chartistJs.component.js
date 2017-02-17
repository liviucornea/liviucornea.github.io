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