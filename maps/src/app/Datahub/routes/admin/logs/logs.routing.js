System.register(['@angular/router', "./logs"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, logs_1;
    var LogsRouting;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (logs_1_1) {
                logs_1 = logs_1_1;
            }],
        execute: function() {
            exports_1("LogsRouting", LogsRouting = router_1.RouterModule.forChild([
                { path: 'Datahub/Admin/Logs', component: logs_1.Logs }
            ]));
        }
    }
});
//# sourceMappingURL=logs.routing.js.map