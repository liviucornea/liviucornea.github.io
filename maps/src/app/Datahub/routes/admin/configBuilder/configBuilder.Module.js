"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require("@angular/platform-browser");
var SharedModule_1 = require("../../../../ReusableComponents/SharedModule");
var configBuilder_1 = require("./configBuilder");
var configBuilder_routing_1 = require("./configBuilder.routing");
var configBuilderAddEditForm_1 = require("./configBuilderAddEditForm/configBuilderAddEditForm");
var forms_1 = require("@angular/forms");
var ConfigBuilderModule = (function () {
    function ConfigBuilderModule() {
    }
    ConfigBuilderModule = __decorate([
        core_1.NgModule({
            imports: [forms_1.FormsModule, platform_browser_1.BrowserModule, configBuilder_routing_1.ConfigBuilderRouting, SharedModule_1.SharedModule],
            declarations: [configBuilder_1.ConfigBuilder, configBuilderAddEditForm_1.configBuilderAddEditForm],
        }), 
        __metadata('design:paramtypes', [])
    ], ConfigBuilderModule);
    return ConfigBuilderModule;
}());
exports.ConfigBuilderModule = ConfigBuilderModule;
//# sourceMappingURL=configBuilder.Module.js.map