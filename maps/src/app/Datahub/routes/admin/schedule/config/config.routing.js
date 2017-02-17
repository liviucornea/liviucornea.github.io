"use strict";
var config_1 = require("./config");
var router_1 = require("@angular/router");
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
exports.ConfigRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/Schedule/Config', component: config_1.Config, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=config.routing.js.map