import {Component, Pipe, PipeTransform} from 'angular2/core';
import {TokenFilterPipe} from '../../../pipes/tokenFilter'
import {ViewChild} from "angular2/core";
import {DisplayGridComponent} from "../../../../ReusableComponents/displayGrid/displayGrid";
import {CustomRouterLink} from "../../../../ReusableDirectives/routerLink/routerLink";
import {ApiService} from "../../../../ReusableServices/apiService";
import {AlertService} from "../../../../ReusableServices/alertService";
import {ComponentsConfigService} from "../../../../ReusableServices/componentsConfigService";


@Component({
    selector: 'auth',
    template: '<div><displayGrid></displayGrid></div>',
    directives: [DisplayGridComponent,CustomRouterLink],
    pipes: [TokenFilterPipe],
})
export class NotificationAlert {
    api: ApiService;
    alert: AlertService;
    roles: Array<any>;
    newRole: any = {};
    searchKey: string = "";
    controlConfig:any= this.componentsConfigService.NotificationAlertControlConfig;
    @ViewChild(DisplayGridComponent)
    private dataTable:DisplayGridComponent;

    constructor(private ap: ApiService,private alt: AlertService, private componentsConfigService: ComponentsConfigService) {
        this.api = ap;
        this.alert = alt;
    }

    ngAfterViewInit() {
        this.refreshAlerts();
    }

    refreshAlerts() {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.api, "alert");
    }
}
