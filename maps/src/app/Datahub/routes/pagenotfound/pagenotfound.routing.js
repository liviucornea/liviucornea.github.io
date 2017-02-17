"use strict";
var router_1 = require('@angular/router');
var pagenotfound_1 = require("./pagenotfound");
var AuthGuard_1 = require("../../../ReusableServices/AuthGuard");
exports.PageNotFoundRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/PageNotFound', component: pagenotfound_1.PageNotFound, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=pagenotfound.routing.js.map