"use strict";
var router_1 = require('@angular/router');
var AuthGuard_1 = require("../../../../../../ReusableServices/AuthGuard");
var riskAnalyticsBenchmarks_1 = require("./riskAnalyticsBenchmarks");
exports.BmiRiskAnalyticsBenchmarksRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/BenchMarkIndex/BmiRiskAnalyticsBenchmarks', component: riskAnalyticsBenchmarks_1.BmiRiskAnalyticsBenchmarks, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=riskAnalyticsBenchmarks.routes.js.map