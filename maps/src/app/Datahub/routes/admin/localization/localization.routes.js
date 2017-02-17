"use strict";
var router_1 = require('@angular/router');
var localization_1 = require("./localization");
var AuthGuard_1 = require("../../../../ReusableServices/AuthGuard");
exports.LocalizationRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/Localization', component: localization_1.Localization, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=localization.routes.js.map