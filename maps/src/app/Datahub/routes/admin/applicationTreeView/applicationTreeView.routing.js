"use strict";
var router_1 = require('@angular/router');
var applicationTreeView_1 = require("./applicationTreeView");
var AuthGuard_1 = require("../../../../ReusableServices/AuthGuard");
exports.ApplicationTreeViewRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/ApplicationTreeView', component: applicationTreeView_1.ApplicationTreeView, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=applicationTreeView.routing.js.map