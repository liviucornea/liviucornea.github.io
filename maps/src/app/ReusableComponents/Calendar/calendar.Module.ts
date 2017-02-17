
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarDayViewComponent} from "./CalendarComponents/day/calendarDayView.component";
import {CalendarWeekViewComponent} from "./CalendarComponents/week/calendarWeekView.component";
import {CalendarEventTitleComponent} from "./CalendarComponents/common/calendarEventTitle.component";
import {CalendarMonthViewComponent} from "./CalendarComponents/month/calendarMonthView.component";
import {CalendarEventActionsComponent} from "./CalendarComponents/common/calendarEventActions.component";
import {CalendarMonthCellComponent} from "./CalendarComponents/month/calendarMonthCell.component";
import {CalendarOpenDayEventsComponent} from "./CalendarComponents/month/calendarOpenDayEvents.component";
import {CalendarWeekViewHeaderComponent} from "./CalendarComponents/week/calendarWeekViewHeader.component";
import {CalendarWeekViewEventComponent} from "./CalendarComponents/week/calendarWeekViewEvent.component";
import {CalendarAllDayEventComponent} from "./CalendarComponents/day/calendarAllDayEvent.component";
import {CalendarDayViewHourSegmentComponent} from "./CalendarComponents/day/calendarDayViewHourSegment.component";
import {CalendarDayViewEventComponent} from "./CalendarComponents/day/calendarDayViewEvent.component";
import {CalendarTooltipWindowComponent, CalendarTooltipDirective} from "./CalendarComponents/calendarTooltip.directive";
import {CalendarDate} from "../../Datahub/pipes/calendarDate.pipe";
import {CalendarDateFormatter} from "./CalendarHelpers/calendarDateFormatter.provider";
import { CalendarEventTitle as CalendarEventTitlePipe } from '../../Datahub/pipes/calendarEventTitle.pipe';
import { CalendarEventTitle as CalendarEventTitleProvider } from './CalendarHelpers/calendarEventTitle.provider';
import {FormsModule} from "@angular/forms";
import {CalendarService} from "../../ReusableServices/calendarService";
import {CalendarLongEventComponent} from "./CalendarComponents/month/calendarLongEvent.component";

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [
        CalendarDayViewComponent,
        CalendarWeekViewComponent,
        CalendarMonthViewComponent,
        CalendarEventActionsComponent,
        CalendarEventTitleComponent,
        CalendarMonthCellComponent,
        CalendarOpenDayEventsComponent,
        CalendarWeekViewHeaderComponent,
        CalendarWeekViewEventComponent,
        CalendarAllDayEventComponent,
        CalendarDayViewHourSegmentComponent,
        CalendarDayViewEventComponent,
        CalendarTooltipWindowComponent,
        CalendarTooltipDirective,
        CalendarDate,
        CalendarEventTitlePipe,
        CalendarLongEventComponent
    ],
    exports: [CalendarDayViewComponent,
        CalendarWeekViewComponent,
        CalendarMonthViewComponent,
        CalendarEventActionsComponent,
        CalendarEventTitleComponent,
        CalendarMonthCellComponent,
        CalendarOpenDayEventsComponent,
        CalendarWeekViewHeaderComponent,
        CalendarWeekViewEventComponent,
        CalendarAllDayEventComponent,
        CalendarDayViewHourSegmentComponent,
        CalendarDayViewEventComponent,
        CalendarTooltipWindowComponent,
        CalendarTooltipDirective,
        CalendarDate,
        CalendarEventTitlePipe,
        CalendarLongEventComponent
    ],
    entryComponents: [CalendarTooltipWindowComponent],
    providers: [
        CalendarEventTitleProvider,
        CalendarDateFormatter,CalendarService
    ]
})
export class CalendarModule {


}