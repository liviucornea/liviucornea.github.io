import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import {CustomRouterLink} from "../../../../ReusableDirectives/routerLink/routerLink";
import {NavBarVert} from "../../../../ReusableComponents/navbarVert/navbarVert";
import {NavItem} from "../../../../ReusableComponents/navbarVert/navItem";
import {RouterService} from "../../../../ReusableServices/routerService";
import {PostingsByDate} from './bloombergTrades/postingsByDate';

@RouteConfig([
    { name: 'Default', path: '/', redirectTo: ['PostingsByDate'] },
    { name: 'PostingsByDate', path: '/postingsByDate', component: PostingsByDate }
])

@Component({
    selector: 'tradeReports',
    templateUrl: 'app/Datahub/routes/applications/tradeReports/tradeReports.html',
    directives: [CustomRouterLink, RouterOutlet, NavBarVert],
})

export class TradeReports {
    navContent: NavItem[];
    routerService:RouterService;
    constructor(private routService:RouterService) {
        this.routerService=routService;
        var roles = [
            'apps'
        ];
        this.navContent = [
            new NavItem('Postings By Date', ['TradeReports', 'PostingsByDate'], '/postingsByDate', roles),
        ];
        this.routerService.setLeftNavigationItems(this.navContent);
    }
}