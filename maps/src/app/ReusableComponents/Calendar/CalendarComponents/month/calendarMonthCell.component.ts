import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges} from '@angular/core';
import {CalendarToastyService} from "../../../../ReusableServices/calendar.toast.service";
import {calendarutils} from "../../../../Datahub/routes/home/calendarutils";
import {CalendarService} from "../../../../ReusableServices/calendarService";

@Component({
    selector: 'mwl-calendar-month-cell',
    changeDetection: ChangeDetectionStrategy.OnPush,
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
})
export class CalendarMonthCellComponent implements OnChanges {

    @Input() day: any;
    @Input() openDay: any;
    @Input() locale: string;
    @Input() tooltipPlacement: string;
    @Input() longEventsShowing: boolean;
    @Output() highlightDay: EventEmitter<any> = new EventEmitter();

    fatalBadge: number;
    okBadge: number;
    futureBadge: number;
    badges: any;
    // badgeStyles: Array<string>;
    toastyService: CalendarToastyService;

    constructor(toastServ: CalendarToastyService, private calServ: CalendarService) {
        this.toastyService = toastServ;
    }

    ngOnChanges(changes: any): void {
        this.fatalBadge = 0;
        this.okBadge = 0;
        this.futureBadge = 0;
        if (changes.day) {
            var test = this.day.badgeTotal;
            if (test > 0) {
                this.badges = new Array<any>()
                this.day.events.forEach(x => {
                    var lookup = this.badges.find(xx => xx.status === x.status);
                    if (lookup) {
                        lookup.badgeTotal++;
                        lookup.badgeEvents.push(x)
                    }
                    else {
                        this.badges.push({
                            status: x.status,
                            badgeEvents: [x],
                            badgeTotal: 1,
                        })
                    }
                });
            }
        }
    }

    longEventsArrowClicked(day : Date) {
        this.calServ.longEventsExpandEmitter.next(day);
    }

    dayEventClicked(badge: any) {
        this.toastyService.eventsArrival.emit(badge.badgeEvents);
    }

    private getEventColor(status: string) {
        return calendarutils.getEventColor(status);
    }

    private getLongEvents(events: any) {
        return calendarutils.getLongEvents(events);
    }
}