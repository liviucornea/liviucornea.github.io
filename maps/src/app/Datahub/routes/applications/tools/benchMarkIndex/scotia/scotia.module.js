"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var SharedModule_1 = require("../../../../../../ReusableComponents/SharedModule");
var scotia_routes_1 = require("./scotia.routes");
var scotia_1 = require("./scotia");
var BmiScotiaModule = (function () {
    function BmiScotiaModule() {
    }
    BmiScotiaModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, forms_1.FormsModule, scotia_routes_1.BmiScotiaRouting
            ],
            declarations: [scotia_1.BmiScotia],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], BmiScotiaModule);
    return BmiScotiaModule;
}());
exports.BmiScotiaModule = BmiScotiaModule;
//# sourceMappingURL=scotia.module.js.map