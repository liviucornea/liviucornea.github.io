"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require("@angular/platform-browser");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var holiday_routing_1 = require("./holiday.routing");
var holiday_1 = require("./holiday");
var HolidayModule = (function () {
    function HolidayModule() {
    }
    HolidayModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, holiday_routing_1.HolidayRouting, SharedModule_1.SharedModule],
            declarations: [holiday_1.Holiday],
        }), 
        __metadata('design:paramtypes', [])
    ], HolidayModule);
    return HolidayModule;
}());
exports.HolidayModule = HolidayModule;
//# sourceMappingURL=holiday.Module.js.map