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