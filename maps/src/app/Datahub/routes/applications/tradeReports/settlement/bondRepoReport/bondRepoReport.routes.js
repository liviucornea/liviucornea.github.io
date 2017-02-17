"use strict";
var router_1 = require('@angular/router');
var AuthGuard_1 = require("../../../../../../ReusableServices/AuthGuard");
var bondRepoReport_1 = require("./bondRepoReport");
exports.BondRepoReportRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports/Settlement/BondRepoReport', component: bondRepoReport_1.BondRepoReport, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=bondRepoReport.routes.js.map