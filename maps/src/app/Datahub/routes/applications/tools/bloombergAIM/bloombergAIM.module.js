"use strict";
var core_1 = require('@angular/core');
var bloombergAIM_1 = require("./bloombergAIM");
var platform_browser_1 = require("@angular/platform-browser");
var bloombergAIM_routes_1 = require("./bloombergAIM.routes");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var BloombergAIMModule = (function () {
    function BloombergAIMModule() {
    }
    BloombergAIMModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule, bloombergAIM_routes_1.BloombergAIMRouting, SharedModule_1.SharedModule
            ],
            declarations: [bloombergAIM_1.BloombergAIM],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], BloombergAIMModule);
    return BloombergAIMModule;
}());
exports.BloombergAIMModule = BloombergAIMModule;
//# sourceMappingURL=bloombergAIM.module.js.map