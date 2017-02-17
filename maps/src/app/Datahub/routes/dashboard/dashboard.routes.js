"use strict";
var router_1 = require('@angular/router');
var dashboard_component_1 = require('./dashboard.component');
var AuthGuard_1 = require("../../../ReusableServices/AuthGuard");
exports.DashboardRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Dashboard', component: dashboard_component_1.Dashboard, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=dashboard.routes.js.map