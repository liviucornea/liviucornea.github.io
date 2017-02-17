import {Component} from 'angular2/core';

import {Router, RouterOutlet, RouteConfig} from 'angular2/router'
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';

import {navBar} from './ReusableComponents/navbar/navbar';
import {AlertService} from './ReusableServices/alertService';
import {Notification} from "./ReusableComponents/notification/notification";

// Routes + Components
import {RouteRegistry} from "angular2/router";
import {NavigationService} from "./ReusableServices/navigationService";
import {Contact} from "./Datahub/routes/contact/contact";
import {Home} from "./Datahub/routes/home/home";
import {ConfigBuilder} from "./ReusableServices/configBuilder";
import {configBuilder} from "./Datahub/routes/configBuilder/configBuilder";
import {treeViewBuilder} from "./Datahub/routes/treeViewBuilder/treeViewBuilder";

@RouteConfig([
    { name: 'Home', path: '/home', component: Home },
    { name: 'Contact', path: '/contact', component: Contact },
    { name: 'ConfigBuilder', path: '/configBuilder', component: configBuilder },
    { name: 'TreeView', path: '/TreeView', component: treeViewBuilder},
])

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.html',
    directives: [RouterOutlet, Alert, navBar, Notification],
})

export class App {
    alert:AlertService;
    router:Router;
    navigation:NavigationService;
    registry:RouteRegistry;
    tenants:Array<any>=new Array();
    tenantSelected:boolean=false;
    conBuilder:ConfigBuilder;

    constructor(private alt:AlertService,private rt:Router, private rgs:RouteRegistry,private nav:NavigationService, cf:ConfigBuilder) {
        this.conBuilder=cf;
        this.alert = alt;
        this.router = rt;
        this.navigation=nav;
        this.registry=rgs;
        this.tenantSelected=false;
        this.tenants.push({name:"EMT"});
        this.tenants.push({name:"Datahub"});
        this.tenants.push({name:"Mutual Funds"});
        this.tenants.push({name:"Applications"});
    }

    gotoTenant(tenant){
        this.tenantSelected=true;
        var tenantRoutes= this.navigation.getTenantRoutes(tenant.name);
        var routeConfig = this.navigation.getRoutes(this.constructor);
        this.navigation.addConfig(tenantRoutes,routeConfig,this.registry,this.constructor)
        this.navigation.updateRouteConfig(this.constructor, routeConfig);
    }
}