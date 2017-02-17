import {Component, Injector} from 'angular2/core'
import {CORE_DIRECTIVES} from 'angular2/common'
import {Location, Router} from 'angular2/router'
import {CustomRouterLink} from '../../ReusableDirectives/routerLink/routerLink'
import {NavItem} from "./navItem";
import {RouterService} from "../../ReusableServices/routerService";


@Component({
    selector: 'navBarVert',
    templateUrl: 'app/ReusableComponents/navbarvert/navbarvert.html',
    directives: [CustomRouterLink, CORE_DIRECTIVES],
})

export class NavBarVert {
    items: Array<NavItem>=[];
    rtService:RouterService;
    constructor(private _location: Location, private routService:RouterService) {
        this.rtService=routService;
        this.items =this.rtService.navContent;
    }

    activate(item) {
        var toggle = !item.active;
        this.items.forEach(item => {
            item.active = false;
        });
        item.active = toggle;
    }

    isActive(item) {
        return this._location.path().toLowerCase() == item.Path.toLowerCase();
    }

    activeClass(item): string {
        if (this.isActive(item)) {
            return "active";
        }
        return "";
    }
}
