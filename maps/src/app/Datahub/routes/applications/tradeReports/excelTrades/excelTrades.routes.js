"use strict";
var router_1 = require('@angular/router');
var AuthGuard_1 = require("../../../../../ReusableServices/AuthGuard");
var excelTrades_1 = require("./excelTrades");
exports.ExcelTradesRouting = router_1.RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports/ExcelTrades', component: excelTrades_1.ExcelTrades, canActivate: [AuthGuard_1.AuthGuard] }
]);
//# sourceMappingURL=excelTrades.routes.js.map