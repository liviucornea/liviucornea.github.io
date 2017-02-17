"use strict";
var core_1 = require('@angular/core');
//import { CalendarDateFormatterInterface, DateFormatterParams } from './../ReusableComponents/CalendarInterfaces/calendarDateFormatter.interface';
exports.MOMENT = new core_1.OpaqueToken('Moment');
var CalendarMomentDateFormatter = (function () {
    function CalendarMomentDateFormatter(moment) {
        this.moment = moment;
    }
    CalendarMomentDateFormatter.prototype.monthViewColumnHeader = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date).locale(locale).format('dddd');
    };
    CalendarMomentDateFormatter.prototype.monthViewDayNumber = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date).locale(locale).format('D');
    };
    CalendarMomentDateFormatter.prototype.monthViewTitle = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date).locale(locale).format('MMMM YYYY');
    };
    CalendarMomentDateFormatter.prototype.weekViewColumnHeader = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date).locale(locale).format('dddd');
    };
    CalendarMomentDateFormatter.prototype.weekViewColumnSubHeader = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date).locale(locale).format('D MMM');
    };
    CalendarMomentDateFormatter.prototype.weekViewTitle = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date).locale(locale).format('[Week] W [of] YYYY');
    };
    CalendarMomentDateFormatter.prototype.dayViewHour = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date).locale(locale).format('ha');
    };
    CalendarMomentDateFormatter.prototype.dayViewTitle = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date).locale(locale).format('dddd, D MMMM, YYYY');
    };
    CalendarMomentDateFormatter = __decorate([
        __param(0, core_1.Inject(exports.MOMENT)), 
        __metadata('design:paramtypes', [Object])
    ], CalendarMomentDateFormatter);
    return CalendarMomentDateFormatter;
}());
exports.CalendarMomentDateFormatter = CalendarMomentDateFormatter;
//# sourceMappingURL=calendarMomentDateFormatter.provider.js.map