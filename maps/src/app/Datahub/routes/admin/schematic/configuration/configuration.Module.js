"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require("@angular/platform-browser");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var configuration_1 = require("./configuration");
var configuration_routing_1 = require("./configuration.routing");
var ConfigurationModule = (function () {
    function ConfigurationModule() {
    }
    ConfigurationModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, SharedModule_1.SharedModule, configuration_routing_1.ConfigurationRouting],
            declarations: [configuration_1.Configuration],
        }), 
        __metadata('design:paramtypes', [])
    ], ConfigurationModule);
    return ConfigurationModule;
}());
exports.ConfigurationModule = ConfigurationModule;
//# sourceMappingURL=configuration.Module.js.map