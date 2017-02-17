import {Component} from '@angular/core';
import {NavigationService} from "../../../../ReusableServices/navigationService";

@Component({
    selector: 'schematic',
    template: ``,

})

export class Schematic {

    constructor(private navService:NavigationService) {
       /* this.navService.getChildMenu(['Admin','Schematic']);
        this.navService.getLeftMenuRoutes(['Schematic']);*/
    }
}