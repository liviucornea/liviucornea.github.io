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
var common_1 = require("@angular/common");
var navigationService_1 = require("../../../ReusableServices/navigationService");
var fns_1 = require("./fns");
var calendarService_1 = require("../../../ReusableServices/calendarService");
var calendar_toast_service_1 = require("../../../ReusableServices/calendar.toast.service");
var calendarutils_1 = require("./calendarutils");
var Home = (function () {
    function Home(navigation, location, calService, toastServ) {
        var _this = this;
        this.eventTypes = new Array();
        this.events = new Array();
        this.activeDayIsOpen = true;
        this.view = 'month';
        this.viewDate = new Date();
        this.longEventsShowing = true;
        this.actions = [{
                label: '<i class="fa fa-fw fa-pencil"></i>',
                onClick: function (_a) {
                    var event = _a.event;
                    console.log('Edit event', event);
                }
            }, {
                label: '<i class="fa fa-fw fa-times"></i>',
                onClick: function (_a) {
                    var event = _a.event;
                    _this.events = _this.events.filter(function (iEvent) { return iEvent !== event; });
                }
            }];
        this.toastyService = toastServ;
        this.options = {
            title: 'Toast It!',
            msg: 'Mmmm, tasties...',
            showClose: true,
            timeout: 5000,
            theme: this.toastyService.themes[1].code,
            type: this.toastyService.types[1].code
        };
        this.eventArrivalSubscription = this.toastyService.eventsArrival.subscribe(function (x) {
            x.forEach(function (xx) {
                _this.showEventDetail(xx.title);
            });
        });
        //navigation.setCurrentPage(location.path(false));
        this.calendarService = calService;
        this.calendarService.eventsArrived.subscribe(function () {
            _this.changeTracker = !_this.changeTracker;
            _this.eventTypes = [];
            _this.eventTypes.push({ value: "All", name: "All" });
            _this.events = calendarService_1.CalendarService.calEvents["All"];
            if (_this.events) {
                _this.extractEvents();
            }
        });
        this.calendarService.getEvents(Date.now());
        this.calendarService.longEventsExpandEmitter.subscribe(function (day) {
            _this.view = 'day';
            _this.viewDate = day.date;
        });
    }
    Home.prototype.extractEvents = function () {
        var _this = this;
        this.events.forEach(function (x) {
            var lookup = _this.eventTypes.find(function (xx) { return xx.value === x.status; });
            if (!lookup) {
                _this.eventTypes.push({ value: x.status, name: x.status });
            }
        });
    };
    Home.prototype.eventTypeSelected = function (opt) {
        this.toastyService.eventTypeChanged.emit(opt);
        calendarutils_1.calendarutils.eventType = opt;
        this.events = calendarService_1.CalendarService.calEvents[opt];
    };
    Home.prototype.ngOnDestroy = function () {
        if (this.eventListener) {
            this.eventListener.unsubscribe();
        }
        if (this.eventArrivalSubscription) {
            this.eventArrivalSubscription.unsubscribe();
        }
    };
    Home.prototype.increment = function () {
        var addFn = {
            day: fns_1.fns.addDays,
            week: fns_1.fns.addWeeks,
            month: fns_1.fns.addMonths
        }[this.view];
        this.viewDate = addFn(this.viewDate, 1);
        this.calendarService.getEvents(this.viewDate);
    };
    Home.prototype.decrement = function () {
        var subFn = {
            day: fns_1.fns.subDays,
            week: fns_1.fns.subWeeks,
            month: fns_1.fns.subMonths
        }[this.view];
        this.viewDate = subFn(this.viewDate, 1);
        this.calendarService.getEvents(this.viewDate);
    };
    Home.prototype.today = function () {
        this.viewDate = new Date();
        this.calendarService.getEvents(this.viewDate);
    };
    Home.prototype.dayClicked = function (_a) {
        var date = _a.date, events = _a.events;
        //this.toastyService.clearAll();
        //events.forEach(x=>{this.showEventDetail(x.title)})
        if (fns_1.fns.isSameMonth(date, this.viewDate)) {
            if ((fns_1.fns.isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    };
    Home.prototype.showEventDetail = function (text) {
        var toastOptions = {
            title: this.options.title,
            msg: text,
            showClose: this.options.showClose,
            timeout: this.options.timeout,
            theme: this.options.theme,
            position: this.options.position,
            onAdd: function (toast) {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function (toast) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };
        this.options.type = 'wait';
        switch (this.options.type) {
            case 'default':
                this.toastyService.default(toastOptions);
                break;
            case 'info':
                this.toastyService.info(toastOptions);
                break;
            case 'success':
                this.toastyService.success(toastOptions);
                break;
            case 'wait':
                this.toastyService.wait(toastOptions);
                break;
            case 'error':
                this.toastyService.error(toastOptions);
                break;
            case 'warning':
                this.toastyService.warning(toastOptions);
                break;
        }
    };
    Home.prototype.showLongEvents = function (visibility) {
        if (visibility === 'show') {
            this.longEventsShowing = true;
        }
        else {
            this.longEventsShowing = false;
        }
    };
    Home = __decorate([
        core_1.Component({
            selector: 'home',
            template: require('./home.html')
        }), 
        __metadata('design:paramtypes', [navigationService_1.NavigationService, common_1.Location, calendarService_1.CalendarService, calendar_toast_service_1.CalendarToastyService])
    ], Home);
    return Home;
}());
exports.Home = Home;
//# sourceMappingURL=home.js.map