import {Component, ViewChild} from "@angular/core";
import { DisplayGridComponent } from "../../../../../ReusableComponents/displayGrid/displayGrid";
import {AlertService} from "../../../../../ReusableServices/alertService";
import {ApiService} from "../../../../../ReusableServices/apiService";
import {matrixService} from "../../../../../ReusableServices/matrixService";
import { SettingsApiService } from "../settingsApiService";
import {AppConfigurationControlConfig} from "./AppConfigurationControlConfig";


@Component({
    selector:  'appconfiguration',
    template:   `<div><displayGrid></displayGrid></div>`
})

export class AppConfiguration {
 
    controlConfig: any = AppConfigurationControlConfig;
    @ViewChild(DisplayGridComponent)
    private dataTable: DisplayGridComponent;

    constructor(private settingsAPIService: SettingsApiService) {

    }

    ngAfterViewInit() {
        this.refreshAppConfigurations();
    }

    refreshAppConfigurations() {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.settingsAPIService, "configuration");

    }
  
}
