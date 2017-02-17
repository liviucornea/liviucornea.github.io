import {Component} from 'angular2/core';
import {Router, RouteConfig} from 'angular2/router'
import {CustomRouterLink} from "../../../ReusableDirectives/routerLink/routerLink";


@Component({
    selector: 'login',
    templateUrl: 'app/Datahub/routes/home/home.html',
    styleUrls: ['resources/Datahub/assets/default.css'],
    directives: [CustomRouterLink],
})
export class Home {
    router: Router;

    constructor(private rout: Router) {
        this.router = rout;
    }
}