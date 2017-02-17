"use strict";
var router_1 = require("@angular/router");
var language_1 = require("./language");
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
exports.LanguageRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/Localization/Language', component: language_1.Language, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=language.routing.js.map