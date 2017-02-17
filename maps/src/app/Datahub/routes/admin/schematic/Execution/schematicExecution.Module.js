"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require("@angular/platform-browser");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var schematicExecution_routing_1 = require("./schematicExecution.routing");
var schematicExecution_1 = require("./schematicExecution");
var forms_1 = require("@angular/forms");
var schematicpreview_1 = require('../schematicpreview/schematicpreview');
var SchematicExecutionModule = (function () {
    function SchematicExecutionModule() {
    }
    SchematicExecutionModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, SharedModule_1.SharedModule, schematicExecution_routing_1.SchematicExecutionRouting],
            declarations: [schematicExecution_1.SchematicExecution, schematicpreview_1.SchematicPreview],
        }), 
        __metadata('design:paramtypes', [])
    ], SchematicExecutionModule);
    return SchematicExecutionModule;
}());
exports.SchematicExecutionModule = SchematicExecutionModule;
//# sourceMappingURL=schematicExecution.Module.js.map