System.register(['@angular/router', "./pic"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, pic_1;
    var MpdbPICRouting;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (pic_1_1) {
                pic_1 = pic_1_1;
            }],
        execute: function() {
            exports_1("MpdbPICRouting", MpdbPICRouting = router_1.RouterModule.forChild([
                { path: 'Datahub/Applications/Tools/ManagedProgramDb/MpdbPIC', component: pic_1.MpdbPIC }
            ]));
        }
    }
});
//# sourceMappingURL=pic.routes.js.map