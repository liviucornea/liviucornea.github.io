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