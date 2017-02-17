"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require("@angular/platform-browser");
var dndDemo_1 = require("./dndDemo");
var dndDemo_routing_1 = require("./dndDemo.routing");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var AuxComponenetsModule_1 = require("../../../../../ReusableComponents/AuxComponenetsModule");
var DnDDemoModule = (function () {
    function DnDDemoModule() {
    }
    DnDDemoModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, dndDemo_routing_1.DnDDemoRoute, SharedModule_1.SharedModule, AuxComponenetsModule_1.AuxComponentsModule],
            declarations: [dndDemo_1.DnDDemo]
        }), 
        __metadata('design:paramtypes', [])
    ], DnDDemoModule);
    return DnDDemoModule;
}());
exports.DnDDemoModule = DnDDemoModule;
//# sourceMappingURL=dndDemo.Module.js.map