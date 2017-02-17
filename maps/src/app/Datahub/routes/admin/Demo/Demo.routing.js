"use strict";
var router_1 = require('@angular/router');
var Demo_1 = require("./Demo");
var AuthGuard_1 = require("../../../../ReusableServices/AuthGuard");
exports.DemoRoute = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/Demo', component: Demo_1.Demo, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=Demo.routing.js.map