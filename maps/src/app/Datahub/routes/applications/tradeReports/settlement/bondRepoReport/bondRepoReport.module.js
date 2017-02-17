"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var SharedModule_1 = require("../../../../../../ReusableComponents/SharedModule");
var bondRepoReport_routes_1 = require("./bondRepoReport.routes");
var bondRepoReport_1 = require("./bondRepoReport");
var BondRepoReportModule = (function () {
    function BondRepoReportModule() {
    }
    BondRepoReportModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, forms_1.FormsModule, bondRepoReport_routes_1.BondRepoReportRouting
            ],
            declarations: [bondRepoReport_1.BondRepoReport],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], BondRepoReportModule);
    return BondRepoReportModule;
}());
exports.BondRepoReportModule = BondRepoReportModule;
//# sourceMappingURL=bondRepoReport.module.js.map