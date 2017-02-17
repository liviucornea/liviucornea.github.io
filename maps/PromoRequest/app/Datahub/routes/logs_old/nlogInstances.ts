import {Component} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS, BrowserXhr} from 'angular2/http'
import {CORE_DIRECTIVES} from 'angular2/common'
import {Router, Location} from 'angular2/router'
import {ViewChild} from "angular2/core";
import {DisplayGridComponent} from "../../../ReusableComponents/displayGrid/displayGrid";
import {CustomRouterLink} from "../../../ReusableDirectives/routerLink/routerLink";
import {ApiService} from "../../../ReusableServices/apiService";
import {AlertService} from "../../../ReusableServices/alertService";
import {ComponentsConfigService} from "../../../ReusableServices/componentsConfigService";

@Component({
    selector: 'nlogInstances',
    //templateUrl: 'app/Datahub/routes/logs/nlogInstances.html',
    template: '<section><div class="row"><div class="col-xs-1">&nbsp;</div><div class="col-md-11"><tdamDataTable></tdamDataTable></div></div></section>',
    directives: [DisplayGridComponent, CustomRouterLink],
    //pipes: [TokenFilterPipe],
})
export class NlogInstances {

    //nlogInstances: Array<any>;
    //nlogInstancesPaged: Array<Object>;
    //totalItems: number = 0;
    //itemsPerPage: number = 10;
    //currentPage: number = 0;
    controlConfig:any= this.componentsConfigService.LogsControlConfig;

    @ViewChild(DisplayGridComponent)
    private dataTable:DisplayGridComponent;

    constructor(private _api: ApiService, private _alert: AlertService,
       //private _auth: AuthService,
        //private _router: Router//, private _location: Location,
        private componentsConfigService: ComponentsConfigService) {
        //this.refresh();
    }

    ngAfterViewInit() {
        this.refreshLogs();
    }

    //refreshLogs() {
    //     this.dataTable.GetParentPageDetails(this.controlConfig, this._api, "logs");
    //}

    refreshLogs() {
        this._api.getNlogInstance()
            .subscribe(
            res => {
                //this.dataTable.injectConfigAndData(this.controlConfig, res, this._api, "logs",false);
                this.showLogs(res);
            },
            error => {
                this._alert.error("async error #" + error.status);
            },
            () => { }
            );
    }

    showLogs(res: any) {
        this.dataTable.injectConfigAndData(this.controlConfig, res, this._api, "logs", false);
    }

}