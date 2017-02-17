"use strict";
var router_1 = require('@angular/router');
var bloombergAIM_1 = require("./bloombergAIM");
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
exports.BloombergAIMRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/BloombergAIM', component: bloombergAIM_1.BloombergAIM, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=bloombergAIM.routes.js.map