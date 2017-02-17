import {Component, ViewChild} from "@angular/core";
import {DisplayGridComponent} from "../../../../../ReusableComponents/displayGrid/displayGrid";
import {AlertService} from "../../../../../ReusableServices/alertService";
import {SchedulesApiService} from "../scheduleService";
import {ControlConfig} from "./controlConfig";
import {Location} from "@angular/common"
import {NavigationService} from "../../../../../ReusableServices/navigationService";


@Component({
    template: "<div><displayGrid></displayGrid></div>",
    providers:[SchedulesApiService]
})
export class Config {
    searchKey:string = "";
    controlConfig:any = ControlConfig;
    @ViewChild(DisplayGridComponent)
    private dataTable:DisplayGridComponent;

    constructor(private schedulesApi:SchedulesApiService, private alert:AlertService, private navService:NavigationService, private location:Location) {
        //navService.setCurrentPage(location.path(false));
    }

    ngAfterViewInit() {
        this.refreshConfigs();
    }

    refreshConfigs() {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.schedulesApi, "config");
    }

}

