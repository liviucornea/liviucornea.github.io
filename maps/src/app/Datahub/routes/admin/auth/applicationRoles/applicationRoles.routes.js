System.register(['@angular/router', "../../../../../ReusableServices/AuthGuard", "./applicationRoles"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, AuthGuard_1, applicationRoles_1;
    var ApplicationRolesRouting;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (AuthGuard_1_1) {
                AuthGuard_1 = AuthGuard_1_1;
            },
            function (applicationRoles_1_1) {
                applicationRoles_1 = applicationRoles_1_1;
            }],
        execute: function() {
            exports_1("ApplicationRolesRouting", ApplicationRolesRouting = router_1.RouterModule.forChild([
                { path: 'Datahub/Admin/Auth/ApplicationRoles', component: applicationRoles_1.ApplicationRoles, canActivate: [AuthGuard_1.AuthGuard] }
            ]));
        }
    }
});
//# sourceMappingURL=applicationRoles.routes.js.map