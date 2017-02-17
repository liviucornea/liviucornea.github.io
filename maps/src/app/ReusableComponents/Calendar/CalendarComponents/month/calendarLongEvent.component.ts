import {Component, Input, Output} from '@angular/core';
import {fns} from "../../../../Datahub/routes/home/fns";
import {calendarutils} from "../../../../Datahub/routes/home/calendarutils";
import {CalendarService} from "../../../../ReusableServices/calendarService";

@Component({
    selector: 'mwl-calendar-long-event',
    template: require('./calendarLongEvent.html')
})

export class CalendarLongEventComponent {

    @Input() event: any;
    @Input() startOfWeek: Date;
    @Output() visible: boolean = true;
    endOfWeek: Date;

    marginLeft: any;
    width: any;

    private static readonly monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    ngOnChanges() {
        this.endOfWeek = fns.endOfWeek(this.startOfWeek, 0);
        this.calculateDimensions();
    }

    private calculateDimensions() {

        if (this.event.start < this.startOfWeek || fns.isSameDay(this.event.start, this.startOfWeek)) {
            this.marginLeft = 0;
        }
        else {
            this.marginLeft = (100 / 7) * (this.event.start.getDay() - this.startOfWeek.getDay());
        }

        // calculate width
        if (this.event.start <= this.startOfWeek && this.event.end >= this.endOfWeek) {
            this.width = 100;
        } else {

            if (this.event.end > this.endOfWeek || fns.isSameDay(this.event.end, this.endOfWeek)) {
                this.width = 100 - this.marginLeft;
            } else {
                this.width = (100 / 7) * (this.event.end.getDay() + 1);
            }
        }
    }

    private getEventColor(status: string) {
        return calendarutils.getEventColor(status);
    }

    // todo: move to utils file?
    private formatDateShort(date: Date) {
        let month = CalendarLongEventComponent.monthsShort[date.getMonth()];
        let day = date.getUTCDate();

        return month + ' ' + day;
    }
}