import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import {CustomRouterLink} from "../../../../ReusableDirectives/routerLink/routerLink";
import {NavBarVert} from "../../../../ReusableComponents/navbarVert/navbarVert";
import {NavItem} from "../../../../ReusableComponents/navbarVert/navItem";
import {RouterService} from "../../../../ReusableServices/routerService";
import {NewSecurities} from './bloombergTrades/newSecurities';

@RouteConfig([
    { name: 'Default', path: '/', redirectTo: ['NewSecurities'] },
    { name: 'NewSecurities', path: '/newSecurities', component: NewSecurities }
])

@Component({
    selector: 'exceptionReports',
    templateUrl: 'app/Datahub/routes/applications/exceptionReports/exceptionReports.html',
    directives: [CustomRouterLink, RouterOutlet, NavBarVert],
})

export class ExceptionReports {
    navContent: NavItem[];
    routerService:RouterService;
    constructor(private routService:RouterService) {
        this.routerService=routService;
        var roles = [
            'apps'
        ];
        this.navContent = [
            new NavItem('New Securities', ['ExceptionReports', 'NewSecurities'], '/newSecurities', roles),
        ];
        this.routerService.setLeftNavigationItems(this.navContent);
    }
}