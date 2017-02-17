///<reference path="../../../../ReusableDirectives/routerLink/routerLink.ts"/>
import {Component, Pipe, PipeTransform} from 'angular2/core';
import {SchedulesApiService} from '../scheduleService';
import {TokenFilterPipe} from '../../../pipes/tokenFilter'
import {ViewChild} from "angular2/core";
import {DisplayGridComponent} from "../../../../ReusableComponents/displayGrid/displayGrid";
import {CustomRouterLink} from "../../../../ReusableDirectives/routerLink/routerLink";
import {AlertService} from "../../../../ReusableServices/alertService";
import {ComponentsConfigService} from "../../../../ReusableServices/componentsConfigService";


@Component({
    selector: 'schedule',
    //template: "<displayGrid></displayGrid>",
    template: "<div><displayGrid></displayGrid></div>",
    directives: [DisplayGridComponent, CustomRouterLink],
    pipes: [TokenFilterPipe],
    providers:[SchedulesApiService]
})
export class Config {
    configs:Array<any>;
    newConfig:any;
    searchKey:string = "";
    controlConfig:any = this.compConfigService.ScheduleConfigControlConfig;
    @ViewChild(DisplayGridComponent)
    private dataTable:DisplayGridComponent;

    constructor(private schedulesApi:SchedulesApiService, private alert:AlertService, private compConfigService:ComponentsConfigService) {

    }

    ngAfterViewInit() {
        this.refreshConfigs();
    }

    refreshConfigs() {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.schedulesApi, "config");
    }

}

