"use strict";
var router_1 = require("@angular/router");
var pipeLineDesigner_1 = require("./pipeLineDesigner");
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
exports.PipelineDesignerRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/Schematic/Pipeline', component: pipeLineDesigner_1.PipeLineDesigner, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=pipelineDesignerRouting.js.map