"use strict";
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