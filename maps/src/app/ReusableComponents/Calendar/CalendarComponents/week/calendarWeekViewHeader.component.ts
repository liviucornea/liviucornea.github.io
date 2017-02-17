import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
//import { WeekDay } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-week-view-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <strong>{{ day.date | calendarDate:'weekViewColumnHeader':locale }}</strong><br>
    <span>{{ day.date | calendarDate:'weekViewColumnSubHeader':locale }}</span>
  `,
  host: {
    '[class]': '"cal-header"',
    '[class.cal-past]': 'day.isPast',
    '[class.cal-today]': 'day.isToday',
    '[class.cal-future]': 'day.isFuture',
    '[class.cal-weekend]': 'day.isWeekend'
  }
})
export class CalendarWeekViewHeaderComponent {

  @Input() day: any;

  @Input() locale: string;

}