"use strict";
var core_1 = require('@angular/core');
//import { WeekDay } from 'calendar-utils';
var CalendarWeekViewHeaderComponent = (function () {
    function CalendarWeekViewHeaderComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarWeekViewHeaderComponent.prototype, "day", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarWeekViewHeaderComponent.prototype, "locale", void 0);
    CalendarWeekViewHeaderComponent = __decorate([
        core_1.Component({
            selector: 'mwl-calendar-week-view-header',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <b>{{ day.date | calendarDate:'weekViewColumnHeader':locale }}</b><br>\n    <span>{{ day.date | calendarDate:'weekViewColumnSubHeader':locale }}</span>\n  ",
            host: {
                '[class]': '"cal-header"',
                '[class.cal-past]': 'day.isPast',
                '[class.cal-today]': 'day.isToday',
                '[class.cal-future]': 'day.isFuture',
                '[class.cal-weekend]': 'day.isWeekend'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarWeekViewHeaderComponent);
    return CalendarWeekViewHeaderComponent;
}());
exports.CalendarWeekViewHeaderComponent = CalendarWeekViewHeaderComponent;
//# sourceMappingURL=calendarWeekViewHeader.component.js.map