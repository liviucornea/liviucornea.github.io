"use strict";
var core_1 = require('@angular/core');
var CalendarDayViewHourSegmentComponent = (function () {
    function CalendarDayViewHourSegmentComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarDayViewHourSegmentComponent.prototype, "segment", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarDayViewHourSegmentComponent.prototype, "locale", void 0);
    CalendarDayViewHourSegmentComponent = __decorate([
        core_1.Component({
            selector: 'mwl-calendar-day-view-hour-segment',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div class=\"cal-hour-segment\" [ngClass]=\"segment.cssClass\">\n      <div [hidden]=\"!segment.isStart\" class=\"cal-time\">\n        {{ segment.date | calendarDate:'dayViewHour':locale }}\n      </div>\n      &nbsp;\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarDayViewHourSegmentComponent);
    return CalendarDayViewHourSegmentComponent;
}());
exports.CalendarDayViewHourSegmentComponent = CalendarDayViewHourSegmentComponent;
//# sourceMappingURL=calendarDayViewHourSegment.component.js.map