import { Component} from '@angular/core';
import {Location} from "@angular/common"


import {NavigationService} from "../../../../ReusableServices/navigationService";

@Component({
    selector: 'auth',
    template: ``,
})

export class Auth {
    constructor(private navService:NavigationService, location:Location) {
        /*this.navService.getChildMenu(['Admin','Auth']);
        navService.setCurrentPage(location.path(false));*/
       /* let links=this.navService.getLeftMenuRoutes(['Auth']);
        navService.NavigateToPage(links,null);*/
    }
}