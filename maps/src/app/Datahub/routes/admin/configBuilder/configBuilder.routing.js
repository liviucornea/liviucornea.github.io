"use strict";
var router_1 = require('@angular/router');
var configBuilder_1 = require("./configBuilder");
var AuthGuard_1 = require("../../../../ReusableServices/AuthGuard");
exports.ConfigBuilderRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/configBuilder', component: configBuilder_1.ConfigBuilder, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=configBuilder.routing.js.map