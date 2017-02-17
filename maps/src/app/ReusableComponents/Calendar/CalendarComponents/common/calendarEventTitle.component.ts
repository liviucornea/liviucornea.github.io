import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
//import { CalendarEvent } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-event-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      class="cal-event-title"
      href="test"
      [innerHTML]="event | calendarEventTitle:view">
    </a>
  `
})
export class CalendarEventTitleComponent {

  @Input() event: any;

  @Input() view: string;

}