"use strict";
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var editPortfolio_1 = require("./editPortfolio/editPortfolio");
var core_1 = require("@angular/core");
var portfolio_pipe_1 = require("./editPortfolio/portfolio.pipe");
var SharedModule_1 = require("../../../../ReusableComponents/SharedModule");
var ApplicationsCommonModule = (function () {
    function ApplicationsCommonModule() {
    }
    ApplicationsCommonModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, forms_1.FormsModule, http_1.HttpModule, SharedModule_1.SharedModule
            ],
            exports: [
                editPortfolio_1.EditPortfolio, portfolio_pipe_1.PortfolioFilter
            ],
            declarations: [
                editPortfolio_1.EditPortfolio, portfolio_pipe_1.PortfolioFilter
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ApplicationsCommonModule);
    return ApplicationsCommonModule;
}());
exports.ApplicationsCommonModule = ApplicationsCommonModule;
//# sourceMappingURL=applicationsComponentsModule.js.map