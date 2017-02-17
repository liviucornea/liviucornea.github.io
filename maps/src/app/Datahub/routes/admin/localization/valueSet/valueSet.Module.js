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