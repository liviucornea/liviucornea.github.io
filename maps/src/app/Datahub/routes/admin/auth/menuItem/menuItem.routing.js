"use strict";
var router_1 = require('@angular/router');
var menuItem_1 = require("./menuItem");
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
exports.MenuItemRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/Auth/MenuItem', component: menuItem_1.MenuItem, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=menuItem.routing.js.map