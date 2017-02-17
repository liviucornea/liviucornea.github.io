"use strict";
var core_1 = require('@angular/core');
var CalendarOpenDayEventsComponent = (function () {
    function CalendarOpenDayEventsComponent() {
        this.isOpen = false;
        this.eventClicked = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarOpenDayEventsComponent.prototype, "isOpen", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarOpenDayEventsComponent.prototype, "events", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CalendarOpenDayEventsComponent.prototype, "eventClicked", void 0);
    CalendarOpenDayEventsComponent = __decorate([
        core_1.Component({
            selector: 'mwl-calendar-open-day-events',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div class=\"cal-open-day-events\" [@collapse] *ngIf=\"isOpen\">\n      <div\n        *ngFor=\"let event of events\"\n        [ngClass]=\"event?.cssClass\">\n        <span class=\"cal-event\" [style.backgroundColor]=\"event.color.primary\"></span>\n        <mwl-calendar-event-title\n          [event]=\"event\"\n          view=\"month\"\n          (click)=\"eventClicked.emit({event: event})\">\n        </mwl-calendar-event-title>\n        <mwl-calendar-event-actions [event]=\"event\"></mwl-calendar-event-actions>\n      </div>\n    </div>\n  ",
            animations: [
                core_1.trigger('collapse', [
                    core_1.transition('void => *', [
                        core_1.style({ height: 0 }),
                        core_1.animate('150ms linear', core_1.style({ height: '*' }))
                    ]),
                    core_1.transition('* => void', [
                        core_1.style({ height: '*' }),
                        core_1.animate('150ms linear', core_1.style({ height: 0 }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarOpenDayEventsComponent);
    return CalendarOpenDayEventsComponent;
}());
exports.CalendarOpenDayEventsComponent = CalendarOpenDayEventsComponent;
//# sourceMappingURL=calendarOpenDayEvents.component.js.map