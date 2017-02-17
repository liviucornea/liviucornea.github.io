"use strict";
var router_1 = require('@angular/router');
var accessdenied_1 = require("./accessdenied");
var AuthGuard_1 = require("../../../ReusableServices/AuthGuard");
exports.AccessDeniedRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/AccessDenied', component: accessdenied_1.AccessDenied, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=accessdenied.routing.js.map