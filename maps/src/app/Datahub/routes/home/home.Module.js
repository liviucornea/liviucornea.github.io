"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require("@angular/platform-browser");
var home_1 = require("./home");
var home_routing_1 = require("./home.routing");
var SharedModule_1 = require("../../../ReusableComponents/SharedModule");
var calendar_Module_1 = require("../../../ReusableComponents/Calendar/calendar.Module");
var AuxComponenetsModule_1 = require("../../../ReusableComponents/AuxComponenetsModule");
var HomeModule = (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, home_routing_1.HomeRouting, SharedModule_1.SharedModule, calendar_Module_1.CalendarModule, AuxComponenetsModule_1.AuxComponentsModule],
            declarations: [home_1.Home]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
//# sourceMappingURL=home.Module.js.map