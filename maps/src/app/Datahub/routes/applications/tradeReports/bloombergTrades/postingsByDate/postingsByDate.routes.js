"use strict";
var router_1 = require('@angular/router');
var AuthGuard_1 = require("../../../../../../ReusableServices/AuthGuard");
var postingsByDate_1 = require("./postingsByDate");
exports.PostingsByDateRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports/BloombergTrades/PostingsByDate', component: postingsByDate_1.PostingsByDate, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=postingsByDate.routes.js.map