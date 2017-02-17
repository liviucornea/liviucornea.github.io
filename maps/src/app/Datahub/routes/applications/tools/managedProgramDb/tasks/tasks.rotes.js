"use strict";
var router_1 = require('@angular/router');
var tasks_1 = require("./tasks");
var AuthGuard_1 = require("../../../../../../ReusableServices/AuthGuard");
exports.MpdbTasksRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/ManagedProgramDb/MpdbTasks', component: tasks_1.MpdbTasks, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=tasks.rotes.js.map