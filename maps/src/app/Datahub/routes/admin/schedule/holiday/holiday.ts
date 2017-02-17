import {Component, ViewChild} from "@angular/core";
import {DisplayGridComponent} from "../../../../../ReusableComponents/displayGrid/displayGrid";
import {SchedulesApiService} from "../scheduleService";
import {AlertService} from "../../../../../ReusableServices/alertService";
import {HolidayControlConfig} from "./holidayControlConfig";
import {Location} from "@angular/common"
import {NavigationService} from "../../../../../ReusableServices/navigationService";

@Component({
    selector: 'schedule',
    template: "<div><displayGrid></displayGrid></div>",
    providers:[SchedulesApiService]
})
export class Holiday {
    newHoliday:any = {};
    searchKey:string = "";
    controlConfig:any = HolidayControlConfig;
    @ViewChild(DisplayGridComponent)
    private dataTable:DisplayGridComponent;

    constructor(private schedulesApi:SchedulesApiService, private alert:AlertService, private navService:NavigationService, private location:Location) {
     //   navService.setCurrentPage(location.path(false));
    }

    ngAfterViewInit() {
        this.refreshHolidays();
    }

    refreshHolidays() {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.schedulesApi, "holiday");

    }


}
