"use strict";
var router_1 = require('@angular/router');
var home_1 = require("./Datahub/routes/home/home");
var AuthGuard_1 = require("./ReusableServices/AuthGuard");
var pagenotfound_1 = require("./Datahub/routes/pagenotfound/pagenotfound");
exports.routes = [
    { path: '', pathMatch: 'full', redirectTo: 'Datahub/Home' },
    { path: 'Datahub/Home', component: home_1.Home, name: "Home", canActivate: [AuthGuard_1.AuthGuard] },
    { path: 'Datahub', redirectTo: 'Datahub/Home' },
    { path: '**', component: pagenotfound_1.PageNotFound }
];
var appRoutes = exports.routes.slice();
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map