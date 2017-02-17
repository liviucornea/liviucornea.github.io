import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import {HolidaySetCode} from './holidaySetCode/holidaySetCode';
import {Holiday} from './holiday/holiday';
import {Config} from './config/config';
import {CustomRouterLink} from "../../../ReusableDirectives/routerLink/routerLink";
import {NavBarVert} from "../../../ReusableComponents/navbarVert/navbarVert";
import {NavItem} from "../../../ReusableComponents/navbarVert/navItem";
import {RouterService} from "../../../ReusableServices/routerService";


@RouteConfig([
    { name: 'Default', path: '/', redirectTo: ['HolidaySetCode'] },
    { name: 'HolidaySetCode', path: '/holidaySetCode', component: HolidaySetCode },
    { name: 'Holiday', path: '/holiday', component: Holiday },
    { name: 'Config', path: '/config', component: Config }
])

@Component({
    selector: 'schedule',
    templateUrl: 'app/Datahub/routes/schedule/schedules.html',
    directives: [CustomRouterLink, RouterOutlet, NavBarVert],
})

export class Schedule {
    navContent: NavItem[];
    routerService:RouterService;
    constructor(private routService:RouterService) {
        this.routerService=routService;
        var roles = [
            'schedule'
        ];

        this.navContent = [
            new NavItem('Holiday Sets', ['Schedule', 'HolidaySetCode'], '/holidaySetCode', roles),
            new NavItem('Holidays', ['Schedule', 'Holiday'], '/holiday', roles),
            new NavItem('Schematic Config', ['Schedule', 'Config'], '/config', roles),
        ];
        this.routerService.setLeftNavigationItems(this.navContent);
    }
}