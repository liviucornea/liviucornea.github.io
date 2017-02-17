"use strict";
var router_1 = require('@angular/router');
var AuthGuard_1 = require("../../../../../../ReusableServices/AuthGuard");
var lateTradesReport_1 = require("./lateTradesReport");
exports.LateTradesReportRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports/LateTrades/LateTradesReport', component: lateTradesReport_1.LateTradesReport, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=lateTradesreport.routes.js.map