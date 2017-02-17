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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var Subject_1 = require('rxjs/Subject');
var fns_1 = require("../../../../Datahub/routes/home/fns");
var core_1 = require("@angular/core");
var calendarutils_1 = require("../../../../Datahub/routes/home/calendarutils");
var CalendarMonthViewComponent = (function () {
    function CalendarMonthViewComponent(cdr, locale) {
        this.cdr = cdr;
        /**
         * An array of events to display on view
         */
        this.events = [];
        /**
         * Whether the events list for the day of the `viewDate` option is visible or not
         */
        this.activeDayIsOpen = false;
        /**
         * The placement of the event tooltip
         */
        this.tooltipPlacement = 'top';
        /**
         * Called when the day cell is clicked
         */
        this.dayClicked = new core_1.EventEmitter();
        /**
         * Called when the event title is clicked
         */
        this.eventClicked = new core_1.EventEmitter();
        this.locale = locale;
    }
    CalendarMonthViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(function () {
                _this.refreshAll();
                _this.cdr.markForCheck();
            });
        }
    };
    CalendarMonthViewComponent.prototype.ngOnChanges = function (changes) {
        if (changes.viewDate) {
            this.refreshHeader();
        }
        if (changes.viewDate || changes.events) {
            this.refreshBody();
        }
        if (changes.activeDayIsOpen || changes.viewDate || changes.events) {
            this.checkActiveDayIsOpen();
        }
    };
    CalendarMonthViewComponent.prototype.ngOnDestroy = function () {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    };
    CalendarMonthViewComponent.prototype.refreshHeader = function () {
        this.columnHeaders = calendarutils_1.calendarutils.getWeekViewHeader({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn
        });
    };
    CalendarMonthViewComponent.prototype.refreshBody = function () {
        var _this = this;
        this.view = calendarutils_1.calendarutils.getMonthView({
            events: this.events,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn
        });
        if (this.dayModifier) {
            this.view.days.forEach(function (day) { return _this.dayModifier(day); });
        }
        console.log("this.view: ");
        console.log(this.view);
    };
    CalendarMonthViewComponent.prototype.checkActiveDayIsOpen = function () {
        var _this = this;
        if (this.activeDayIsOpen === true) {
            this.openDay = this.view.days.find(function (day) { return fns_1.fns.isSameDay(day.date, _this.viewDate); });
            var index = this.view.days.indexOf(this.openDay);
            this.openRowIndex = Math.floor(index / 7) * 7;
        }
        else {
            this.openRowIndex = null;
            this.openDay = null;
        }
    };
    CalendarMonthViewComponent.prototype.refreshAll = function () {
        this.refreshHeader();
        this.refreshBody();
        this.checkActiveDayIsOpen();
    };
    CalendarMonthViewComponent.prototype.toggleDayHighlight = function (event, isHighlighted) {
        this.view.days.forEach(function (day) {
            if (isHighlighted && day.events.indexOf(event) > -1) {
                day.backgroundColor = event.color.secondary;
            }
            else {
                delete day.backgroundColor;
            }
        });
    };
    CalendarMonthViewComponent.prototype.getCalCellHeight = function (day) {
        var cellHeight = 70;
        if (this.longEventsShowing) {
            var numLongEvents = calendarutils_1.calendarutils.getLongEvents(day.events).length;
            if (numLongEvents > 4) {
                cellHeight = 155;
            }
            else if (numLongEvents > 0) {
                cellHeight = cellHeight + (numLongEvents * 16);
            }
        }
        return cellHeight + 'px';
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], CalendarMonthViewComponent.prototype, "viewDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarMonthViewComponent.prototype, "events", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarMonthViewComponent.prototype, "activeDayIsOpen", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], CalendarMonthViewComponent.prototype, "dayModifier", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Subject_1.Subject)
    ], CalendarMonthViewComponent.prototype, "refresh", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarMonthViewComponent.prototype, "locale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarMonthViewComponent.prototype, "tooltipPlacement", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CalendarMonthViewComponent.prototype, "weekStartsOn", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CalendarMonthViewComponent.prototype, "dayClicked", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CalendarMonthViewComponent.prototype, "eventClicked", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarMonthViewComponent.prototype, "longEvents", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarMonthViewComponent.prototype, "longEventsShowing", void 0);
    CalendarMonthViewComponent = __decorate([
        core_1.Component({
            selector: 'mwl-calendar-month-view',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: require("./calendarMonthView.html"),
        }),
        __param(1, core_1.Inject(core_1.LOCALE_ID)), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, String])
    ], CalendarMonthViewComponent);
    return CalendarMonthViewComponent;
}());
exports.CalendarMonthViewComponent = CalendarMonthViewComponent;
//# sourceMappingURL=calendarMonthView.component.js.map