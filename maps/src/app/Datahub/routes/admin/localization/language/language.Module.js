"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require("@angular/platform-browser");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var language_1 = require("./language");
var language_routing_1 = require("./language.routing");
var LanguageModule = (function () {
    function LanguageModule() {
    }
    LanguageModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, language_routing_1.LanguageRouting, SharedModule_1.SharedModule],
            declarations: [language_1.Language],
        }), 
        __metadata('design:paramtypes', [])
    ], LanguageModule);
    return LanguageModule;
}());
exports.LanguageModule = LanguageModule;
//# sourceMappingURL=language.Module.js.map