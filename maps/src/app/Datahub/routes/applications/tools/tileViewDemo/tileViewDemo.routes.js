System.register(['@angular/router', "./tileViewDemo"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, tileViewDemo_1;
    var TileViewDemoRouting;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (tileViewDemo_1_1) {
                tileViewDemo_1 = tileViewDemo_1_1;
            }],
        execute: function() {
            exports_1("TileViewDemoRouting", TileViewDemoRouting = router_1.RouterModule.forChild([
                { path: 'Datahub/Applications/Tools/TileViewDemo', component: tileViewDemo_1.TileViewDemo }
            ]));
        }
    }
});
//# sourceMappingURL=tileViewDemo.routes.js.map