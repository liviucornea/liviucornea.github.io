import {Component, ViewChild} from "@angular/core";
import {DisplayGridComponent} from "../../../../../ReusableComponents/displayGrid/displayGrid";
import {ResourceControlConfig} from "./resourceControlConfig";
import {AdminAuthApiService} from "../adminAuthApiService";

@Component({
    selector: 'authResource',
    template: '<div><displayGrid></displayGrid></div>',
})
export class AuthResource {

    controlConfig:any = ResourceControlConfig;

    @ViewChild(DisplayGridComponent)
    private dataTable:DisplayGridComponent;

    constructor(private adminAuthApiService: AdminAuthApiService) {
    }

    ngAfterViewInit() {
        this.refreshResources();
    }

    refreshResources() {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.adminAuthApiService, "resource");
    }

}