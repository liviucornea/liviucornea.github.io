import {Component, Input} from '@angular/core'
//TODO:RF
//import {CORE_DIRECTIVES,} from '@angular/common'
import {RouterLink, Router} from "@angular/router";

import {NavigationService} from "../../ReusableServices/navigationService";
import {NavItem} from "./navItem";
import {LocalizationService} from "../../ReusableServices/localizationService";

@Component({
    selector: 'navBarVert',
    template: require('./navbarvert.html'),
})

export class NavBarVert {
    routerURL: string;
    items: Array<NavItem>=[];
    @Input() activeClass (item: any): string {
        if (item.Active) {
            return "list-group-item-info";
        }
        return "";
    };

    constructor(private _router: Router, private navigation: NavigationService, private localizationService: LocalizationService){
        this.navigation.navigationLeftMenuEmitter.subscribe(data => {
            this.items = this.navigation.buildNavigationMenu(data);
        });
    }

    activate(item) {
        var toggle = !item.Active;
        this.items.forEach(item => {
            item.Active = false;
        });
        item.Active = toggle;
    }
}
