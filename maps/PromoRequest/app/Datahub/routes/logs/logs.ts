import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import {List} from './list/list';
import {CustomRouterLink} from "../../../ReusableDirectives/routerLink/routerLink";
import {NavBarVert} from "../../../ReusableComponents/navbarVert/navbarVert";
import {NavItem} from "../../../ReusableComponents/navbarVert/navItem";
import {RouterService} from "../../../ReusableServices/routerService";


@RouteConfig([
    { name: 'Default', path: '/', redirectTo: ['List'] },
    { name: 'List', path: '/list', component: List }
])
@Component({
    selector: 'logs',
    templateUrl: 'app/Datahub/routes/logs/logs.html',
    directives: [CustomRouterLink, RouterOutlet, NavBarVert],
})
export class Logs {
    navContent: NavItem[];
    routerService:RouterService;
    constructor(private routService:RouterService) {
        this.routerService=routService;
        var roles = [
            'logs'
        ];

        this.navContent = [
            new NavItem('List', ['Logs', 'List'], '/list', roles)//,
        ];
        this.routerService.setLeftNavigationItems(this.navContent);
    }
}