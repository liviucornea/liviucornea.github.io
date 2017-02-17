"use strict";
var router_1 = require("@angular/router");
var schematic_1 = require("./schematic");
var AuthGuard_1 = require("../../../../ReusableServices/AuthGuard");
exports.SchematicRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/Schematic', component: schematic_1.Schematic, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=schematic.routes.js.map