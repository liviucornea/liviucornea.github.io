"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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