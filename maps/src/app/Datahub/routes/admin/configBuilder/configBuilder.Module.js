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
var SharedModule_1 = require("../../../../ReusableComponents/SharedModule");
var configBuilder_1 = require("./configBuilder");
var configBuilder_routing_1 = require("./configBuilder.routing");
var configBuilderAddEditForm_1 = require("./configBuilderAddEditForm/configBuilderAddEditForm");
var forms_1 = require("@angular/forms");
var ConfigBuilderModule = (function () {
    function ConfigBuilderModule() {
    }
    ConfigBuilderModule = __decorate([
        core_1.NgModule({
            imports: [forms_1.FormsModule, platform_browser_1.BrowserModule, configBuilder_routing_1.ConfigBuilderRouting, SharedModule_1.SharedModule],
            declarations: [configBuilder_1.ConfigBuilder, configBuilderAddEditForm_1.configBuilderAddEditForm],
        }), 
        __metadata('design:paramtypes', [])
    ], ConfigBuilderModule);
    return ConfigBuilderModule;
}());
exports.ConfigBuilderModule = ConfigBuilderModule;
//# sourceMappingURL=configBuilder.Module.js.map