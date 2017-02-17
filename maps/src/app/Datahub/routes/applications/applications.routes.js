"use strict";
var router_1 = require('@angular/router');
var applications_1 = require("./applications");
var AuthGuard_1 = require("../../../ReusableServices/AuthGuard");
exports.ApplicationsMainRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications', component: applications_1.Applications, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=applications.routes.js.map