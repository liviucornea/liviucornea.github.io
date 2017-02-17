import { Component, ViewChild } from "@angular/core";
import { DisplayGridComponent } from "../../../../../ReusableComponents/displayGrid/displayGrid";
import { EncryptionKeyringControlConfig } from "./encryptionKeyringControlConfig";
import {AlertService} from "../../../../../ReusableServices/alertService";
import {ApiService} from "../../../../../ReusableServices/apiService";
import {matrixService} from "../../../../../ReusableServices/matrixService";
import { SettingsApiService } from "../settingsApiService";

@Component({
    selector: 'encryptionKeyring',
    template:   `<div><displayGrid></displayGrid></div>`
})
export class EncryptionKeyring {
    controlConfig: any = EncryptionKeyringControlConfig;
    @ViewChild(DisplayGridComponent)
    private dataTable: DisplayGridComponent;

    constructor(private settingsAPIService: SettingsApiService) {

    }

    ngAfterViewInit() {
        this.refreshEncryptionKeyrings();
    }

    refreshEncryptionKeyrings() {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.settingsAPIService, "keyring");

    }
}
