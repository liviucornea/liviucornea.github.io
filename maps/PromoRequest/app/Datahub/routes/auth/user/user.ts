import {Component, Pipe, PipeTransform} from 'angular2/core';;
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
    directives: [DisplayGridComponent, CustomRouterLink],
    pipes: [TokenFilterPipe],
})
export class AuthUser {
    users:Array<any>;
    newUser:any = {};
    searchKey:string = "";
    controlConfig:any = this.componentsConfigService.AuthUserControlConfig;
    @ViewChild(DisplayGridComponent)
    private dataTable:DisplayGridComponent;


    constructor(private api:ApiService, private alert:AlertService, private componentsConfigService:ComponentsConfigService) {
    }

    ngAfterViewInit() {
        this.refreshUsers();
    }

    refreshUsers() {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.api, "user");
    }
}
