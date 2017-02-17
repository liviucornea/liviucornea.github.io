"use strict";
var core_1 = require('@angular/core');
//import { CalendarEvent } from 'calendar-utils';
var calendarEventTitle_provider_1 = require('../../ReusableComponents/Calendar/CalendarHelpers/calendarEventTitle.provider');
var CalendarEventTitle = (function () {
    function CalendarEventTitle(calendarEventTitle) {
        this.calendarEventTitle = calendarEventTitle;
    }
    CalendarEventTitle.prototype.transform = function (event, titleType) {
        return this.calendarEventTitle[titleType](event);
    };
    CalendarEventTitle = __decorate([
        core_1.Pipe({
            name: 'calendarEventTitle'
        }), 
        __metadata('design:paramtypes', [calendarEventTitle_provider_1.CalendarEventTitle])
    ], CalendarEventTitle);
    return CalendarEventTitle;
}());
exports.CalendarEventTitle = CalendarEventTitle;
//# sourceMappingURL=calendarEventTitle.pipe.js.map