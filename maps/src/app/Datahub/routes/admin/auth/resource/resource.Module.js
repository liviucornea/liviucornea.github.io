"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require("@angular/platform-browser");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var resource_1 = require("./resource");
var resource_routing_1 = require("./resource.routing");
var ResourceModule = (function () {
    function ResourceModule() {
    }
    ResourceModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, resource_routing_1.ResourceRouting, SharedModule_1.SharedModule],
            declarations: [resource_1.AuthResource],
        }), 
        __metadata('design:paramtypes', [])
    ], ResourceModule);
    return ResourceModule;
}());
exports.ResourceModule = ResourceModule;
//# sourceMappingURL=resource.Module.js.map