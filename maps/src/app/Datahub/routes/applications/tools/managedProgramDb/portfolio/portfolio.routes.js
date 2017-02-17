"use strict";
var router_1 = require('@angular/router');
var AuthGuard_1 = require("../../../../../../ReusableServices/AuthGuard");
var portfolio_1 = require("./portfolio");
exports.MpdbPortfolioRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/ManagedProgramDb/MpdbPortfolio', component: portfolio_1.MpdbPortfolio, canActivate: [AuthGuard_1.AuthGuard] },
    { path: 'Datahub/Applications/Tools/ManagedProgramDb/MpdbPortfolio/:id', component: portfolio_1.MpdbPortfolio, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=portfolio.routes.js.map