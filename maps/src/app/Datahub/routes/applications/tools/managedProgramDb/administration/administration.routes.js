"use strict";
var router_1 = require('@angular/router');
var administration_1 = require("./administration");
var AuthGuard_1 = require("../../../../../../ReusableServices/AuthGuard");
exports.MpdbAdministrationRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/ManagedProgramDb/MpdbAdministration', component: administration_1.MpdbAdministration, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=administration.routes.js.map