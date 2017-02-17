import {Component} from "@angular/core";
import {NavigationService} from "../../../../ReusableServices/navigationService";
import {Location} from "@angular/common";

@Component({
    selector: 'tools',
    template: ``
})

export class Tools {
    constructor(private navService:NavigationService, private location:Location) {
        /*this.navService.getChildMenu(['Applications','Tools']);
        navService.setCurrentPage(location.path(false));
        let links= this.navService.getLeftMenuRoutes(['Tools']);
        this.navService.NavigateToPage(links,null);*/
    }
}
