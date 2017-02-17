import {Component} from '@angular/core';
import {NavigationService} from "../../ReusableServices/navigationService";
import {Location} from '@angular/common';

@Component({
    selector: 'breadcrumb',
    template: require('./breadcrumb.html'),
})

export class BreadCrumb {

    breadCrumbList: Array<any>;

    constructor( private navigation: NavigationService,
        private loc: Location) {

        this.navigation.bredCrumbEmitter.subscribe(data => {
            this.breadCrumbList = data;
        });
    }
}