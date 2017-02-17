"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var SharedModule_1 = require("../../../../../../ReusableComponents/SharedModule");
var databaseUploadTool_routes_1 = require("./databaseUploadTool.routes");
var databaseUploadTool_1 = require("./databaseUploadTool");
var managedProgramDbService_1 = require("../managedProgramDbService");
var MpdbDatabaseUploadToolModule = (function () {
    function MpdbDatabaseUploadToolModule() {
    }
    MpdbDatabaseUploadToolModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, forms_1.FormsModule, databaseUploadTool_routes_1.MpdbDatabaseUploadToolRouting
            ],
            declarations: [databaseUploadTool_1.MpdbDatabaseUploadTool],
            providers: [managedProgramDbService_1.ManagedProgramDbService]
        }), 
        __metadata('design:paramtypes', [])
    ], MpdbDatabaseUploadToolModule);
    return MpdbDatabaseUploadToolModule;
}());
exports.MpdbDatabaseUploadToolModule = MpdbDatabaseUploadToolModule;
//# sourceMappingURL=databaseUploadTool.module.js.map