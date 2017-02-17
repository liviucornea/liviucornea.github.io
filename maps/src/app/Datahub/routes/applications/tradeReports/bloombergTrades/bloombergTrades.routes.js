"use strict";
var router_1 = require('@angular/router');
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
var bloombergTrades_1 = require("./bloombergTrades");
exports.BloombergTradesRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports/BloombergTrades', component: bloombergTrades_1.BloombergTrades, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=bloombergTrades.routes.js.map