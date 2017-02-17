System.register(['@angular/router', "./childTileViewDemo"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, childTileViewDemo_1;
    var ChildTileViewDemoRouting;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (childTileViewDemo_1_1) {
                childTileViewDemo_1 = childTileViewDemo_1_1;
            }],
        execute: function() {
            exports_1("ChildTileViewDemoRouting", ChildTileViewDemoRouting = router_1.RouterModule.forChild([
                { path: 'Datahub/Applications/Tools/TileViewDemo/ChildTileViewDemo', component: childTileViewDemo_1.ChildTileViewDemo }
            ]));
        }
    }
});
//# sourceMappingURL=childTileViewDemo.routes.js.map