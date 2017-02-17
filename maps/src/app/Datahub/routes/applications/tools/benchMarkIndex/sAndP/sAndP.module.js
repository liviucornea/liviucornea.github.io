"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var SharedModule_1 = require("../../../../../../ReusableComponents/SharedModule");
var sAndP_routes_1 = require("./sAndP.routes");
var sAndP_1 = require("./sAndP");
var BmiSandPModule = (function () {
    function BmiSandPModule() {
    }
    BmiSandPModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, forms_1.FormsModule, sAndP_routes_1.BmiSandPRouting
            ],
            declarations: [sAndP_1.BmiSandP],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], BmiSandPModule);
    return BmiSandPModule;
}());
exports.BmiSandPModule = BmiSandPModule;
//# sourceMappingURL=sAndP.module.js.map