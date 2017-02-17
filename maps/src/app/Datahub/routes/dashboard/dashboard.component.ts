import {Component, ViewEncapsulation, ViewChild} from '@angular/core';
import {DisplayGridComponent} from "../../../ReusableComponents/displayGrid/displayGrid";
import {LogsControlConfig} from "../admin/logs/logsControlConfig";
import {AdminApiService} from "../admin/adminApiService";

@Component({
    selector: 'dashboard',
    encapsulation: ViewEncapsulation.None,
    template: require('./dashboard.html')
})
export class Dashboard {
    controlConfig: any = LogsControlConfig;
    @ViewChild(DisplayGridComponent)
    private dataTable: DisplayGridComponent;

    constructor(private apiService: AdminApiService) {
    }

    ngAfterViewInit() {
        this.refreshLogs();
    }

    refreshLogs() {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.apiService, "logs");
    }
}