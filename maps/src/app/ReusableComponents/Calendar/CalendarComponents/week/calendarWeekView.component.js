"use strict";
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
var calendarutils_1 = require("../../../../Datahub/routes/home/calendarutils");
/*import {
 WeekDay,
 CalendarEvent,
 WeekViewEventRow,
 getWeekViewHeader,
 getWeekView
 } from 'calendar-utils';*/
var CalendarWeekViewComponent = (function () {
    function CalendarWeekViewComponent(cdr, locale) {
        this.cdr = cdr;
        /**
         * An array of events to display on view
         */
        this.events = [];
        /**
         * The placement of the event tooltip
         */
        this.tooltipPlacement = 'bottom';
        /**
         * Called when a header week day is clicked
         */
        this.dayClicked = new core_1.EventEmitter();
        /**
         * Called when the event title is clicked
         */
        this.eventClicked = new core_1.EventEmitter();
        this.eventRows = [];
        this.locale = locale;
    }
    CalendarWeekViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(function () {
                _this.refreshAll();
                _this.cdr.markForCheck();
            });
        }
    };
    CalendarWeekViewComponent.prototype.ngOnChanges = function (changes) {
        if (changes.viewDate) {
            this.refreshHeader();
        }
        if (changes.events || changes.viewDate) {
            this.refreshBody();
        }
    };
    CalendarWeekViewComponent.prototype.ngOnDestroy = function () {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    };
    CalendarWeekViewComponent.prototype.refreshHeader = function () {
        this.days = calendarutils_1.calendarutils.getWeekViewHeader({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn
        });
    };
    CalendarWeekViewComponent.prototype.refreshBody = function () {
        this.eventRows = calendarutils_1.calendarutils.getWeekView({
            events: this.events,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn
        });
    };
    CalendarWeekViewComponent.prototype.refreshAll = function () {
        this.refreshHeader();
        this.refreshBody();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], CalendarWeekViewComponent.prototype, "viewDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarWeekViewComponent.prototype, "events", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Subject_1.Subject)
    ], CalendarWeekViewComponent.prototype, "refresh", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarWeekViewComponent.prototype, "locale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarWeekViewComponent.prototype, "tooltipPlacement", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CalendarWeekViewComponent.prototype, "weekStartsOn", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CalendarWeekViewComponent.prototype, "dayClicked", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CalendarWeekViewComponent.prototype, "eventClicked", void 0);
    CalendarWeekViewComponent = __decorate([
        core_1.Component({
            selector: 'mwl-calendar-week-view',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: require("./calendarWeekView.html")
        }),
        __param(1, core_1.Inject(core_1.LOCALE_ID)), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, String])
    ], CalendarWeekViewComponent);
    return CalendarWeekViewComponent;
}());
exports.CalendarWeekViewComponent = CalendarWeekViewComponent;
//# sourceMappingURL=calendarWeekView.component.js.map