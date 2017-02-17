import {Component} from '@angular/core';
import {SchematicApiService} from '../schematicService';
import {ViewChild} from "@angular/core";
import {DisplayGridComponent} from "../../../../../ReusableComponents/displayGrid/displayGrid";
import {AlertService} from "../../../../../ReusableServices/alertService";
import {ConfigUnitControlConfig} from "./configurationControlConfig";
import {Location} from "@angular/common"
import {NavigationService} from "../../../../../ReusableServices/navigationService";

@Component({
    selector: 'process',
    template: "<div><displayGrid></displayGrid></div>",
    providers:[SchematicApiService]
})
export class Configuration {
    holidays:Array<any>;
    newHoliday:any = {};
    searchKey:string = "";
    controlConfig: any = ConfigUnitControlConfig;
    @ViewChild(DisplayGridComponent)
    private dataTable:DisplayGridComponent;

    constructor(private processApi: SchematicApiService, private alert: AlertService, private navService:NavigationService, private location:Location) {
        //navService.setCurrentPage(location.path(false));

    }

    ngAfterViewInit() {
        this.refreshConfigurationUnits();
    }

    refreshConfigurationUnits() {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.processApi, "unit");
    }


}
