"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var SharedModule_1 = require("../../../ReusableComponents/SharedModule");
var dashboard_routes_1 = require('./dashboard.routes');
var dashboard_component_1 = require('./dashboard.component');
var pieChart_service_1 = require("./pieChart/pieChart.service");
var pieChart_component_1 = require("./pieChart/pieChart.component");
var theme_configProvider_1 = require("../../theme/theme.configProvider");
var nga_module_1 = require('../../theme/nga.module');
var trafficChart_component_1 = require('./trafficChart/trafficChart.component');
var trafficChart_service_1 = require('./trafficChart/trafficChart.service');
var chartistJs_component_1 = require("../charts/components/chartistJs/chartistJs.component");
var chartistJs_service_1 = require('../charts/components/chartistJs/chartistJs.service');
var pipelineSchematicsChart_component_1 = require('./pipelineSchematicsChart/pipelineSchematicsChart.component');
var pipelineSchematicsChart_service_1 = require("./pipelineSchematicsChart/pipelineSchematicsChart.service");
var runningProcesses_component_1 = require("./runningProcesses/runningProcesses.component");
var highlightRunningProcess_directive_1 = require("./runningProcesses/highlightRunningProcess.directive");
var systemInfo_component_1 = require("./systemInfo/systemInfo.component");
var systemInfo_service_1 = require("./systemInfo/systemInfo.service");
var ng2_charts_1 = require('ng2-charts/ng2-charts');
var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                SharedModule_1.SharedModule,
                dashboard_routes_1.DashboardRouting,
                nga_module_1.NgaModule,
                ng2_charts_1.ChartsModule
            ],
            declarations: [
                pieChart_component_1.PieChart,
                trafficChart_component_1.TrafficChart,
                dashboard_component_1.Dashboard,
                pipelineSchematicsChart_component_1.PipeLinesSchematicsChartComponent,
                runningProcesses_component_1.RunningProcessesComponent,
                highlightRunningProcess_directive_1.ProcessHighlightDirective,
                systemInfo_component_1.SystemInfoComponent,
                chartistJs_component_1.ChartistJs
            ],
            providers: [pieChart_service_1.PieChartService, trafficChart_service_1.TrafficChartService, theme_configProvider_1.BaThemeConfigProvider,
                chartistJs_service_1.ChartistJsService, pipelineSchematicsChart_service_1.PipelinesSchematicsChartService,
                systemInfo_service_1.SystemInformationService]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map