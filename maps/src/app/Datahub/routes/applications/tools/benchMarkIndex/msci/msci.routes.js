"use strict";
var router_1 = require('@angular/router');
var AuthGuard_1 = require("../../../../../../ReusableServices/AuthGuard");
var msci_1 = require("./msci");
exports.BmiMsciRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/BenchMarkIndex/BmiMsci', component: msci_1.BmiMsci, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=msci.routes.js.map