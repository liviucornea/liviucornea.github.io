import {Component, ViewChild} from "@angular/core";
import {DisplayGridComponent} from "../../../../../ReusableComponents/displayGrid/displayGrid";
import {RoleControlConfig} from "./roleControlConfig";
import {AdminAuthApiService} from "../adminAuthApiService";

@Component({
    selector: 'auth',
    template: '<div><displayGrid></displayGrid></div>',
})
export class AuthRole {
    controlConfig:any = RoleControlConfig;
    @ViewChild(DisplayGridComponent)
    private dataTable:DisplayGridComponent;

    constructor(private adminAuthApiService: AdminAuthApiService) {

    }

    ngAfterViewInit() {
        this.refreshRoles();
    }

    refreshRoles() {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.adminAuthApiService, "role");
    }
}
