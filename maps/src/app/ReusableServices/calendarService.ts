import {Injectable, EventEmitter} from '@angular/core';
import {HttpAbstract} from './httpAbstract';
import {AppSettingsService} from './appSettingsService';
import {fns} from '../Datahub/routes/home/fns';
import {Subject} from "rxjs";
import {calendarutils} from "../Datahub/routes/home/calendarutils";


const colors: any = {
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

export enum calendarMode {
    standard, fourWeeks
}


@Injectable()
export class CalendarService {
    public static calEvents: any;
    public static selectedSalendarMode: calendarMode;
    eventsArrived: EventEmitter<any>;
    proxy: any;
    baseUrl: string;
    home: number;

    public longEventsExpandEmitter: Subject<any>;

    constructor(httpAbs: HttpAbstract, appSer: AppSettingsService) {
        this.eventsArrived = new EventEmitter();
        this.baseUrl = appSer.appSettings.apiSettings.apiURL_BASE + '/api/tdam/datahub/ae';
        httpAbs.setBaseAddress(this.baseUrl);
        this.proxy = httpAbs;

        this.home = 0;
        this.eventsArrived = new EventEmitter<any>();
        // Set the calendar mode
        CalendarService.selectedSalendarMode = calendarMode.fourWeeks;
        this.longEventsExpandEmitter = new Subject<any>();
    }

    registerHome(): number {
        this.home++;
        return this.home;
    }

    getEvents(inputDate: any) {
        CalendarService.calEvents = Object.create(Object.prototype);
        let endOfMonth;
        let startOfMonth;
        switch (CalendarService.selectedSalendarMode) {
            case calendarMode.fourWeeks:
                endOfMonth = fns.addWeeks(inputDate, 2).toISOString().substring(0, 10);
                startOfMonth = fns.removeWeeks(inputDate, 2).toISOString().substring(0, 10);
                break;
            case calendarMode.standard:
                endOfMonth = fns.endOfMonth(inputDate).toISOString().substring(0, 10);
                startOfMonth = fns.startOfMonth(inputDate).toISOString().substring(0, 10);
                break;
            default:
                break;
        }
        this.proxy.setBaseAddress(this.baseUrl);
        let calUrl = '/auth/calendar/enginehistory?from=' + startOfMonth + '&to=' + endOfMonth;
        let calUrl1 = '/auth/calendar/pendingqueue?from=' + startOfMonth + '&to=' + endOfMonth;
        let result = this.proxy.fetchMultiple([calUrl, calUrl1]);
        result.subscribe(x => {
            let resultSet1 = this.buildCalendarEvents(false, x[0], CalendarService.calEvents);
            let resultSet2 = this.buildCalendarEvents(true, x[1], CalendarService.calEvents);
            this.eventsArrived.emit(CalendarService.calEvents);
        });
    }

    buildCalendarEvents(futureEvents: boolean, input: Array<any>, calEvents: any): any {
        input.forEach(xx => {
            var eventObj = xx.EventData;
            var theColor;

            let status: string;
            if (futureEvents) {
                status = 'Future';
            } else {
                status = eventObj.Status;
            }
            if (!calEvents[status]) {
                calEvents[status] = new Array<any>();
            }
            if (!calEvents['All']) {
                calEvents['All'] = new Array<any>();
            }
            let startDate;
            let endDate;
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

            let inputEvent = ({
                start: startDate,
                end: endDate,
                title: name,
                engineType: eventObj.EngineType,
                id: eventObj.Id,
                status: status,
                color: theColor,
                islongEvent: false
            });

            if (calendarutils.islongEvent(inputEvent)) {
                inputEvent.islongEvent = true;
            }

            calEvents[status].push(inputEvent);
            calEvents["All"].push(inputEvent);
        });
        // console.log("calEvents");
        // console.log(calEvents);
        return calEvents;
    }
}

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

