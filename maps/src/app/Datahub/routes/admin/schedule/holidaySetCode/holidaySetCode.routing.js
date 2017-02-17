"use strict";
var router_1 = require("@angular/router");
var holidaySetCode_1 = require("./holidaySetCode");
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
exports.HolidaySetCodeRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/Schedule/HolidaySetCode', component: holidaySetCode_1.HolidaySetCode, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=holidaySetCode.routing.js.map