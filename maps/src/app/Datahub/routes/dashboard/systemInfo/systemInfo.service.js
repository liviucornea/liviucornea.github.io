"use strict";
var core_1 = require('@angular/core');
var httpAbstract_1 = require("../../../../ReusableServices/httpAbstract");
var SystemInformationService = (function () {
    function SystemInformationService(httpServ) {
        this.httpServ = httpServ;
        this.systemMonitoring = '/monitoring';
    }
    SystemInformationService.prototype.getSystemMonitoringInfo = function () {
        return this.httpServ.fetch(this.systemMonitoring);
    };
    SystemInformationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [httpAbstract_1.HttpAbstract])
    ], SystemInformationService);
    return SystemInformationService;
}());
exports.SystemInformationService = SystemInformationService;
//# sourceMappingURL=systemInfo.service.js.map