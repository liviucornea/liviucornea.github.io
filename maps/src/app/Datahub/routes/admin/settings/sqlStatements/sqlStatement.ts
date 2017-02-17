import {Component, ViewChild} from "@angular/core";
import { DisplayGridComponent } from "../../../../../ReusableComponents/displayGrid/displayGrid";
import {AlertService} from "../../../../../ReusableServices/alertService";
import {ApiService} from "../../../../../ReusableServices/apiService";
import {matrixService} from "../../../../../ReusableServices/matrixService";
import { SettingsApiService } from "../settingsApiService";
import {SqlStatementControlConfig} from "./SqlStatementControlConfig";


@Component({
    selector:  'sqlstatements',
    template:   `<div><displayGrid></displayGrid></div>`
})

export class SqlStatements {
 
    controlConfig: any = SqlStatementControlConfig;
    @ViewChild(DisplayGridComponent)
    private dataTable: DisplayGridComponent;

    constructor(private settingsAPIService: SettingsApiService) {

    }

    ngAfterViewInit() {
        this.refreshSqlStatements();
    }

    refreshSqlStatements() {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.settingsAPIService, "sqlstatement");

    }
  
}
