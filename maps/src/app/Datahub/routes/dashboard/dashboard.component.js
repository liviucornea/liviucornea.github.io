"use strict";
var core_1 = require('@angular/core');
var displayGrid_1 = require("../../../ReusableComponents/displayGrid/displayGrid");
var logsControlConfig_1 = require("../admin/logs/logsControlConfig");
var adminApiService_1 = require("../admin/adminApiService");
var Dashboard = (function () {
    function Dashboard(apiService) {
        this.apiService = apiService;
        this.controlConfig = logsControlConfig_1.LogsControlConfig;
    }
    Dashboard.prototype.ngAfterViewInit = function () {
        this.refreshLogs();
    };
    Dashboard.prototype.refreshLogs = function () {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.apiService, "logs");
    };
    __decorate([
        core_1.ViewChild(displayGrid_1.DisplayGridComponent), 
        __metadata('design:type', displayGrid_1.DisplayGridComponent)
    ], Dashboard.prototype, "dataTable", void 0);
    Dashboard = __decorate([
        core_1.Component({
            selector: 'dashboard',
            encapsulation: core_1.ViewEncapsulation.None,
            template: require('./dashboard.html')
        }), 
        __metadata('design:paramtypes', [adminApiService_1.AdminApiService])
    ], Dashboard);
    return Dashboard;
}());
exports.Dashboard = Dashboard;
//# sourceMappingURL=dashboard.component.js.map