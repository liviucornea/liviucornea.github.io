"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var SharedModule_1 = require("../../../../../../ReusableComponents/SharedModule");
var reports_routes_1 = require("./reports.routes");
var reports_1 = require("./reports");
var managedProgramDbService_1 = require("../managedProgramDbService");
var MpdbReportsModule = (function () {
    function MpdbReportsModule() {
    }
    MpdbReportsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, forms_1.FormsModule, SharedModule_1.SharedModule, reports_routes_1.MpdbReportsRouting
            ],
            declarations: [reports_1.MpdbReports],
            providers: [managedProgramDbService_1.ManagedProgramDbService]
        }), 
        __metadata('design:paramtypes', [])
    ], MpdbReportsModule);
    return MpdbReportsModule;
}());
exports.MpdbReportsModule = MpdbReportsModule;
//# sourceMappingURL=reports.module.js.map