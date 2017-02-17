"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require("@angular/platform-browser");
var config_1 = require("./config");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var config_routing_1 = require("./config.routing");
var ConfigModule = (function () {
    function ConfigModule() {
    }
    ConfigModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, config_routing_1.ConfigRouting, SharedModule_1.SharedModule, config_routing_1.ConfigRouting],
            declarations: [config_1.Config],
        }), 
        __metadata('design:paramtypes', [])
    ], ConfigModule);
    return ConfigModule;
}());
exports.ConfigModule = ConfigModule;
//# sourceMappingURL=config.Module.js.map