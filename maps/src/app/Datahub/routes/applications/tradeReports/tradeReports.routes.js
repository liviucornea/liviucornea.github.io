"use strict";
var router_1 = require('@angular/router');
var AuthGuard_1 = require("../../../../ReusableServices/AuthGuard");
var tradeReports_1 = require("./tradeReports");
exports.TradeReportsRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports', component: tradeReports_1.TradeReports, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=tradeReports.routes.js.map