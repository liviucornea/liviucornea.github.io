"use strict";
var router_1 = require('@angular/router');
var userProfile_component_1 = require('./userProfile.component');
var AuthGuard_1 = require('../../../ReusableServices/AuthGuard');
exports.UserProfileRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/UserProfile', component: userProfile_component_1.UserProfile, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=userProfile.routes.js.map