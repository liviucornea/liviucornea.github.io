import {Component, ViewChild} from "@angular/core";
import {DisplayGridComponent} from "../../../../../ReusableComponents/displayGrid/displayGrid";
import {MenuItemControlConfig} from "./menuItemControlConfig";
import {AdminApiService} from "../../adminApiService";
@Component({
    selector: 'menuItem',
    template: '<div><displayGrid></displayGrid></div>',
})
export class MenuItem {

    controlConfig:any = MenuItemControlConfig;
    @ViewChild(DisplayGridComponent)
    private dataTable:DisplayGridComponent;


    constructor(private adminApiService: AdminApiService) {

    }

    ngAfterViewInit() {
        this.refreshUsers();
    }

    refreshUsers() {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.adminApiService, "menuitem");
    }
}
