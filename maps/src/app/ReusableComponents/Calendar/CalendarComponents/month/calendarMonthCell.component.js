"use strict";
var core_1 = require('@angular/core');
var calendar_toast_service_1 = require("../../../../ReusableServices/calendar.toast.service");
var CalendarMonthCellComponent = (function () {
    function CalendarMonthCellComponent(toastServ) {
        this.highlightDay = new core_1.EventEmitter();
        this.badgeStyles = Array();
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
                            badgeStyle: "cal-day-badge-" + x.status.toLowerCase()
                        });
                    }
                });
            }
        }
    };
    CalendarMonthCellComponent.prototype.dayEventClicked = function (badge) {
        this.toastyService.eventsArrival.emit(badge.badgeEvents);
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
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CalendarMonthCellComponent.prototype, "highlightDay", void 0);
    CalendarMonthCellComponent = __decorate([
        core_1.Component({
            selector: 'mwl-calendar-month-cell',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div class=\"cal-cell-top\">\n       <span *ngFor=\"let badge of badges\" class=\"{{badge.badgeStyle}}\" (click)=\"dayEventClicked(badge)\">{{badge.badgeTotal }}</span>\n       <span class=\"cal-day-number\">{{ day.date | calendarDate:'monthViewDayNumber':locale }}</span>      \n    </div>\n    <div class=\"cal-events\">\n    </div>\n  ",
            host: {
                '[class]': '"cal-cell cal-day-cell " + day?.cssClass',
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
        __metadata('design:paramtypes', [calendar_toast_service_1.CalendarToastyService])
    ], CalendarMonthCellComponent);
    return CalendarMonthCellComponent;
}());
exports.CalendarMonthCellComponent = CalendarMonthCellComponent;
//# sourceMappingURL=calendarMonthCell.component.js.map