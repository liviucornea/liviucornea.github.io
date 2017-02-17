import {Component} from "@angular/core";
import {ViewChild} from "@angular/core";
import {DisplayGridComponent} from "../../../../ReusableComponents/displayGrid/displayGrid";
import {LogsControlConfig} from "./logsControlConfig";
import {AdminApiService} from "../adminApiService";

@Component({
    selector: 'logs',
    template: "<div><displayGrid></displayGrid></div>"
})

export class Logs {
    controlConfig: any = LogsControlConfig;
    @ViewChild(DisplayGridComponent)
    private dataTable:DisplayGridComponent;

    constructor(private adminApiService: AdminApiService) {

    }

    ngAfterViewInit() {
        this.refreshLogs();
    }

    refreshLogs() {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.adminApiService, "logs");

    }
}
