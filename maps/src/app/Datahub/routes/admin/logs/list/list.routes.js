System.register(['@angular/router', "./list"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, list_1;
    var ListRouting;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (list_1_1) {
                list_1 = list_1_1;
            }],
        execute: function() {
            exports_1("ListRouting", ListRouting = router_1.RouterModule.forChild([
                { path: 'Datahub/Admin/Logs/List', component: list_1.List }
            ]));
        }
    }
});
//# sourceMappingURL=list.routes.js.map