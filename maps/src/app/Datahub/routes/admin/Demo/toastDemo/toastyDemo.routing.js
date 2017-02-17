"use strict";
var router_1 = require('@angular/router');
var toastyDemo_1 = require("./toastyDemo");
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
exports.ToastDemoRoute = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/Demo/ToastDemo', component: toastyDemo_1.ToastDemo, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=toastyDemo.routing.js.map