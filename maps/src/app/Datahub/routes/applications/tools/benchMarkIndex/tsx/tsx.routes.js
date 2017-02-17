"use strict";
var router_1 = require('@angular/router');
var AuthGuard_1 = require("../../../../../../ReusableServices/AuthGuard");
var tsx_1 = require("./tsx");
exports.BmiTsxRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/BenchMarkIndex/BmiTsx', component: tsx_1.BmiTsx, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=tsx.routes.js.map