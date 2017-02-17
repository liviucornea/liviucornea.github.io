"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var nga_module_1 = require('../../theme/nga.module');
var charts_component_1 = require('./charts.component');
var chartistJs_component_1 = require('./components/chartistJs/chartistJs.component');
var chartistJs_service_1 = require('./components/chartistJs/chartistJs.service');
var ChartsModule = (function () {
    function ChartsModule() {
    }
    ChartsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                nga_module_1.NgaModule
            ],
            declarations: [
                charts_component_1.Charts,
                chartistJs_component_1.ChartistJs
            ],
            providers: [
                chartistJs_service_1.ChartistJsService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ChartsModule);
    return ChartsModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChartsModule;
//# sourceMappingURL=charts.module.js.map