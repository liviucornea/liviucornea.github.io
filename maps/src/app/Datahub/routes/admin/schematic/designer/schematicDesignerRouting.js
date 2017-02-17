"use strict";
var router_1 = require("@angular/router");
var schematicDesigner_1 = require("./schematicDesigner");
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
exports.SchematicDesignerRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/Schematic/SchematicDesigner', component: schematicDesigner_1.SchematicDesigner, canActivate: [AuthGuard_1.AuthGuard] },
    { path: 'Datahub/Admin/Schematic/SchematicDesigner/:id', component: schematicDesigner_1.SchematicDesigner, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=schematicDesignerRouting.js.map