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
//import { WeekDay } from 'calendar-utils';
var CalendarWeekViewHeaderComponent = (function () {
    function CalendarWeekViewHeaderComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarWeekViewHeaderComponent.prototype, "day", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarWeekViewHeaderComponent.prototype, "locale", void 0);
    CalendarWeekViewHeaderComponent = __decorate([
        core_1.Component({
            selector: 'mwl-calendar-week-view-header',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <strong>{{ day.date | calendarDate:'weekViewColumnHeader':locale }}</strong><br>\n    <span>{{ day.date | calendarDate:'weekViewColumnSubHeader':locale }}</span>\n  ",
            host: {
                '[class]': '"cal-header"',
                '[class.cal-past]': 'day.isPast',
                '[class.cal-today]': 'day.isToday',
                '[class.cal-future]': 'day.isFuture',
                '[class.cal-weekend]': 'day.isWeekend'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarWeekViewHeaderComponent);
    return CalendarWeekViewHeaderComponent;
}());
exports.CalendarWeekViewHeaderComponent = CalendarWeekViewHeaderComponent;
//# sourceMappingURL=calendarWeekViewHeader.component.js.map