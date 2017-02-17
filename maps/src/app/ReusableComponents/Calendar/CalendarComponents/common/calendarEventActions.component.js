"use strict";
var core_1 = require('@angular/core');
//import { CalendarEvent } from 'calendar-utils';
var CalendarEventActionsComponent = (function () {
    function CalendarEventActionsComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarEventActionsComponent.prototype, "event", void 0);
    CalendarEventActionsComponent = __decorate([
        core_1.Component({
            selector: 'mwl-calendar-event-actions',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <span *ngIf=\"event.actions\" class=\"cal-event-actions\">\n      <a\n        class=\"cal-event-action\"\n        href=\"javascript:;\"\n        *ngFor=\"let action of event.actions\"\n        (click)=\"action.onClick({event: event})\"\n        [ngClass]=\"action.cssClass\"\n        [innerHtml]=\"action.label\">\n      </a>\n    </span>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarEventActionsComponent);
    return CalendarEventActionsComponent;
}());
exports.CalendarEventActionsComponent = CalendarEventActionsComponent;
//# sourceMappingURL=calendarEventActions.component.js.map