"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var SharedModule_1 = require("../../../../../../ReusableComponents/SharedModule");
var tasks_1 = require("./tasks");
var tasks_rotes_1 = require("./tasks.rotes");
var MpdbTasksModule = (function () {
    function MpdbTasksModule() {
    }
    MpdbTasksModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, forms_1.FormsModule, tasks_rotes_1.MpdbTasksRouting
            ],
            declarations: [tasks_1.MpdbTasks],
        }), 
        __metadata('design:paramtypes', [])
    ], MpdbTasksModule);
    return MpdbTasksModule;
}());
exports.MpdbTasksModule = MpdbTasksModule;
//# sourceMappingURL=tasks.module.js.map