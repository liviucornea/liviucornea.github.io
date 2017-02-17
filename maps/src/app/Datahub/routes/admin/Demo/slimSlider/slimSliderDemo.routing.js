"use strict";
var router_1 = require('@angular/router');
var SlimSliderDemo_1 = require("./SlimSliderDemo");
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
exports.SlimSliderRoute = router_1.RouterModule.forChild([
    { path: 'Datahub/Admin/Demo/SlimSlider', component: SlimSliderDemo_1.SlimSliderDemo, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=slimSliderDemo.routing.js.map