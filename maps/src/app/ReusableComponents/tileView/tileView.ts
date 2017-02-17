import {
    Component, Input
} from '@angular/core';
import {Router} from "@angular/router";
import {NavigationService} from "../../ReusableServices/navigationService";



@Component({
    selector: 'tileView',
    //templateUrl: 'app/ReusableComponents/tabBuilder/tabBuilder.html',
    template: require('./tileView.html'),
})

export class TileView {

    @Input() menuItemsList: Array<any>=[];
    constructor(private router: Router, private navigationService: NavigationService)
    {

    }

    gotoChildItem(childItem)
    {
        this.router.navigate(childItem.RouteLink);
    }
}