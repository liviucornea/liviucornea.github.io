"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require("@angular/platform-browser");
var applicationBuilder_1 = require("./applicationBuilder");
var applicationBuilder_routing_1 = require("./applicationBuilder.routing");
var SharedModule_1 = require("../../../../ReusableComponents/SharedModule");
var forms_1 = require("@angular/forms");
var ApplicationBuilderModule = (function () {
    function ApplicationBuilderModule() {
    }
    ApplicationBuilderModule = __decorate([
        core_1.NgModule({
            imports: [forms_1.FormsModule, platform_browser_1.BrowserModule, applicationBuilder_routing_1.ApplicationBuilderRouting, SharedModule_1.SharedModule],
            declarations: [applicationBuilder_1.ApplicationBuilder],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], ApplicationBuilderModule);
    return ApplicationBuilderModule;
}());
exports.ApplicationBuilderModule = ApplicationBuilderModule;
//# sourceMappingURL=applicationBuilder.Module.js.map