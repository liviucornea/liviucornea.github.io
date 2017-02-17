"use strict";
var router_1 = require("@angular/router");
var valueSet_1 = require("./valueSet");
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
exports.ValueSetRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/Localization/ValueSet', component: valueSet_1.ValueSet, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=valueSet.routing.js.map