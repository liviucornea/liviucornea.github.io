"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require("@angular/platform-browser");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var holidaySetCode_1 = require("./holidaySetCode");
var holidaySetCode_routing_1 = require("./holidaySetCode.routing");
var HolidaySetCodeModule = (function () {
    function HolidaySetCodeModule() {
    }
    HolidaySetCodeModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, holidaySetCode_routing_1.HolidaySetCodeRouting, SharedModule_1.SharedModule, holidaySetCode_routing_1.HolidaySetCodeRouting],
            declarations: [holidaySetCode_1.HolidaySetCode],
        }), 
        __metadata('design:paramtypes', [])
    ], HolidaySetCodeModule);
    return HolidaySetCodeModule;
}());
exports.HolidaySetCodeModule = HolidaySetCodeModule;
//# sourceMappingURL=holidaySetCode.Module.js.map