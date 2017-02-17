"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var SharedModule_1 = require("../../../../../../ReusableComponents/SharedModule");
var worldGovernmentBondIndex_1 = require("./worldGovernmentBondIndex");
var worldGovernmentBondIndex_routes_1 = require("./worldGovernmentBondIndex.routes");
var BmiWorldGovernmentBondIndexModule = (function () {
    function BmiWorldGovernmentBondIndexModule() {
    }
    BmiWorldGovernmentBondIndexModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, forms_1.FormsModule, worldGovernmentBondIndex_routes_1.BmiWorldGovernmentBondIndexRouting
            ],
            declarations: [worldGovernmentBondIndex_1.BmiWorldGovernmentBondIndex],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], BmiWorldGovernmentBondIndexModule);
    return BmiWorldGovernmentBondIndexModule;
}());
exports.BmiWorldGovernmentBondIndexModule = BmiWorldGovernmentBondIndexModule;
//# sourceMappingURL=worldGovernmentBondIndex.module.js.map