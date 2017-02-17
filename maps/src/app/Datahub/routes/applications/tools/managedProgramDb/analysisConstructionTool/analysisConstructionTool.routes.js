"use strict";
var router_1 = require('@angular/router');
var analysisConstructionTool_1 = require("./analysisConstructionTool");
var AuthGuard_1 = require("../../../../../../ReusableServices/AuthGuard");
exports.MpdbAnalysisConstructionToolRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/ManagedProgramDb/MpdbAnalysisConstructionTool', component: analysisConstructionTool_1.MpdbAnalysisConstructionTool, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=analysisConstructionTool.routes.js.map