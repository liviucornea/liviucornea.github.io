System.register(['@angular/router', "./home"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, home_1;
    var HomeRouting;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (home_1_1) {
                home_1 = home_1_1;
            }],
        execute: function() {
            exports_1("HomeRouting", HomeRouting = router_1.RouterModule.forChild([
                { path: 'home', component: home_1.Home }
            ]));
        }
    }
});
//# sourceMappingURL=home.routing.js.map