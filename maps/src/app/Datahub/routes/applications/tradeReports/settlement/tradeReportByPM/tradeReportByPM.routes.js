"use strict";
var router_1 = require('@angular/router');
var AuthGuard_1 = require("../../../../../../ReusableServices/AuthGuard");
var tradeReportByPM_1 = require("./tradeReportByPM");
exports.TradeReportByPMRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports/Settlement/TradeReportByPM', component: tradeReportByPM_1.TradeReportByPM, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=tradeReportByPM.routes.js.map