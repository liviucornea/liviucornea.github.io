"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var SharedModule_1 = require("../../../../../../ReusableComponents/SharedModule");
var msci_routes_1 = require("./msci.routes");
var msci_1 = require("./msci");
var BmiMsciModule = (function () {
    function BmiMsciModule() {
    }
    BmiMsciModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, forms_1.FormsModule, msci_routes_1.BmiMsciRouting
            ],
            declarations: [msci_1.BmiMsci],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], BmiMsciModule);
    return BmiMsciModule;
}());
exports.BmiMsciModule = BmiMsciModule;
//# sourceMappingURL=msci.module.js.map