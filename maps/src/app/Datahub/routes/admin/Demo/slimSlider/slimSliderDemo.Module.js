"use strict";
var core_1 = require('@angular/core');
var slimSliderDemo_routing_1 = require("./slimSliderDemo.routing");
var SlimSliderDemo_1 = require("./SlimSliderDemo");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var AuxComponenetsModule_1 = require("../../../../../ReusableComponents/AuxComponenetsModule");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var SlimSliderDemoModule = (function () {
    function SlimSliderDemoModule() {
    }
    SlimSliderDemoModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, router_1.RouterModule, SharedModule_1.SharedModule, AuxComponenetsModule_1.AuxComponentsModule, slimSliderDemo_routing_1.SlimSliderRoute],
            declarations: [SlimSliderDemo_1.SlimSliderDemo]
        }), 
        __metadata('design:paramtypes', [])
    ], SlimSliderDemoModule);
    return SlimSliderDemoModule;
}());
exports.SlimSliderDemoModule = SlimSliderDemoModule;
//# sourceMappingURL=slimSliderDemo.Module.js.map