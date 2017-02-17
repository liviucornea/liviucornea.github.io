"use strict";
var router_1 = require('@angular/router');
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
var benchMarkIndex_1 = require("./benchMarkIndex");
exports.BenchMarkIndexRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/BenchMarkIndex', component: benchMarkIndex_1.BenchMarkIndex, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=benchMarkIndex.routes.js.map