import {Component, Pipe, PipeTransform} from 'angular2/core';
import {SchematicApiService} from '../schematicService';
import {TokenFilterPipe} from '../../../pipes/tokenFilter'
import {ViewChild} from "angular2/core";
import {DisplayGridComponent} from "../../../../ReusableComponents/displayGrid/displayGrid";
import {CustomRouterLink} from "../../../../ReusableDirectives/routerLink/routerLink";
import {AlertService} from "../../../../ReusableServices/alertService";
import {ComponentsConfigService} from "../../../../ReusableServices/componentsConfigService";


@Component({
    selector: 'process',
    template: "<div><displayGrid></displayGrid></div>",
    directives: [DisplayGridComponent, CustomRouterLink],
    pipes: [TokenFilterPipe],
    providers:[SchematicApiService]
})
export class Configuration {
    holidays:Array<any>;
    newHoliday:any = {};
    searchKey:string = "";
    controlConfig: any = this.compConfigService.ConfigunitControlConfig;
    @ViewChild(DisplayGridComponent)
    private dataTable:DisplayGridComponent;

    constructor(private processApi: SchematicApiService, private alert: AlertService, private compConfigService: ComponentsConfigService) {

    }

    ngAfterViewInit() {
        this.refreshConfigurationUnits();
    }

    refreshConfigurationUnits() {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.processApi, "unit");
    }


}
