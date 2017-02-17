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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var SharedModule_1 = require("../../../../ReusableComponents/SharedModule");
var schematic_routes_1 = require("./schematic.routes");
var schematic_1 = require("./schematic");
var schematicService_1 = require("./schematicService");
var schematicDesigner_Module_1 = require('./designer/schematicDesigner.Module');
var configuration_Module_1 = require('./configuration/configuration.Module');
var schematicExecution_Module_1 = require('./Execution/schematicExecution.Module');
var pipeLineDesigner_Module_1 = require('./pipeLine/pipeLineDesigner.Module');
var SchematicModule = (function () {
    function SchematicModule() {
    }
    SchematicModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, schematic_routes_1.SchematicRouting, configuration_Module_1.ConfigurationModule, schematicDesigner_Module_1.SchematicDesignerModule, schematicExecution_Module_1.SchematicExecutionModule, pipeLineDesigner_Module_1.PipelineDesignerModule
            ],
            declarations: [schematic_1.Schematic],
            providers: [schematicService_1.SchematicApiService]
        }), 
        __metadata('design:paramtypes', [])
    ], SchematicModule);
    return SchematicModule;
}());
exports.SchematicModule = SchematicModule;
//# sourceMappingURL=schematic.Module.js.map