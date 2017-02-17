"use strict";
var router_1 = require("@angular/router");
var holiday_1 = require("./holiday");
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
exports.HolidayRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/Schedule/Holiday', component: holiday_1.Holiday, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=holiday.routing.js.map