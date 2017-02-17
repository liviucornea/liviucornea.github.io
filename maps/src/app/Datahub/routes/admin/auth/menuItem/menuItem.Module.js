"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require("@angular/platform-browser");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var menuItem_routing_1 = require("./menuItem.routing");
var menuItem_1 = require("./menuItem");
var MenuItemModule = (function () {
    function MenuItemModule() {
    }
    MenuItemModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, menuItem_routing_1.MenuItemRouting, SharedModule_1.SharedModule],
            declarations: [menuItem_1.MenuItem],
        }), 
        __metadata('design:paramtypes', [])
    ], MenuItemModule);
    return MenuItemModule;
}());
exports.MenuItemModule = MenuItemModule;
//# sourceMappingURL=menuItem.Module.js.map