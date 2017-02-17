import {Component, ViewChild} from "@angular/core";
import {DisplayGridComponent} from "../../../../../ReusableComponents/displayGrid/displayGrid";
import {AlertService} from "../../../../../ReusableServices/alertService";
import {LanguageControlConfig} from "./languageControlConfig";
import {LocalizationService} from "../../../../../ReusableServices/localizationService";
import {NavigationService} from "../../../../../ReusableServices/navigationService";
import {Location} from "@angular/common";

@Component({
    selector: 'language',
    template: "<div><displayGrid></displayGrid></div>",

})
export class Language {
    alert: AlertService;
    searchKey:string = "";
    controlConfig:any = LanguageControlConfig;
    @ViewChild(DisplayGridComponent)
    private dataTable:DisplayGridComponent;

    constructor(private navService: NavigationService, private localizationApi:LocalizationService, private alt:AlertService, private location:Location) {
        this.alert = alt;
       // navService.setCurrentPage(location.path(false));
    }

    ngAfterViewInit() {
        this.refresh();
    }

    refresh() {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.localizationApi, "language");

    }
}
