"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var SharedModule_1 = require("../../../../../../ReusableComponents/SharedModule");
var wilshireIndex_1 = require("./wilshireIndex");
var wilshireIndex_routes_1 = require("./wilshireIndex.routes");
var BmiWilshireIndexModule = (function () {
    function BmiWilshireIndexModule() {
    }
    BmiWilshireIndexModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, forms_1.FormsModule, wilshireIndex_routes_1.BmiWilshireIndexRouting
            ],
            declarations: [wilshireIndex_1.BmiWilshireIndex],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], BmiWilshireIndexModule);
    return BmiWilshireIndexModule;
}());
exports.BmiWilshireIndexModule = BmiWilshireIndexModule;
//# sourceMappingURL=wilshireIndex.module.js.map