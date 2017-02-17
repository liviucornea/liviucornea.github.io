"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var SharedModule_1 = require("../../../../../../ReusableComponents/SharedModule");
var portfolio_1 = require("./portfolio");
var portfolio_routes_1 = require("./portfolio.routes");
var applicationsComponentsModule_1 = require("../../../aplicationsComponents/applicationsComponentsModule");
var MpdbPortfolioModule = (function () {
    function MpdbPortfolioModule() {
    }
    MpdbPortfolioModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, forms_1.FormsModule, portfolio_routes_1.MpdbPortfolioRouting, applicationsComponentsModule_1.ApplicationsCommonModule
            ],
            declarations: [portfolio_1.MpdbPortfolio],
        }), 
        __metadata('design:paramtypes', [])
    ], MpdbPortfolioModule);
    return MpdbPortfolioModule;
}());
exports.MpdbPortfolioModule = MpdbPortfolioModule;
//# sourceMappingURL=portfolio.module.js.map