"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require("@angular/platform-browser");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var schematicDesigner_1 = require("./schematicDesigner");
var schematicDesignerRouting_1 = require("./schematicDesignerRouting");
var forms_1 = require("@angular/forms");
var SchematicDesignerModule = (function () {
    function SchematicDesignerModule() {
    }
    SchematicDesignerModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, SharedModule_1.SharedModule, schematicDesignerRouting_1.SchematicDesignerRouting],
            declarations: [schematicDesigner_1.SchematicDesigner],
        }), 
        __metadata('design:paramtypes', [])
    ], SchematicDesignerModule);
    return SchematicDesignerModule;
}());
exports.SchematicDesignerModule = SchematicDesignerModule;
//# sourceMappingURL=schematicDesigner.Module.js.map