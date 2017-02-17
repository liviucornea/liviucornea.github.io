"use strict";
var router_1 = require('@angular/router');
var schedule_1 = require("./schedule");
var AuthGuard_1 = require("../../../../ReusableServices/AuthGuard");
exports.ScheduleRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/Schedule', component: schedule_1.Schedule, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=schedule.routes.js.map