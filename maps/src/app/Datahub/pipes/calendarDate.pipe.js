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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var calendarDateFormatter_provider_1 = require("../../ReusableComponents/Calendar/CalendarHelpers/calendarDateFormatter.provider");
var fns_1 = require("../routes/home/fns");
var CalendarDate = (function () {
    function CalendarDate(dateFormatter, locale) {
        this.dateFormatter = dateFormatter;
        this.locale = locale;
    }
    CalendarDate.prototype.transform = function (date, method, locale) {
        if (locale === void 0) { locale = this.locale; }
        var fnc = this.dateFormatter[method];
        var result = fnc({ date: date, locale: locale });
        if ((method !== "monthViewDayNumber") && (method !== "monthViewColumnHeader")) {
            var tmp = result;
            var pastDate = fns_1.fns.removeWeeks(fns_1.fns.parse(date), 2);
            var postDate = fns_1.fns.addWeeks(fns_1.fns.parse(date), 2);
            fns_1.fns.setCurrentDate(pastDate);
            var result1 = fnc(pastDate, locale);
            fns_1.fns.setCurrentDate(postDate);
            var result2 = fnc(postDate, locale);
            if (result1 !== tmp) {
                result = result1 + "---" + tmp;
            }
            if (result2 !== tmp) {
                result = result + "---" + result2;
            }
        }
        return result;
    };
    CalendarDate = __decorate([
        core_1.Pipe({
            name: 'calendarDate'
        }),
        __param(1, core_1.Inject(core_1.LOCALE_ID)), 
        __metadata('design:paramtypes', [calendarDateFormatter_provider_1.CalendarDateFormatter, String])
    ], CalendarDate);
    return CalendarDate;
}());
exports.CalendarDate = CalendarDate;
//# sourceMappingURL=calendarDate.pipe.js.map