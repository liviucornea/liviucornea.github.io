"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var SharedModule_1 = require("../../../../../../ReusableComponents/SharedModule");
var bmoNesbittBurnsIndex_1 = require("./bmoNesbittBurnsIndex");
var bmoNesbittBurnsIndex_routes_1 = require("./bmoNesbittBurnsIndex.routes");
var BmiBMONesbittBurnsIndexModule = (function () {
    function BmiBMONesbittBurnsIndexModule() {
    }
    BmiBMONesbittBurnsIndexModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, forms_1.FormsModule, bmoNesbittBurnsIndex_routes_1.BmiBMONesbittBurnsIndexRouting
            ],
            declarations: [bmoNesbittBurnsIndex_1.BmiBMONesbittBurnsIndex],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], BmiBMONesbittBurnsIndexModule);
    return BmiBMONesbittBurnsIndexModule;
}());
exports.BmiBMONesbittBurnsIndexModule = BmiBMONesbittBurnsIndexModule;
//# sourceMappingURL=bmoNesbittBurnsIndex.module.js.map