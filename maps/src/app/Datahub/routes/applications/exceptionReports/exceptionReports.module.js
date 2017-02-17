"use strict";
var exceptionReports_1 = require("./exceptionReports");
var exceptionReports_routes_1 = require("./exceptionReports.routes");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var SharedModule_1 = require("../../../../ReusableComponents/SharedModule");
var ExceptionReportsModule = (function () {
    function ExceptionReportsModule() {
    }
    ExceptionReportsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, SharedModule_1.SharedModule, forms_1.FormsModule, exceptionReports_routes_1.ExceptionReportsRouting
            ],
            declarations: [exceptionReports_1.ExceptionReports]
        }), 
        __metadata('design:paramtypes', [])
    ], ExceptionReportsModule);
    return ExceptionReportsModule;
}());
exports.ExceptionReportsModule = ExceptionReportsModule;
//# sourceMappingURL=exceptionReports.module.js.map