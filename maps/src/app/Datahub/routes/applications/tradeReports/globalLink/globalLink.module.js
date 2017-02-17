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
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var globalLink_routes_1 = require("./globalLink.routes");
var globalLink_1 = require("./globalLink");
var postingsByDate_module_1 = require("./postingsByDate/postingsByDate.module");
var GlobalLinkModule = (function () {
    function GlobalLinkModule() {
    }
    GlobalLinkModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, globalLink_routes_1.GlobalLinkRouting, postingsByDate_module_1.PostingsByDateModule
            ],
            declarations: [globalLink_1.GlobalLink],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], GlobalLinkModule);
    return GlobalLinkModule;
}());
exports.GlobalLinkModule = GlobalLinkModule;
//# sourceMappingURL=globalLink.module.js.map