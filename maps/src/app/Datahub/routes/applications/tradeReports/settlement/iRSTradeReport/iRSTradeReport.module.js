"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var SharedModule_1 = require("../../../../../../ReusableComponents/SharedModule");
var iRSTradeReport_routes_1 = require("./iRSTradeReport.routes");
var iRSTradeReport_1 = require("./iRSTradeReport");
var IRSTradeReportModule = (function () {
    function IRSTradeReportModule() {
    }
    IRSTradeReportModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, forms_1.FormsModule, iRSTradeReport_routes_1.IRSTradeReportRouting
            ],
            declarations: [iRSTradeReport_1.IRSTradeReport],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], IRSTradeReportModule);
    return IRSTradeReportModule;
}());
exports.IRSTradeReportModule = IRSTradeReportModule;
//# sourceMappingURL=iRSTradeReport.module.js.map