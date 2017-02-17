import { Component, ViewChild } from "@angular/core";
import { DisplayGridComponent } from "../../../../../ReusableComponents/displayGrid/displayGrid";
import { DefaultSettingsControlConfig } from "./defaultSettingsControlConfig";
import { AlertService } from "../../../../../ReusableServices/alertService";
import { ApiService } from "../../../../../ReusableServices/apiService";
import { matrixService } from "../../../../../ReusableServices/matrixService";
import { SettingsApiService } from "../settingsApiService";

@Component({
    selector: 'defaultSettings',
    template: `<div><displayGrid></displayGrid></div>`
})
export class DefaultSettings {
    controlConfig: any = DefaultSettingsControlConfig;
    @ViewChild(DisplayGridComponent)
    private dataTable: DisplayGridComponent;

    constructor(private settingsAPIService: SettingsApiService) {

    }

    ngAfterViewInit() {
        this.refreshConnectionStrings();
    }

    refreshConnectionStrings() {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.settingsAPIService, "defaultSettings");

    }
}
