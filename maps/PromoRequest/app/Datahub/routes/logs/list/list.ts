import {Component, Pipe, PipeTransform } from 'angular2/core';
import {TokenFilterPipe} from '../../../pipes/tokenFilter'
import {ViewChild} from "angular2/core";
import {DisplayGridComponent} from "../../../../ReusableComponents/displayGrid/displayGrid";
import {CustomRouterLink} from "../../../../ReusableDirectives/routerLink/routerLink";
import {ApiService} from "../../../../ReusableServices/apiService";
import {ComponentsConfigService} from "../../../../ReusableServices/componentsConfigService";


@Component({
    selector: 'logs',
    template: "<div><displayGrid></displayGrid></div>",
    directives: [DisplayGridComponent, CustomRouterLink],
    pipes: [TokenFilterPipe],
})
export class List {
    controlConfig: any = this.compConfigService.LogsControlConfig.theParent;
    @ViewChild(DisplayGridComponent)
    private dataTable:DisplayGridComponent;

    constructor(private _apiService: ApiService, private compConfigService: ComponentsConfigService) {
        //private _api: ApiService,
    }

    ngAfterViewInit() {
        this.refreshLogs();
    }

    refreshLogs() {
        this.dataTable.GetParentPageDetails(this.controlConfig, this._apiService, "logs");

    }


}
