"use strict";
var core_1 = require('@angular/core');
var CalendarWeekViewEventComponent = (function () {
    function CalendarWeekViewEventComponent() {
        this.eventClicked = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarWeekViewEventComponent.prototype, "weekEvent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarWeekViewEventComponent.prototype, "tooltipPlacement", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CalendarWeekViewEventComponent.prototype, "eventClicked", void 0);
    CalendarWeekViewEventComponent = __decorate([
        core_1.Component({
            selector: 'mwl-calendar-week-view-event',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div\n      class=\"cal-event\"\n      [class.cal-starts-within-week]=\"!weekEvent.startsBeforeWeek\"\n      [class.cal-ends-within-week]=\"!weekEvent.endsAfterWeek\"\n      [style.backgroundColor]=\"weekEvent.event.color.secondary\"\n      [ngClass]=\"weekEvent.event?.cssClass\"\n      [mwlCalendarTooltip]=\"weekEvent.event | calendarEventTitle:'weekTooltip'\"\n      [tooltipPlacement]=\"tooltipPlacement\">\n      <mwl-calendar-event-title\n        [event]=\"weekEvent.event\"\n        view=\"week\"\n        (click)=\"eventClicked.emit()\">\n      </mwl-calendar-event-title>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarWeekViewEventComponent);
    return CalendarWeekViewEventComponent;
}());
exports.CalendarWeekViewEventComponent = CalendarWeekViewEventComponent;
//# sourceMappingURL=calendarWeekViewEvent.component.js.map