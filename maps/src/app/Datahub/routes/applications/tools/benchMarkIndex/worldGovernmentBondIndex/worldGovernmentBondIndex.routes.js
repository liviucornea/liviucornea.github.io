"use strict";
var router_1 = require('@angular/router');
var AuthGuard_1 = require("../../../../../../ReusableServices/AuthGuard");
var worldGovernmentBondIndex_1 = require("./worldGovernmentBondIndex");
exports.BmiWorldGovernmentBondIndexRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/BenchMarkIndex/BmiWorldGovernmentBondIndex', component: worldGovernmentBondIndex_1.BmiWorldGovernmentBondIndex, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=worldGovernmentBondIndex.routes.js.map