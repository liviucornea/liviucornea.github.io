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
var calendar_toast_service_1 = require("../../../../ReusableServices/calendar.toast.service");
var calendarutils_1 = require("../../../../Datahub/routes/home/calendarutils");
var calendarService_1 = require("../../../../ReusableServices/calendarService");
var CalendarMonthCellComponent = (function () {
    function CalendarMonthCellComponent(toastServ, calServ) {
        this.calServ = calServ;
        this.highlightDay = new core_1.EventEmitter();
        this.toastyService = toastServ;
    }
    CalendarMonthCellComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        this.fatalBadge = 0;
        this.okBadge = 0;
        this.futureBadge = 0;
        if (changes.day) {
            var test = this.day.badgeTotal;
            if (test > 0) {
                this.badges = new Array();
                this.day.events.forEach(function (x) {
                    var lookup = _this.badges.find(function (xx) { return xx.status === x.status; });
                    if (lookup) {
                        lookup.badgeTotal++;
                        lookup.badgeEvents.push(x);
                    }
                    else {
                        _this.badges.push({
                            status: x.status,
                            badgeEvents: [x],
                            badgeTotal: 1,
                        });
                    }
                });
            }
        }
    };
    CalendarMonthCellComponent.prototype.longEventsArrowClicked = function (day) {
        this.calServ.longEventsExpandEmitter.next(day);
    };
    CalendarMonthCellComponent.prototype.dayEventClicked = function (badge) {
        this.toastyService.eventsArrival.emit(badge.badgeEvents);
    };
    CalendarMonthCellComponent.prototype.getEventColor = function (status) {
        return calendarutils_1.calendarutils.getEventColor(status);
    };
    CalendarMonthCellComponent.prototype.getLongEvents = function (events) {
        return calendarutils_1.calendarutils.getLongEvents(events);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarMonthCellComponent.prototype, "day", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarMonthCellComponent.prototype, "openDay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarMonthCellComponent.prototype, "locale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarMonthCellComponent.prototype, "tooltipPlacement", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarMonthCellComponent.prototype, "longEventsShowing", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CalendarMonthCellComponent.prototype, "highlightDay", void 0);
    CalendarMonthCellComponent = __decorate([
        core_1.Component({
            selector: 'mwl-calendar-month-cell',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: require('./calendarMonthCell.html'),
            host: {
                '[class]': '"" + day?.cssClass',
                '[class.cal-past]': 'day.isPast',
                '[class.cal-today]': 'day.isToday',
                '[class.cal-future]': 'day.isFuture',
                '[class.cal-weekend]': 'day.isWeekend',
                '[class.cal-in-month]': 'day.inMonth',
                '[class.cal-out-month]': '!day.inMonth',
                '[class.cal-has-events]': 'day.events.length > 0',
                '[class.cal-open]': 'day === openDay',
                '[style.backgroundColor]': 'day.backgroundColor'
            }
        }), 
        __metadata('design:paramtypes', [calendar_toast_service_1.CalendarToastyService, calendarService_1.CalendarService])
    ], CalendarMonthCellComponent);
    return CalendarMonthCellComponent;
}());
exports.CalendarMonthCellComponent = CalendarMonthCellComponent;
//# sourceMappingURL=calendarMonthCell.component.js.map