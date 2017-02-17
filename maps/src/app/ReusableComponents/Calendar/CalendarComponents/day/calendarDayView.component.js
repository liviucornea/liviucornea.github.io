"use strict";
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
var calendarutils_1 = require("../../../../Datahub/routes/home/calendarutils");
var SEGMENT_HEIGHT = 30;
var CalendarDayViewComponent = (function () {
    function CalendarDayViewComponent(cdr, locale) {
        this.cdr = cdr;
        /**
         * An array of events to display on view
         */
        this.events = [];
        /**
         * The number of segments in an hour. Must be <= 6
         */
        this.hourSegments = 2;
        /**
         * The day start hours in 24 hour time. Must be 0-23
         */
        this.dayStartHour = 0;
        /**
         * The day start minutes. Must be 0-59
         */
        this.dayStartMinute = 0;
        /**
         * The day end hours in 24 hour time. Must be 0-23
         */
        this.dayEndHour = 23;
        /**
         * The day end minutes. Must be 0-59
         */
        this.dayEndMinute = 59;
        /**
         * The width in pixels of each event on the view
         */
        this.eventWidth = 150;
        /**
         * Called when an event title is clicked
         */
        this.eventClicked = new core_1.EventEmitter();
        /**
         * Called when an hour segment is clicked
         */
        this.hourSegmentClicked = new core_1.EventEmitter();
        this.hours = [];
        this.width = 0;
        this.locale = locale;
    }
    CalendarDayViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(function () {
                _this.refreshAll();
                _this.cdr.markForCheck();
            });
        }
    };
    CalendarDayViewComponent.prototype.ngOnDestroy = function () {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    };
    CalendarDayViewComponent.prototype.ngOnChanges = function (changes) {
        if (changes.viewDate ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute) {
            this.refreshHourGrid();
        }
        if (changes.viewDate ||
            changes.events ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute ||
            changes.eventWidth) {
            this.refreshView();
        }
    };
    CalendarDayViewComponent.prototype.refreshHourGrid = function () {
        var _this = this;
        this.hours = calendarutils_1.calendarutils.getDayViewHourGrid({
            viewDate: this.viewDate,
            hourSegments: this.hourSegments,
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            },
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            }
        });
        if (this.hourSegmentModifier) {
            this.hours.forEach(function (hour) {
                hour.segments.forEach(function (segment) { return _this.hourSegmentModifier(segment); });
            });
        }
    };
    CalendarDayViewComponent.prototype.refreshView = function () {
        this.view = calendarutils_1.calendarutils.getDayView({
            events: this.events,
            viewDate: this.viewDate,
            hourSegments: this.hourSegments,
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            },
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            },
            eventWidth: this.eventWidth,
            segmentHeight: SEGMENT_HEIGHT
        });
    };
    CalendarDayViewComponent.prototype.refreshAll = function () {
        this.refreshHourGrid();
        this.refreshView();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], CalendarDayViewComponent.prototype, "viewDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarDayViewComponent.prototype, "events", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CalendarDayViewComponent.prototype, "hourSegments", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CalendarDayViewComponent.prototype, "dayStartHour", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CalendarDayViewComponent.prototype, "dayStartMinute", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CalendarDayViewComponent.prototype, "dayEndHour", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CalendarDayViewComponent.prototype, "dayEndMinute", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CalendarDayViewComponent.prototype, "eventWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Subject_1.Subject)
    ], CalendarDayViewComponent.prototype, "refresh", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarDayViewComponent.prototype, "locale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], CalendarDayViewComponent.prototype, "hourSegmentModifier", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CalendarDayViewComponent.prototype, "eventClicked", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CalendarDayViewComponent.prototype, "hourSegmentClicked", void 0);
    CalendarDayViewComponent = __decorate([
        core_1.Component({
            selector: 'mwl-calendar-day-view',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: require("./calendarDayView.html")
        }),
        __param(1, core_1.Inject(core_1.LOCALE_ID)), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, String])
    ], CalendarDayViewComponent);
    return CalendarDayViewComponent;
}());
exports.CalendarDayViewComponent = CalendarDayViewComponent;
//# sourceMappingURL=calendarDayView.component.js.map