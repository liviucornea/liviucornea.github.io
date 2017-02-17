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