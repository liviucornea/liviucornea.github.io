"use strict";
var router_1 = require("@angular/router");
var schematicExecution_1 = require("./schematicExecution");
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
exports.SchematicExecutionRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/Schematic/SchematicExecution', component: schematicExecution_1.SchematicExecution, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=schematicExecution.routing.js.map