"use strict";
var router_1 = require('@angular/router');
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
var settlement_1 = require("./settlement");
exports.SettlementRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports/Settlement', component: settlement_1.Settlement, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=settlement.routes.js.map