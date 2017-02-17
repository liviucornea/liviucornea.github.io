import {Component, ViewChild} from "@angular/core";
import {DisplayGridComponent} from "../../../../../ReusableComponents/displayGrid/displayGrid";
import {AlertService} from "../../../../../ReusableServices/alertService";
import {ValueSetControlConfig} from "./valueSetControlConfig";
import {LocalizationService} from "../../../../../ReusableServices/localizationService";
import {NavigationService} from "../../../../../ReusableServices/navigationService";
import {Location} from "@angular/common";

@Component({
    selector: 'valueSet',
    template: "<div><displayGrid></displayGrid></div>",

})
export class ValueSet {
    alert: AlertService;
    searchKey:string = "";
    newValueSet:any = {};
    controlConfig:any = ValueSetControlConfig;
    @ViewChild(DisplayGridComponent)
    private dataTable:DisplayGridComponent;

    constructor(private navService: NavigationService, private localizationApi:LocalizationService, private alt:AlertService, private location:Location)
    {
        this.alert = alt;
       // navService.setCurrentPage(location.path(false));
    }

    ngAfterViewInit() {
        this.refresh();
    }

    refresh() {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.localizationApi, "valueSet");

    }


}
