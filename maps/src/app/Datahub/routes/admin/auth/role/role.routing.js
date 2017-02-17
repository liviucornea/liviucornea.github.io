"use strict";
var router_1 = require('@angular/router');
var role_1 = require("./role");
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
exports.RoleRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/Auth/Role', component: role_1.AuthRole, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=role.routing.js.map