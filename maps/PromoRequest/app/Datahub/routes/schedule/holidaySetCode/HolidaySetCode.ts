import {Component, Pipe, PipeTransform} from 'angular2/core';
import {ViewChild} from "angular2/core";
import {ComponentsConfigService} from "../../../../ReusableServices/componentsConfigService";
import {TokenFilterPipe} from "../../../pipes/tokenFilter";
import {DisplayGridComponent} from "../../../../ReusableComponents/displayGrid/displayGrid";
import {AlertService} from "../../../../ReusableServices/alertService";
import {CustomRouterLink} from "../../../../ReusableDirectives/routerLink/routerLink";
import {SchedulesApiService} from "../scheduleService";


@Component({
    selector: 'schedule',
    template: '<div><displayGrid></displayGrid></div>',
    directives: [DisplayGridComponent, CustomRouterLink],
    pipes: [TokenFilterPipe],
    providers:[SchedulesApiService]
})
export class HolidaySetCode {
    holidaySetCodes:Array<any>;
    newHolidaySetCode:any = {};
    searchKey:string = "";
    controlConfig:any = this.compConfigService.ScheduleHolidaySetControlConfig;
    @ViewChild(DisplayGridComponent)
    private dataTable:DisplayGridComponent;

    constructor(private schedulesApi:SchedulesApiService, private alert:AlertService, private compConfigService:ComponentsConfigService) {
    }

    ngAfterViewInit() {
        this.refreshHolidaySetCodes();
    }

    refreshHolidaySetCodes() {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.schedulesApi, "holidaysetcode");

    }


}
