"use strict";
var router_1 = require('@angular/router');
var applicationBuilder_1 = require("./applicationBuilder");
var AuthGuard_1 = require("../../../../ReusableServices/AuthGuard");
exports.ApplicationBuilderRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/ApplicationBuilder', component: applicationBuilder_1.ApplicationBuilder, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=applicationBuilder.routing.js.map