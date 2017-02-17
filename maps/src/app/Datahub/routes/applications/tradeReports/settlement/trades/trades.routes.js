"use strict";
var router_1 = require('@angular/router');
var AuthGuard_1 = require("../../../../../../ReusableServices/AuthGuard");
var trades_1 = require("./trades");
exports.TradesRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports/Settlement/Trades', component: trades_1.Trades, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=trades.routes.js.map