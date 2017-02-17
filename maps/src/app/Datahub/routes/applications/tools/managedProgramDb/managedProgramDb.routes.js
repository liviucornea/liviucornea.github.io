"use strict";
var router_1 = require('@angular/router');
var managedProgramDb_1 = require("./managedProgramDb");
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
exports.ManagedProgramDbRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/ManagedProgramDb', component: managedProgramDb_1.ManagedProgramDb, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=managedProgramDb.routes.js.map