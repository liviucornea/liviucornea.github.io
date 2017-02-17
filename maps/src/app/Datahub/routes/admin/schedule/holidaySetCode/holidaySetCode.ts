import {Component, ViewChild} from "@angular/core";

import {DisplayGridComponent} from "../../../../../ReusableComponents/displayGrid/displayGrid";
import {SchedulesApiService} from "../scheduleService";
import {AlertService} from "../../../../../ReusableServices/alertService";
import {HolidaySetCodeControlConfig} from "./holidaySetCodeConfig";
import {Location} from "@angular/common"
import {NavigationService} from "../../../../../ReusableServices/navigationService";

@Component({
    selector: 'schedule',
    template: '<div><displayGrid></displayGrid></div>',
    //TODO:RF
    //directives: [DisplayGridComponent],
    //pipes: [TokenFilterPipe],
    providers:[SchedulesApiService]
})
export class HolidaySetCode {
    newHolidaySetCode:any = {};
    searchKey:string = "";
    //TODO:RF
    controlConfig:any = HolidaySetCodeControlConfig;
    @ViewChild(DisplayGridComponent)
    private dataTable:DisplayGridComponent;

    constructor(private schedulesApi:SchedulesApiService, private alert:AlertService, private navService:NavigationService, private location:Location) {
       // navService.setCurrentPage(location.path(false));
    }

    ngAfterViewInit() {
        this.refreshHolidaySetCodes();
    }

    refreshHolidaySetCodes() {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.schedulesApi, "holidaysetcode");

    }


}
