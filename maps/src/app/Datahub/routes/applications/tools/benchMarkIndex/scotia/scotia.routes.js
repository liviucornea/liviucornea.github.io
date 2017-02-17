"use strict";
var router_1 = require('@angular/router');
var AuthGuard_1 = require("../../../../../../ReusableServices/AuthGuard");
var scotia_1 = require("./scotia");
exports.BmiScotiaRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/BenchMarkIndex/BmiScotia', component: scotia_1.BmiScotia, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=scotia.routes.js.map