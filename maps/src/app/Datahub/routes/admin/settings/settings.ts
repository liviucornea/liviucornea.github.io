import { Component} from '@angular/core';
import {Location} from "@angular/common"


import {NavigationService} from "../../../../ReusableServices/navigationService";

@Component({
    selector: 'settings',
    template: ``,
})

export class Settings {
    constructor(private navService:NavigationService, location:Location) {
    }
}