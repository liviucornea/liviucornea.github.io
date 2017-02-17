"use strict";
var router_1 = require('@angular/router');
var auth_1 = require("./auth");
var AuthGuard_1 = require("../../../../ReusableServices/AuthGuard");
exports.AuthRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/Auth', component: auth_1.Auth, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=auth.routes.js.map