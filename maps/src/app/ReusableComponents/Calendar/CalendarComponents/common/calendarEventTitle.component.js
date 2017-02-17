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
//import { CalendarEvent } from 'calendar-utils';
var CalendarEventTitleComponent = (function () {
    function CalendarEventTitleComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarEventTitleComponent.prototype, "event", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarEventTitleComponent.prototype, "view", void 0);
    CalendarEventTitleComponent = __decorate([
        core_1.Component({
            selector: 'mwl-calendar-event-title',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <a\n      class=\"cal-event-title\"\n      href=\"test\"\n      [innerHTML]=\"event | calendarEventTitle:view\">\n    </a>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarEventTitleComponent);
    return CalendarEventTitleComponent;
}());
exports.CalendarEventTitleComponent = CalendarEventTitleComponent;
//# sourceMappingURL=calendarEventTitle.component.js.map