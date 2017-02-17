"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var benchMarkIndex_routes_1 = require("./benchMarkIndex.routes");
var worldGovernmentBondIndex_module_1 = require("./worldGovernmentBondIndex/worldGovernmentBondIndex.module");
var tsx_module_1 = require("./tsx/tsx.module");
var sAndP_module_1 = require("./sAndP/sAndP.module");
var riskAnalyticsBenchmarks_module_1 = require("./riskAnalyticsBenchmarks/riskAnalyticsBenchmarks.module");
var scotia_module_1 = require("./scotia/scotia.module");
var msci_module_1 = require("./msci/msci.module");
var benchMarkIndex_1 = require("./benchMarkIndex");
var wilshireIndex_module_1 = require("./wilshireIndex/wilshireIndex.module");
var bmoNesbittBurnsIndex_module_1 = require("./bmoNesbittBurnsIndex/bmoNesbittBurnsIndex.module");
var BenchMarkIndexModule = (function () {
    function BenchMarkIndexModule() {
    }
    BenchMarkIndexModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, benchMarkIndex_routes_1.BenchMarkIndexRouting,
                bmoNesbittBurnsIndex_module_1.BmiBMONesbittBurnsIndexModule, msci_module_1.BmiMsciModule, riskAnalyticsBenchmarks_module_1.BmiRiskAnalyticsBenchmarksModule, sAndP_module_1.BmiSandPModule,
                wilshireIndex_module_1.BmiWilshireIndexModule, scotia_module_1.BmiScotiaModule, tsx_module_1.BmiTsxModule, worldGovernmentBondIndex_module_1.BmiWorldGovernmentBondIndexModule
            ],
            declarations: [benchMarkIndex_1.BenchMarkIndex],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], BenchMarkIndexModule);
    return BenchMarkIndexModule;
}());
exports.BenchMarkIndexModule = BenchMarkIndexModule;
//# sourceMappingURL=benchMarkIndex.module.js.map