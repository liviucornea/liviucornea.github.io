"use strict";
var router_1 = require('@angular/router');
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
var globalLink_1 = require("./globalLink");
exports.GlobalLinkRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports/GlobalLink', component: globalLink_1.GlobalLink, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=globalLink.routes.js.map