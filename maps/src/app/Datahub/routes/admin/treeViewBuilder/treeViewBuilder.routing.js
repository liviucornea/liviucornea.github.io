System.register(['@angular/router', "./treeViewBuilder"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, treeViewBuilder_1;
    var TreeViewBuilderRouting;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (treeViewBuilder_1_1) {
                treeViewBuilder_1 = treeViewBuilder_1_1;
            }],
        execute: function() {
            exports_1("TreeViewBuilderRouting", TreeViewBuilderRouting = router_1.RouterModule.forChild([
                { path: 'Datahub/Admin/treeViewBuilder', component: treeViewBuilder_1.TreeViewBuilder }
            ]));
        }
    }
});
//# sourceMappingURL=treeViewBuilder.routing.js.map