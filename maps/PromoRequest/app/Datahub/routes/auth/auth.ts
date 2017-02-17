import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';


import {AuthUser} from './user/user';
import {AuthRole} from './role/role';
import {AuthResource} from './resource/resource';
import {NotificationAlert} from './notificationAlert/notificationAlert';
import {CustomRouterLink} from "../../../ReusableDirectives/routerLink/routerLink";
import {NavBarVert} from "../../../ReusableComponents/navbarVert/navbarVert";
import {RouterService} from "../../../ReusableServices/routerService";
import {NavItem} from "../../../ReusableComponents/navbarVert/navItem";

@RouteConfig([
    { name: 'Default', path: '/', redirectTo: ['User'] },
    { name: 'User', path: '/user', component: AuthUser },
    { name: 'Role', path: '/role', component: AuthRole },
    { name: 'Resource', path: '/resource', component: AuthResource },
    { name: 'NotificationAlert', path: '/notificationAlert', component: NotificationAlert }
])

@Component({
    selector: 'auth',
    templateUrl: 'app/Datahub/routes/auth/auth.html',
    directives: [CustomRouterLink, RouterOutlet, NavBarVert],
})

export class Auth {
    routerService:RouterService;
    navContent: NavItem[];
    constructor(private routService:RouterService) {
        this.routerService=routService;
        var roles = [
            'auth'
        ];
        this.navContent = [
            new NavItem('User', ['Auth', 'User'], '/user', roles),
            new NavItem('Role', ['Auth', 'Role'], '/role', roles),
            new NavItem('Resource', ['Auth', 'Resource'], '/resource', roles),
            new NavItem('Notification Alerts', ['Auth', 'NotificationAlert'], '/notificationAlert', roles)
        ];
        this.routerService.setLeftNavigationItems(this.navContent);
    }
}