System.register(['@angular/router', "./pia"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, pia_1;
    var MpdbPIARouting;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (pia_1_1) {
                pia_1 = pia_1_1;
            }],
        execute: function() {
            exports_1("MpdbPIARouting", MpdbPIARouting = router_1.RouterModule.forChild([
                { path: 'Datahub/Applications/Tools/ManagedProgramDb/MpdbPIA', component: pia_1.MpdbPIA }
            ]));
        }
    }
});
//# sourceMappingURL=pia.routes.js.map