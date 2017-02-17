"use strict";
var router_1 = require('@angular/router');
var reports_1 = require("./reports");
var AuthGuard_1 = require("../../../../../../ReusableServices/AuthGuard");
exports.MpdbReportsRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/ManagedProgramDb/MpdbReports', component: reports_1.MpdbReports, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=reports.routes.js.map