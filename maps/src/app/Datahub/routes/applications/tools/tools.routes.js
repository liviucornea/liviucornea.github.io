"use strict";
var router_1 = require('@angular/router');
var tools_1 = require("./tools");
var AuthGuard_1 = require("../../../../ReusableServices/AuthGuard");
exports.ToolsRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/Tools', component: tools_1.Tools, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=tools.routes.js.map