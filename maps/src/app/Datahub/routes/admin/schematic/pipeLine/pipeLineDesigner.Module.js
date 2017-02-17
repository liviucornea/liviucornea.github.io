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
var platform_browser_1 = require("@angular/platform-browser");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var pipelineDesignerRouting_1 = require("./pipelineDesignerRouting");
var forms_1 = require("@angular/forms");
var pipeLineDesigner_1 = require("./pipeLineDesigner");
var Schematics_pipe_1 = require("./Schematics.pipe");
var PipelineDesignerModule = (function () {
    function PipelineDesignerModule() {
    }
    PipelineDesignerModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, SharedModule_1.SharedModule, pipelineDesignerRouting_1.PipelineDesignerRouting],
            declarations: [pipeLineDesigner_1.PipeLineDesigner, Schematics_pipe_1.SchematicFilter],
        }), 
        __metadata('design:paramtypes', [])
    ], PipelineDesignerModule);
    return PipelineDesignerModule;
}());
exports.PipelineDesignerModule = PipelineDesignerModule;
//# sourceMappingURL=pipeLineDesigner.Module.js.map