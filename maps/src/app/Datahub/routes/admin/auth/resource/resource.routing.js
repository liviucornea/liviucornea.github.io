"use strict";
var router_1 = require('@angular/router');
var resource_1 = require("./resource");
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
exports.ResourceRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/Auth/Resource', component: resource_1.AuthResource, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=resource.routing.js.map