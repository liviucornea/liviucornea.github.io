"use strict";
var router_1 = require('@angular/router');
var AuthGuard_1 = require("../../../../../../ReusableServices/AuthGuard");
var iRSTradeReport_1 = require("./iRSTradeReport");
exports.IRSTradeReportRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports/Settlement/IRSTradeReport', component: iRSTradeReport_1.IRSTradeReport, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=iRSTradeReport.routes.js.map