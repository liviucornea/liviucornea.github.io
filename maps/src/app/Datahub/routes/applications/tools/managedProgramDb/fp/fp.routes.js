System.register(['@angular/router', "./fp"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, fp_1;
    var MpdbFPRouting;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (fp_1_1) {
                fp_1 = fp_1_1;
            }],
        execute: function() {
            exports_1("MpdbFPRouting", MpdbFPRouting = router_1.RouterModule.forChild([
                { path: 'Datahub/Applications/Tools/ManagedProgramDb/MpdbFP', component: fp_1.MpdbFP }
            ]));
        }
    }
});
//# sourceMappingURL=fp.routes.js.map