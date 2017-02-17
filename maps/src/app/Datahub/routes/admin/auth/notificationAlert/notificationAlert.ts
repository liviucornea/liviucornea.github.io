import {Component, ViewChild} from "@angular/core";
import {DisplayGridComponent} from "../../../../../ReusableComponents/displayGrid/displayGrid";
import {NotificationAlertControlConfig} from "./notificationAlertControlConfig";
import {AdminAuthApiService} from "../adminAuthApiService";


@Component({
    selector: 'notificationAlert',
    template: '<div><displayGrid></displayGrid></div>'
})
export class NotificationAlert {
    controlConfig:any = NotificationAlertControlConfig;
    @ViewChild(DisplayGridComponent)
    private dataTable:DisplayGridComponent;

    constructor(private adminAuthApiService: AdminAuthApiService) {

    }

    ngAfterViewInit() {
        this.refreshAlerts();
    }

    refreshAlerts() {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.adminAuthApiService, "alert");
    }
}
