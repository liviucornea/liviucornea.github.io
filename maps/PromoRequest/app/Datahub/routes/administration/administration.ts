import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';

import {CustomRouterLink} from "../../../ReusableDirectives/routerLink/routerLink";
import {NavBarVert} from "../../../ReusableComponents/navbarVert/navbarVert";
import {RouterService} from "../../../ReusableServices/routerService";
import {NavItem} from "../../../ReusableComponents/navbarVert/navItem";
import {PromotionRequest} from "./promotionrequest/promotionrequest";

@RouteConfig([
    { name: 'Default', path: '/', redirectTo: ['PromotionRequestPage'] },
    { name: 'PromotionRequestPage', path: '/promotionrequest', component: PromotionRequest },
])

@Component({
    selector: 'auth',
    templateUrl: 'app/Datahub/routes/administration/administration.html',
    directives: [CustomRouterLink, RouterOutlet, NavBarVert],
})

export class Administration {
    routerService:RouterService;
    navContent: NavItem[];
    constructor(private routService:RouterService) {
        this.routerService=routService;
        var roles = [
            'admin'
        ];
        this.navContent = [
            new NavItem('PromotionRequest', ['Administration', 'PromotionRequestPage'], '/promotionrequest', roles)
        ];
        this.routerService.setLeftNavigationItems(this.navContent);
    }
}