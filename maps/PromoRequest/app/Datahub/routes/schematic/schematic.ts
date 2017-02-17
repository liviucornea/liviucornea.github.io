import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import {Configuration} from './configuration/configuration';
import {SchematicDesigner} from "./Designer/schematicDesigner";
import{SchematicExecution} from "./Execution/SchematicExecution";
import {TestJsonPlugin} from "./jsonPlugin/testJsonPlugin";
import {CustomRouterLink} from "../../../ReusableDirectives/routerLink/routerLink";
import {NavBarVert} from "../../../ReusableComponents/navbarVert/navbarVert";
import {NavItem} from "../../../ReusableComponents/navbarVert/navItem";
import {RouterService} from "../../../ReusableServices/routerService";


@RouteConfig([
    { name: 'Default', path: '/', redirectTo: ['Configuration'] },
    { name: 'Configuration', path: '/configuration', component: Configuration },
    { name: 'Designer', path: '/designer', component: SchematicDesigner },
    { name: 'Execution', path: '/schematicExecution', component: SchematicExecution  },
    { name: 'Testjson', path: '/testJson', component:TestJsonPlugin}
])

@Component({
    selector: 'schematic',
    templateUrl: 'app/Datahub/routes/schematic/schematic.html',
    directives: [CustomRouterLink, RouterOutlet, NavBarVert],
})

export class Schematic {
    navContent: NavItem[];
    routerService:RouterService;
    constructor(private routService:RouterService) {
        this.routerService=routService;
        var roles = [
            'process'
        ];
        var n1= new NavItem('Configuration', ['Schematic', 'Configuration'], '/configuration', roles);
        var n2= new NavItem('Schematic Designer', ['Schematic', 'Designer'], '/designer', roles);
        var n3= new NavItem('Schematic Execution',['Schematic','Execution'],'/schematicExecution',roles);
        var n4= new NavItem('Test Json Plugin', ['Schematic', 'Testjson'], '/testJsonPlugin', roles);
        this.navContent= [n1,n2,n3,n4];
        this.routerService.setLeftNavigationItems(this.navContent);
    }
}