"use strict";
var router_1 = require('@angular/router');
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
var lateTrades_1 = require("./lateTrades");
exports.LateTradesRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports/LateTrades', component: lateTrades_1.LateTrades, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=lateTrades.routes.js.map