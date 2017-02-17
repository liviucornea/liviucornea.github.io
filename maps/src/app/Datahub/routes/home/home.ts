
import {Component} from '@angular/core';
import {Location} from "@angular/common"

import {NavigationService} from "../../../ReusableServices/navigationService";
import {Router} from "@angular/router";
import {fns} from "./fns";
import {CalendarService} from "../../../ReusableServices/calendarService";
import {ToastOptions, ToastData} from "../../../ReusableServices/toasty.service";
import {CalendarToastyService} from "../../../ReusableServices/calendar.toast.service";
import {Subscription} from "rxjs";
import {calendarutils, CalendarEvent, EventAction as CalendarEventAction} from "./calendarutils";


@Component({
    selector: 'home',
    template: require('./home.html')
})

export class Home {
    router: Router;
    calendarService:CalendarService;
    toastyService:CalendarToastyService;
    options :any;
    eventListener: Subscription;
    eventArrivalSubscription:Subscription;
    changeTracker:boolean;
    eventTypes:Array<any>=new Array<any>();
    events: Array<CalendarEvent>=new Array<CalendarEvent>();
    activeDayIsOpen: boolean = true;
    view: string = 'month';
    viewDate: Date = new Date();
    private longEventsShowing: boolean = true;

    constructor(navigation: NavigationService, location: Location, calService:CalendarService, toastServ:CalendarToastyService) {
        this.toastyService=toastServ;
        this.options = {
            title: 'Toast It!',
            msg: 'Mmmm, tasties...',
            showClose: true,
            timeout: 5000,
            theme: this.toastyService.themes[1].code,
            type: this.toastyService.types[1].code
        };
        this.eventArrivalSubscription=this.toastyService.eventsArrival.subscribe(x=>{x.forEach(xx=> {
            this.showEventDetail(xx.title);
        })});
        //navigation.setCurrentPage(location.path(false));
        this.calendarService=calService;
        this.calendarService.eventsArrived.subscribe(()=> {
            this.changeTracker = !this.changeTracker;
            this.eventTypes = [];
            this.eventTypes.push({value: "All", name: "All"});
            this.events = CalendarService.calEvents["All"];
            if (this.events) {
                this.extractEvents();
            }
        });
        this.calendarService.getEvents(Date.now());

        this.calendarService.longEventsExpandEmitter.subscribe((day) => {
            this.view = 'day';
            this.viewDate = day.date;
        });
    }

    extractEvents(){
        this.events.forEach(x => {
            let lookup = this.eventTypes.find(xx => xx.value === x.status);
            if (!lookup) {
                this.eventTypes.push({value: x.status, name: x.status});
            }
        })
    }
    eventTypeSelected(opt){
        this.toastyService.eventTypeChanged.emit(opt);
        calendarutils.eventType=opt;
        this.events = CalendarService.calEvents[opt];
    }

    ngOnDestroy(): void {
        if (this.eventListener) {
            this.eventListener.unsubscribe();
        }
        if ( this.eventArrivalSubscription){
            this.eventArrivalSubscription.unsubscribe();
        }
    }

    actions: CalendarEventAction[] = [{
        label: '<i class="fa fa-fw fa-pencil"></i>',
        onClick: ({event}: {event: CalendarEvent}): void => {
            console.log('Edit event', event);
        }
    }, {
        label: '<i class="fa fa-fw fa-times"></i>',
        onClick: ({event}: {event: CalendarEvent}): void => {
            this.events = this.events.filter(iEvent => iEvent !== event);
        }
    }];

    increment(): void {

        const addFn: any = {
            day: fns.addDays,
            week: fns.addWeeks,
            month: fns.addMonths
        }[this.view];

        this.viewDate = addFn(this.viewDate, 1);
        this.calendarService.getEvents(this.viewDate);

    }

    decrement(): void {

        const subFn: any = {
            day: fns.subDays,
            week: fns.subWeeks,
            month: fns.subMonths
        }[this.view];

        this.viewDate = subFn(this.viewDate, 1);
        this.calendarService.getEvents(this.viewDate);

    }

    today(): void {
        this.viewDate = new Date();
        this.calendarService.getEvents(this.viewDate);
    }

    dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {
        //this.toastyService.clearAll();
        //events.forEach(x=>{this.showEventDetail(x.title)})
        if (fns.isSameMonth(date, this.viewDate)) {
            if (
                (fns.isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    }



    showEventDetail(text:string) {
        let toastOptions: ToastOptions = {
            title: this.options.title,
            msg: text,
            showClose: this.options.showClose,
            timeout: this.options.timeout,
            theme: this.options.theme,
            position: this.options.position,
            onAdd: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function(toast: ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };

        this.options.type='wait';
        switch (this.options.type) {
            case 'default': this.toastyService.default(toastOptions); break;
            case 'info': this.toastyService.info(toastOptions); break;
            case 'success': this.toastyService.success(toastOptions); break;
            case 'wait': this.toastyService.wait(toastOptions); break;
            case 'error': this.toastyService.error(toastOptions); break;
            case 'warning': this.toastyService.warning(toastOptions); break;
        }
    }

    private showLongEvents(visibility) {
        if (visibility === 'show') {
            this.longEventsShowing = true;
        }
        else {
            this.longEventsShowing = false;
        }
    }
}
