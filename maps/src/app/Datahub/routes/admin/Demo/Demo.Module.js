"use strict";
var core_1 = require('@angular/core');
var SharedModule_1 = require("../../../../ReusableComponents/SharedModule");
var AuxComponenetsModule_1 = require("../../../../ReusableComponents/AuxComponenetsModule");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var Demo_1 = require("./Demo");
var Demo_routing_1 = require("./Demo.routing");
var toastyDemo_Module_1 = require("./toastDemo/toastyDemo.Module");
var dndDemo_Module_1 = require("./dndDemo/dndDemo.Module");
var slimSliderDemo_Module_1 = require("./slimSlider/slimSliderDemo.Module");
var DemoModule = (function () {
    function DemoModule() {
    }
    DemoModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, router_1.RouterModule, SharedModule_1.SharedModule, AuxComponenetsModule_1.AuxComponentsModule, Demo_routing_1.DemoRoute, slimSliderDemo_Module_1.SlimSliderDemoModule, dndDemo_Module_1.DnDDemoModule, toastyDemo_Module_1.ToastDemoModule],
            declarations: [Demo_1.Demo]
        }), 
        __metadata('design:paramtypes', [])
    ], DemoModule);
    return DemoModule;
}());
exports.DemoModule = DemoModule;
//# sourceMappingURL=Demo.Module.js.map