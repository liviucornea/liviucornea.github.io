"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var SharedModule_1 = require("../../../../../../ReusableComponents/SharedModule");
var riskAnalyticsBenchmarks_routes_1 = require("./riskAnalyticsBenchmarks.routes");
var riskAnalyticsBenchmarks_1 = require("./riskAnalyticsBenchmarks");
var BmiRiskAnalyticsBenchmarksModule = (function () {
    function BmiRiskAnalyticsBenchmarksModule() {
    }
    BmiRiskAnalyticsBenchmarksModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, forms_1.FormsModule, riskAnalyticsBenchmarks_routes_1.BmiRiskAnalyticsBenchmarksRouting
            ],
            declarations: [riskAnalyticsBenchmarks_1.BmiRiskAnalyticsBenchmarks],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], BmiRiskAnalyticsBenchmarksModule);
    return BmiRiskAnalyticsBenchmarksModule;
}());
exports.BmiRiskAnalyticsBenchmarksModule = BmiRiskAnalyticsBenchmarksModule;
//# sourceMappingURL=riskAnalyticsBenchmarks.module.js.map