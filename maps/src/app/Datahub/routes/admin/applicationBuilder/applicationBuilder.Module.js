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
var applicationBuilder_1 = require("./applicationBuilder");
var applicationBuilder_routing_1 = require("./applicationBuilder.routing");
var SharedModule_1 = require("../../../../ReusableComponents/SharedModule");
var forms_1 = require("@angular/forms");
var ApplicationBuilderModule = (function () {
    function ApplicationBuilderModule() {
    }
    ApplicationBuilderModule = __decorate([
        core_1.NgModule({
            imports: [forms_1.FormsModule, platform_browser_1.BrowserModule, applicationBuilder_routing_1.ApplicationBuilderRouting, SharedModule_1.SharedModule],
            declarations: [applicationBuilder_1.ApplicationBuilder],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], ApplicationBuilderModule);
    return ApplicationBuilderModule;
}());
exports.ApplicationBuilderModule = ApplicationBuilderModule;
//# sourceMappingURL=applicationBuilder.Module.js.map