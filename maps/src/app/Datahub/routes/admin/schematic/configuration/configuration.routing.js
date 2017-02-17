"use strict";
var router_1 = require("@angular/router");
var configuration_1 = require("./configuration");
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
exports.ConfigurationRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/Schematic/Configuration', component: configuration_1.Configuration, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=configuration.routing.js.map