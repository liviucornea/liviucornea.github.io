"use strict";
var core_1 = require('@angular/core');
//import { CalendarEvent } from 'calendar-utils';
var CalendarAllDayEventComponent = (function () {
    function CalendarAllDayEventComponent() {
        this.eventClicked = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarAllDayEventComponent.prototype, "event", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CalendarAllDayEventComponent.prototype, "eventClicked", void 0);
    CalendarAllDayEventComponent = __decorate([
        core_1.Component({
            selector: 'mwl-calendar-all-day-event',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div\n      class=\"cal-all-day-event\"\n      [style.backgroundColor]=\"event.color.secondary\"\n      [style.borderColor]=\"event.color.primary\">\n      <mwl-calendar-event-title\n        [event]=\"event\"\n        view=\"day\"\n        (click)=\"eventClicked.emit()\">\n      </mwl-calendar-event-title>\n      <mwl-calendar-event-actions [event]=\"event\"></mwl-calendar-event-actions>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarAllDayEventComponent);
    return CalendarAllDayEventComponent;
}());
exports.CalendarAllDayEventComponent = CalendarAllDayEventComponent;
//# sourceMappingURL=calendarAllDayEvent.component.js.map