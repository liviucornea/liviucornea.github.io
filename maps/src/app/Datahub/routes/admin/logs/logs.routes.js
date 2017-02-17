"use strict";
var router_1 = require('@angular/router');
var logs_1 = require("./logs");
var AuthGuard_1 = require("../../../../ReusableServices/AuthGuard");
exports.LogsRoutes = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/Logs', component: logs_1.Logs, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=logs.routes.js.map