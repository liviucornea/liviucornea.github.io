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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var toastyDemo_1 = require("./toastyDemo");
var toastyDemo_routing_1 = require("./toastyDemo.routing");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var AuxComponenetsModule_1 = require("../../../../../ReusableComponents/AuxComponenetsModule");
var ToastDemoModule = (function () {
    function ToastDemoModule() {
    }
    ToastDemoModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, router_1.RouterModule, SharedModule_1.SharedModule, AuxComponenetsModule_1.AuxComponentsModule, toastyDemo_routing_1.ToastDemoRoute],
            declarations: [toastyDemo_1.ToastDemo]
        }), 
        __metadata('design:paramtypes', [])
    ], ToastDemoModule);
    return ToastDemoModule;
}());
exports.ToastDemoModule = ToastDemoModule;
//# sourceMappingURL=toastyDemo.Module.js.map