"use strict";
var router_1 = require('@angular/router');
var AuthGuard_1 = require("../../../../../../ReusableServices/AuthGuard");
var bmoNesbittBurnsIndex_1 = require("./bmoNesbittBurnsIndex");
exports.BmiBMONesbittBurnsIndexRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/BenchMarkIndex/BmiBMONesbittBurnsIndex', component: bmoNesbittBurnsIndex_1.BmiBMONesbittBurnsIndex, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=bmoNesbittBurnsIndex.routes.js.map