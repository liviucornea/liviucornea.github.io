import { Component, ViewChild } from "@angular/core";
import { DisplayGridComponent } from "../../../../../ReusableComponents/displayGrid/displayGrid";
import { ConnectionStringControlConfig } from "./connectionStringControlConfig";
import { AlertService } from "../../../../../ReusableServices/alertService";
import { ApiService } from "../../../../../ReusableServices/apiService";
import { matrixService } from "../../../../../ReusableServices/matrixService";
import { SettingsApiService } from "../settingsApiService";

@Component({
    selector: 'connectionString',
    template: `<div><displayGrid></displayGrid></div>`
})
export class ConnectionString {
    controlConfig: any = ConnectionStringControlConfig;
    @ViewChild(DisplayGridComponent)
    private dataTable: DisplayGridComponent;

    constructor(private settingsAPIService: SettingsApiService) {

    }

    ngAfterViewInit() {
        this.refreshConnectionStrings();
    }

    refreshConnectionStrings() {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.settingsAPIService, "connectionString");

    }
}
