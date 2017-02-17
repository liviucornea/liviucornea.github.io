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
var calendarEventTitle_provider_1 = require('../../ReusableComponents/Calendar/CalendarHelpers/calendarEventTitle.provider');
var CalendarEventTitle = (function () {
    function CalendarEventTitle(calendarEventTitle) {
        this.calendarEventTitle = calendarEventTitle;
    }
    CalendarEventTitle.prototype.transform = function (event, titleType) {
        return this.calendarEventTitle[titleType](event);
    };
    CalendarEventTitle = __decorate([
        core_1.Pipe({
            name: 'calendarEventTitle'
        }), 
        __metadata('design:paramtypes', [calendarEventTitle_provider_1.CalendarEventTitle])
    ], CalendarEventTitle);
    return CalendarEventTitle;
}());
exports.CalendarEventTitle = CalendarEventTitle;
//# sourceMappingURL=calendarEventTitle.pipe.js.map