"use strict";
var router_1 = require('@angular/router');
var AuthGuard_1 = require("../../../../../../ReusableServices/AuthGuard");
var postingsByDateTrader_1 = require("./postingsByDateTrader");
exports.PostingsByDateTraderRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports/ExcelTrades/PostingsByDateTrader', component: postingsByDateTrader_1.PostingsByDateTrader, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=postingsByDateTrader.routes.js.map