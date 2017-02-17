"use strict";
var router_1 = require('@angular/router');
var home_1 = require("./home");
var AuthGuard_1 = require("../../../ReusableServices/AuthGuard");
exports.HomeRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Home', component: home_1.Home, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=home.routing.js.map