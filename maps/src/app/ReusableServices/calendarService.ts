import {Injectable, EventEmitter} from "@angular/core";
import {HttpAbstract} from "./httpAbstract";
import {AppSettingsService} from "./appSettingsService";
import {fns} from "../Datahub/routes/home/fns";


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

export enum calendarMode{
    standard,fourWeeks
}


@Injectable()
export class CalendarService {
    eventsArrived:EventEmitter<any>;
    proxy:any;
    baseUrl:string;
    home:number;
    public static calEvents:any;
    public static selectedSalendarMode:calendarMode;

    constructor(httpAbs:HttpAbstract,appSer:AppSettingsService) {
        this.eventsArrived= new EventEmitter();
        this.baseUrl=appSer.appSettings.apiSettings.apiURL_BASE + '/api/tdam/datahub/ae';
        httpAbs.setBaseAddress(this.baseUrl);
        this.proxy=httpAbs;

        this.home=0;
        this.eventsArrived= new EventEmitter<any>();
        // Set the calendar mode
        CalendarService.selectedSalendarMode=calendarMode.fourWeeks;
    }

    registerHome():number{
        this.home++;
        return this.home;
    }

    getEvents(inputDate:any){
        CalendarService.calEvents = Object.create(Object.prototype);
        var endOfMonth;
        var startOfMonth
        switch (CalendarService.selectedSalendarMode){
            case calendarMode.fourWeeks:
                endOfMonth=fns.addWeeks(inputDate,2).toISOString().substring(0, 10);
                startOfMonth= fns.removeWeeks(inputDate,2).toISOString().substring(0, 10);
                break;
            case calendarMode.standard:
                endOfMonth=fns.endOfMonth(inputDate).toISOString().substring(0, 10);
                startOfMonth= fns.startOfMonth(inputDate).toISOString().substring(0, 10);
                break;
        }
        this.proxy.setBaseAddress(this.baseUrl);
        var calUrl="/auth/calendar/enginehistory?from="+startOfMonth+"&to="+endOfMonth;
        var calUrl1="/auth/calendar/pendingqueue?from="+startOfMonth+"&to="+endOfMonth;
        let result = this.proxy.fetchMultiple([calUrl,calUrl1]);
        result.subscribe(x=> {
            var resultSet1 = this.buildCaldendarEvents(false, x[0],CalendarService.calEvents);
            var resultSet2 = this.buildCaldendarEvents(true, x[1],CalendarService.calEvents);
            this.eventsArrived.emit(CalendarService.calEvents);
        });
    }

    buildCaldendarEvents(futureEvents: boolean, input: Array<any>, calEvents:any): any {
        input.forEach(xx=> {
            var eventObj = xx.EventData;
            var theColor;

            var status:string;
            if (futureEvents){
                status="Future";
            }else{
                status=eventObj.Status;
            }
            if (!calEvents[status]) {
                calEvents[status] = new Array<any>();
            }
            if (!calEvents["All"]){
                calEvents["All"]= new Array<any>();
            }
            var startDate;
            var endDate;
            if (eventObj.Start) {
                startDate = new Date(eventObj.Start);
            }
            if (eventObj.End) {
                endDate = new Date(eventObj.End);
            }

            switch (status.toLowerCase()){
                case "ok":
                    theColor=colors.green;
                    break;
                case "fatal":
                    theColor=colors.red;
                    break;
                case "future":
                    theColor=colors.blue;
                    break;
                default:
                    theColor=colors.green;
            }

            var name = eventObj.Name;
            calEvents[status].push({
                start: startDate,
                end: endDate,
                title: name,
                engineType: eventObj.EngineType,
                id: eventObj.Id,
                status: status,
                color: theColor
            });
            calEvents["All"].push({
                start: startDate,
                end: endDate,
                title: name,
                engineType: eventObj.EngineType,
                id: eventObj.Id,
                status: status,
                color: theColor
            });
        });
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

