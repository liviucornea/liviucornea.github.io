"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var calendarDayView_component_1 = require("./CalendarComponents/day/calendarDayView.component");
var calendarWeekView_component_1 = require("./CalendarComponents/week/calendarWeekView.component");
var calendarEventTitle_component_1 = require("./CalendarComponents/common/calendarEventTitle.component");
var calendarMonthView_component_1 = require("./CalendarComponents/month/calendarMonthView.component");
var calendarEventActions_component_1 = require("./CalendarComponents/common/calendarEventActions.component");
var calendarMonthCell_component_1 = require("./CalendarComponents/month/calendarMonthCell.component");
var calendarOpenDayEvents_component_1 = require("./CalendarComponents/month/calendarOpenDayEvents.component");
var calendarWeekViewHeader_component_1 = require("./CalendarComponents/week/calendarWeekViewHeader.component");
var calendarWeekViewEvent_component_1 = require("./CalendarComponents/week/calendarWeekViewEvent.component");
var calendarAllDayEvent_component_1 = require("./CalendarComponents/day/calendarAllDayEvent.component");
var calendarDayViewHourSegment_component_1 = require("./CalendarComponents/day/calendarDayViewHourSegment.component");
var calendarDayViewEvent_component_1 = require("./CalendarComponents/day/calendarDayViewEvent.component");
var calendarTooltip_directive_1 = require("./CalendarComponents/calendarTooltip.directive");
var calendarDate_pipe_1 = require("../../Datahub/pipes/calendarDate.pipe");
var calendarDateFormatter_provider_1 = require("./CalendarHelpers/calendarDateFormatter.provider");
var calendarEventTitle_pipe_1 = require('../../Datahub/pipes/calendarEventTitle.pipe');
var calendarEventTitle_provider_1 = require('./CalendarHelpers/calendarEventTitle.provider');
var forms_1 = require("@angular/forms");
var calendarService_1 = require("../../ReusableServices/calendarService");
var CalendarModule = (function () {
    function CalendarModule() {
    }
    CalendarModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule],
            declarations: [
                calendarDayView_component_1.CalendarDayViewComponent,
                calendarWeekView_component_1.CalendarWeekViewComponent,
                calendarMonthView_component_1.CalendarMonthViewComponent,
                calendarEventActions_component_1.CalendarEventActionsComponent,
                calendarEventTitle_component_1.CalendarEventTitleComponent,
                calendarMonthCell_component_1.CalendarMonthCellComponent,
                calendarOpenDayEvents_component_1.CalendarOpenDayEventsComponent,
                calendarWeekViewHeader_component_1.CalendarWeekViewHeaderComponent,
                calendarWeekViewEvent_component_1.CalendarWeekViewEventComponent,
                calendarAllDayEvent_component_1.CalendarAllDayEventComponent,
                calendarDayViewHourSegment_component_1.CalendarDayViewHourSegmentComponent,
                calendarDayViewEvent_component_1.CalendarDayViewEventComponent,
                calendarTooltip_directive_1.CalendarTooltipWindowComponent,
                calendarTooltip_directive_1.CalendarTooltipDirective,
                calendarDate_pipe_1.CalendarDate,
                calendarEventTitle_pipe_1.CalendarEventTitle
            ],
            exports: [calendarDayView_component_1.CalendarDayViewComponent,
                calendarWeekView_component_1.CalendarWeekViewComponent,
                calendarMonthView_component_1.CalendarMonthViewComponent,
                calendarEventActions_component_1.CalendarEventActionsComponent,
                calendarEventTitle_component_1.CalendarEventTitleComponent,
                calendarMonthCell_component_1.CalendarMonthCellComponent,
                calendarOpenDayEvents_component_1.CalendarOpenDayEventsComponent,
                calendarWeekViewHeader_component_1.CalendarWeekViewHeaderComponent,
                calendarWeekViewEvent_component_1.CalendarWeekViewEventComponent,
                calendarAllDayEvent_component_1.CalendarAllDayEventComponent,
                calendarDayViewHourSegment_component_1.CalendarDayViewHourSegmentComponent,
                calendarDayViewEvent_component_1.CalendarDayViewEventComponent,
                calendarTooltip_directive_1.CalendarTooltipWindowComponent,
                calendarTooltip_directive_1.CalendarTooltipDirective,
                calendarDate_pipe_1.CalendarDate,
                calendarEventTitle_pipe_1.CalendarEventTitle],
            entryComponents: [calendarTooltip_directive_1.CalendarTooltipWindowComponent],
            providers: [
                calendarEventTitle_provider_1.CalendarEventTitle,
                calendarDateFormatter_provider_1.CalendarDateFormatter, calendarService_1.CalendarService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarModule);
    return CalendarModule;
}());
exports.CalendarModule = CalendarModule;
//# sourceMappingURL=calendar.Module.js.map