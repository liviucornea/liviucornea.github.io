"use strict";
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var displayGrid_1 = require("../../../../ReusableComponents/displayGrid/displayGrid");
var logsControlConfig_1 = require("./logsControlConfig");
var adminApiService_1 = require("../adminApiService");
var Logs = (function () {
    function Logs(adminApiService) {
        this.adminApiService = adminApiService;
        this.controlConfig = logsControlConfig_1.LogsControlConfig;
    }
    Logs.prototype.ngAfterViewInit = function () {
        this.refreshLogs();
    };
    Logs.prototype.refreshLogs = function () {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.adminApiService, "logs");
    };
    __decorate([
        core_2.ViewChild(displayGrid_1.DisplayGridComponent), 
        __metadata('design:type', displayGrid_1.DisplayGridComponent)
    ], Logs.prototype, "dataTable", void 0);
    Logs = __decorate([
        core_1.Component({
            selector: 'logs',
            template: "<div><displayGrid></displayGrid></div>"
        }), 
        __metadata('design:paramtypes', [adminApiService_1.AdminApiService])
    ], Logs);
    return Logs;
}());
exports.Logs = Logs;
//# sourceMappingURL=logs.js.map