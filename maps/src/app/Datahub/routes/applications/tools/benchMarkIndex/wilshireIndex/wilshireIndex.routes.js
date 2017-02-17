"use strict";
var router_1 = require('@angular/router');
var AuthGuard_1 = require("../../../../../../ReusableServices/AuthGuard");
var wilshireIndex_1 = require("./wilshireIndex");
exports.BmiWilshireIndexRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/BenchMarkIndex/BmiWilshireIndex', component: wilshireIndex_1.BmiWilshireIndex, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=wilshireIndex.routes.js.map