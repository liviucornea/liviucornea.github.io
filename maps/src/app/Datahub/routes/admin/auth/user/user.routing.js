"use strict";
var router_1 = require('@angular/router');
var user_1 = require("./user");
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
exports.UserRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/Auth/User', component: user_1.AuthUser, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=user.routing.js.map