import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import {CustomRouterLink} from "../../../../ReusableDirectives/routerLink/routerLink";
import {NavBarVert} from "../../../../ReusableComponents/navbarVert/navbarVert";
import {NavItem} from "../../../../ReusableComponents/navbarVert/navItem";
import {RouterService} from "../../../../ReusableServices/routerService";
import {BenchMarkIndex} from "./benchMarkIndex/benchMarkIndex";

@RouteConfig([
    { name: 'Default', path: '/', redirectTo: ['BenchMarkIndex'] },
    { name: 'BenchMarkIndex', path: '/benchMarkIndex', component: BenchMarkIndex }
])

@Component({
    selector: 'tools',
    templateUrl: 'app/Datahub/routes/applications/tools/tools.html',
    directives: [CustomRouterLink, RouterOutlet, NavBarVert],
})

export class Tools {
    navContent: NavItem[];
    routerService:RouterService;
    constructor(private routService:RouterService) {
        this.routerService=routService;
        var roles = [
            'apps'
        ];
        this.navContent = [
            new NavItem('BenchMark Index', ['Tools', 'BenchMarkIndex'], '/benchMarkIndex', roles)
        ];
        this.routerService.setLeftNavigationItems(this.navContent);
    }
}