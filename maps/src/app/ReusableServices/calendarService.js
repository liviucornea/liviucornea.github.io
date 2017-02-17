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
var httpAbstract_1 = require('./httpAbstract');
var appSettingsService_1 = require('./appSettingsService');
var fns_1 = require('../Datahub/routes/home/fns');
var rxjs_1 = require("rxjs");
var calendarutils_1 = require("../Datahub/routes/home/calendarutils");
var colors = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    green: {
        primary: 'LightGreen',
        secondary: 'LightGreen'
    }
};
(function (calendarMode) {
    calendarMode[calendarMode["standard"] = 0] = "standard";
    calendarMode[calendarMode["fourWeeks"] = 1] = "fourWeeks";
})(exports.calendarMode || (exports.calendarMode = {}));
var calendarMode = exports.calendarMode;
var CalendarService = (function () {
    function CalendarService(httpAbs, appSer) {
        this.eventsArrived = new core_1.EventEmitter();
        this.baseUrl = appSer.appSettings.apiSettings.apiURL_BASE + '/api/tdam/datahub/ae';
        httpAbs.setBaseAddress(this.baseUrl);
        this.proxy = httpAbs;
        this.home = 0;
        this.eventsArrived = new core_1.EventEmitter();
        // Set the calendar mode
        CalendarService.selectedSalendarMode = calendarMode.fourWeeks;
        this.longEventsExpandEmitter = new rxjs_1.Subject();
    }
    CalendarService.prototype.registerHome = function () {
        this.home++;
        return this.home;
    };
    CalendarService.prototype.getEvents = function (inputDate) {
        var _this = this;
        CalendarService.calEvents = Object.create(Object.prototype);
        var endOfMonth;
        var startOfMonth;
        switch (CalendarService.selectedSalendarMode) {
            case calendarMode.fourWeeks:
                endOfMonth = fns_1.fns.addWeeks(inputDate, 2).toISOString().substring(0, 10);
                startOfMonth = fns_1.fns.removeWeeks(inputDate, 2).toISOString().substring(0, 10);
                break;
            case calendarMode.standard:
                endOfMonth = fns_1.fns.endOfMonth(inputDate).toISOString().substring(0, 10);
                startOfMonth = fns_1.fns.startOfMonth(inputDate).toISOString().substring(0, 10);
                break;
            default:
                break;
        }
        this.proxy.setBaseAddress(this.baseUrl);
        var calUrl = '/auth/calendar/enginehistory?from=' + startOfMonth + '&to=' + endOfMonth;
        var calUrl1 = '/auth/calendar/pendingqueue?from=' + startOfMonth + '&to=' + endOfMonth;
        var result = this.proxy.fetchMultiple([calUrl, calUrl1]);
        result.subscribe(function (x) {
            var resultSet1 = _this.buildCalendarEvents(false, x[0], CalendarService.calEvents);
            var resultSet2 = _this.buildCalendarEvents(true, x[1], CalendarService.calEvents);
            _this.eventsArrived.emit(CalendarService.calEvents);
        });
    };
    CalendarService.prototype.buildCalendarEvents = function (futureEvents, input, calEvents) {
        input.forEach(function (xx) {
            var eventObj = xx.EventData;
            var theColor;
            var status;
            if (futureEvents) {
                status = 'Future';
            }
            else {
                status = eventObj.Status;
            }
            if (!calEvents[status]) {
                calEvents[status] = new Array();
            }
            if (!calEvents['All']) {
                calEvents['All'] = new Array();
            }
            var startDate;
            var endDate;
            if (eventObj.Start) {
                startDate = new Date(eventObj.Start);
            }
            if (eventObj.End) {
                endDate = new Date(eventObj.End);
            }
            switch (status.toLowerCase()) {
                case 'ok':
                    theColor = colors.green;
                    break;
                case 'fatal':
                    theColor = colors.red;
                    break;
                case 'future':
                    theColor = colors.blue;
                    break;
                default:
                    theColor = colors.green;
            }
            var name = eventObj.Name;
            var inputEvent = ({
                start: startDate,
                end: endDate,
                title: name,
                engineType: eventObj.EngineType,
                id: eventObj.Id,
                status: status,
                color: theColor,
                islongEvent: false
            });
            if (calendarutils_1.calendarutils.islongEvent(inputEvent)) {
                inputEvent.islongEvent = true;
            }
            calEvents[status].push(inputEvent);
            calEvents["All"].push(inputEvent);
        });
        // console.log("calEvents");
        // console.log(calEvents);
        return calEvents;
    };
    CalendarService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [httpAbstract_1.HttpAbstract, appSettingsService_1.AppSettingsService])
    ], CalendarService);
    return CalendarService;
}());
exports.CalendarService = CalendarService;
/*[{
 start: fns.subDays(fns.startOfDay(new Date()), 1),
 end: fns.addDays(new Date(), 1),
 title: 'A 3 day event',
 color: colors.red,
 actions: this.actions
 }, {
 start: fns.startOfDay(new Date()),
 title: 'An event with no end date',
 color: colors.yellow,
 actions: this.actions
 }, {
 start: fns.subDays(fns.endOfMonth(new Date()), 3),
 end: fns.addDays(fns.endOfMonth(new Date()), 3),
 title: 'A long event that spans 2 months',
 color: colors.blue
 }];*/
//# sourceMappingURL=calendarService.js.map