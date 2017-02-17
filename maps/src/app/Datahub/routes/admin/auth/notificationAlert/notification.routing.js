"use strict";
var router_1 = require('@angular/router');
var notificationAlert_1 = require("./notificationAlert");
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
exports.NotificationRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/Auth/NotificationAlert', component: notificationAlert_1.NotificationAlert, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=notification.routing.js.map