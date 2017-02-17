"use strict";
var router_1 = require('@angular/router');
var databaseUploadTool_1 = require("./databaseUploadTool");
var AuthGuard_1 = require("../../../../../../ReusableServices/AuthGuard");
exports.MpdbDatabaseUploadToolRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/ManagedProgramDb/MpdbDatabaseUploadTool', component: databaseUploadTool_1.MpdbDatabaseUploadTool, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=databaseUploadTool.routes.js.map