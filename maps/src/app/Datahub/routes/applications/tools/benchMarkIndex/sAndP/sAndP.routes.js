"use strict";
var router_1 = require('@angular/router');
var AuthGuard_1 = require("../../../../../../ReusableServices/AuthGuard");
var sAndP_1 = require("./sAndP");
exports.BmiSandPRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/BenchMarkIndex/BmiSandP', component: sAndP_1.BmiSandP, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=sAndP.routes.js.map