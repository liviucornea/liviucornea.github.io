"use strict";
var router_1 = require('@angular/router');
var applicationsList_1 = require("./applicationsList");
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
exports.ApplicationsListRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/Auth/ApplicationsList', component: applicationsList_1.ApplicationsList, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=applicationsList.routes.js.map