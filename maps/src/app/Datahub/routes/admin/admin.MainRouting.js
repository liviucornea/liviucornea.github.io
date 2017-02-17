"use strict";
var router_1 = require('@angular/router');
var admin_1 = require("./admin");
var AuthGuard_1 = require("../../../ReusableServices/AuthGuard");
exports.AdminMainRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin', component: admin_1.Admin, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=admin.MainRouting.js.map