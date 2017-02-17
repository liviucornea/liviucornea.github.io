"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var tools_1 = require("./tools");
var tools_routes_1 = require("./tools.routes");
var bloombergAIM_module_1 = require("./bloombergAIM/bloombergAIM.module");
var managedProgramDb_module_1 = require("./managedProgramDb/managedProgramDb.module");
var benchMarkIndex_module_1 = require("./benchMarkIndex/benchMarkIndex.module");
var ToolsModule = (function () {
    function ToolsModule() {
    }
    ToolsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, tools_routes_1.ToolsRouting, benchMarkIndex_module_1.BenchMarkIndexModule,
                bloombergAIM_module_1.BloombergAIMModule, managedProgramDb_module_1.ManagedProgramDbModule
            ],
            declarations: [tools_1.Tools],
        }), 
        __metadata('design:paramtypes', [])
    ], ToolsModule);
    return ToolsModule;
}());
exports.ToolsModule = ToolsModule;
//# sourceMappingURL=tools.module.js.map