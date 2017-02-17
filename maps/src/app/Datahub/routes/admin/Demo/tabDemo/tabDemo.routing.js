System.register(['@angular/router', "./tabDemo", "../../../../../ReusableServices/AuthGuard"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, tabDemo_1, AuthGuard_1;
    var TabDemoRoute;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (tabDemo_1_1) {
                tabDemo_1 = tabDemo_1_1;
            },
            function (AuthGuard_1_1) {
                AuthGuard_1 = AuthGuard_1_1;
            }],
        execute: function() {
            exports_1("TabDemoRoute", TabDemoRoute = router_1.RouterModule.forChild([
                { path: 'Datahub/Admin/Demo/TabDemo', component: tabDemo_1.TabDemo, canActivate: [AuthGuard_1.AuthGuard] }
            ]));
        }
    }
});
//# sourceMappingURL=tabDemo.routing.js.map