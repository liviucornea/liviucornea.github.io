"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require("@angular/platform-browser");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var valueSet_1 = require("./valueSet");
var valueSet_routing_1 = require("./valueSet.routing");
var ValueSetModule = (function () {
    function ValueSetModule() {
    }
    ValueSetModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, valueSet_routing_1.ValueSetRouting, SharedModule_1.SharedModule],
            declarations: [valueSet_1.ValueSet],
        }), 
        __metadata('design:paramtypes', [])
    ], ValueSetModule);
    return ValueSetModule;
}());
exports.ValueSetModule = ValueSetModule;
//# sourceMappingURL=valueSet.Module.js.map