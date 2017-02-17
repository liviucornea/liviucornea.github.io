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