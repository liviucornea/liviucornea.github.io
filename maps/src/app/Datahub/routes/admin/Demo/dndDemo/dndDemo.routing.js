"use strict";
var router_1 = require('@angular/router');
var dndDemo_1 = require("./dndDemo");
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
exports.DnDDemoRoute = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/Demo/DragAndDrop', component: dndDemo_1.DnDDemo, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=dndDemo.routing.js.map