"use strict";
var router_1 = require('@angular/router');
var exceptionReports_1 = require("./exceptionReports");
var AuthGuard_1 = require("../../../../ReusableServices/AuthGuard");
exports.ExceptionReportsRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/ExceptionReports', component: exceptionReports_1.ExceptionReports, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=exceptionReports.routes.js.map