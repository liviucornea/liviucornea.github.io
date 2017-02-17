"use strict";
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