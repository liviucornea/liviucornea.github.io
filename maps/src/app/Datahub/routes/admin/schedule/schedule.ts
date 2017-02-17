import { Component} from '@angular/core';
import {Location} from "@angular/common"
import {NavigationService} from "../../../../ReusableServices/navigationService";

@Component({
    selector: 'schedule',
    template: ``
})

export class Schedule {
    constructor(private navService:NavigationService, private location:Location) {
        /*this.navService.getChildMenu(['Admin','Schedule']);
        this.navService.getLeftMenuRoutes(['Schedule']);
        navService.setCurrentPage(location.path(false));*/
    }
}