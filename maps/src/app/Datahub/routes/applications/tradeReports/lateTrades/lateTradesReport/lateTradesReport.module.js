"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var SharedModule_1 = require("../../../../../../ReusableComponents/SharedModule");
var lateTradesreport_routes_1 = require("./lateTradesreport.routes");
var lateTradesReport_1 = require("./lateTradesReport");
var LateTradesReportModule = (function () {
    function LateTradesReportModule() {
    }
    LateTradesReportModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, forms_1.FormsModule, lateTradesreport_routes_1.LateTradesReportRouting
            ],
            declarations: [lateTradesReport_1.LateTradesReport],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], LateTradesReportModule);
    return LateTradesReportModule;
}());
exports.LateTradesReportModule = LateTradesReportModule;
//# sourceMappingURL=lateTradesReport.module.js.map