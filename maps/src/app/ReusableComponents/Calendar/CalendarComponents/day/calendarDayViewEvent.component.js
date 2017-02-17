"use strict";
var core_1 = require('@angular/core');
//import {DayViewEvent} from "calendar-utils";
//import { DayViewEvent } from 'calendar-utils';
var CalendarDayViewEventComponent = (function () {
    function CalendarDayViewEventComponent() {
        this.eventClicked = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarDayViewEventComponent.prototype, "dayEvent", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CalendarDayViewEventComponent.prototype, "eventClicked", void 0);
    CalendarDayViewEventComponent = __decorate([
        core_1.Component({
            selector: 'mwl-calendar-day-view-event',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div\n      class=\"cal-event\"\n      [style.marginTop.px]=\"dayEvent.top\"\n      [style.marginLeft.px]=\"dayEvent.left + 70\"\n      [style.height.px]=\"dayEvent.height\"\n      [style.width.px]=\"dayEvent.width - 1\"\n      [style.backgroundColor]=\"dayEvent.event.color.secondary\"\n      [style.borderColor]=\"dayEvent.event.color.primary\"\n      [class.cal-starts-within-day]=\"!dayEvent.startsBeforeDay\"\n      [class.cal-ends-within-day]=\"!dayEvent.endsAfterDay\"\n      [ngClass]=\"dayEvent.event.cssClass\">\n      <mwl-calendar-event-title\n        [event]=\"dayEvent.event\"\n        view=\"day\"\n        (click)=\"eventClicked.emit()\">\n      </mwl-calendar-event-title>\n      <mwl-calendar-event-actions [event]=\"dayEvent.event\"></mwl-calendar-event-actions>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarDayViewEventComponent);
    return CalendarDayViewEventComponent;
}());
exports.CalendarDayViewEventComponent = CalendarDayViewEventComponent;
//# sourceMappingURL=calendarDayViewEvent.component.js.map