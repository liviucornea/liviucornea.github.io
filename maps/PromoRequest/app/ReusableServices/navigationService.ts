import {Injectable, EventEmitter} from "angular2/core";
import {RouteRegistry} from "angular2/router";
import {Home} from "../Datahub/routes/home/home";
import {Contact} from "../Datahub/routes/contact/contact";
import {Logs} from "../Datahub/routes/logs/logs";
import {Auth} from "../Datahub/routes/auth/auth";
import {Schedule} from "../Datahub/routes/schedule/schedule";
import {Tools} from "../Datahub/routes/applications/tools/tools";
import {TradeReports} from "../Datahub/routes/applications/tradeReports/tradeReports";
import {ExceptionReports} from "../Datahub/routes/applications/exceptionReports/exceptionReports";
import {NoAuth} from "../Datahub/routes/noAuth/noAuth";
import {Test} from "../Datahub/routes/test/test";
import {Schematic} from "../Datahub/routes/schematic/schematic";
import {configBuilder} from "../Datahub/routes/configBuilder/configBuilder";
//
// Project specific routes
//
import {EtfCreationRedemption} from "../EMT/EtfCreationRedemption/etfCreationRedemption";
import {TradeAnalysis} from "../EMT/EtfCreationRedemption/tradeAnalysis/tradeAnalysis";

import {Administration} from "../Datahub/routes/administration/administration";
import {treeViewBuilder} from "../Datahub/routes/treeViewBuilder/treeViewBuilder";



@Injectable()
export class NavigationService {

    mainPageNavigationArray:Array<any>;
    tenantNavigationArray:Array<any>;
    public navigationCb: EventEmitter<any>;

    constructor(){
        this.navigationCb= new EventEmitter<any>();
        this.mainPageNavigationArray=[
            { name: 'Home', path: '/home', component: Home },
            { name: 'Contact', path: '/contact', component: Contact },
            { name: 'ConfigBuilder', path: '/configBuilder', component: configBuilder },
            { name: 'TreeView', path: '/TreeView', component: treeViewBuilder }
        ];
    }
    getMainPageNavigation(){
        return this.mainPageNavigationArray;
    }

    getTenantRoutes(tenantName:string):Array<any>{
        this.tenantNavigationArray= new Array();
        switch (tenantName){
            case "Datahub":
                this.tenantNavigationArray.push({ name: 'Administration', path: '/administration/...', component: Administration });
                this.tenantNavigationArray.push({ name: 'Logs', path: '/logs/...', component: Logs });
                this.tenantNavigationArray.push({ name: 'Auth', path: '/auth/...', component: Auth });
                this.tenantNavigationArray.push({ name: 'Schedule', path: '/schedule/...', component: Schedule });
                this.tenantNavigationArray.push({ name: 'Schematic', path: '/schematic/...', component: Schematic });
                break;
            case "EMT":
                this.tenantNavigationArray.push({ name: 'EtfCreationRedemption', path: '/etfcr', component: EtfCreationRedemption });
                this.tenantNavigationArray.push({ name: 'TradeAnalysis', path: '/etfcr/trades/06-07-2016', component: TradeAnalysis });
                break;
            case "Applications":
                this.tenantNavigationArray.push({ name: 'Tools', path: '/applications/tools/...', component: Tools });
                this.tenantNavigationArray.push({ name: 'TradeReports', path: '/applications/tradeReports/...', component: TradeReports });
                this.tenantNavigationArray.push({ name: 'ExceptionReports', path: '/applications/exceptionReports/...', component: ExceptionReports });
                break;
        }
        this.navigationCb.emit(this.tenantNavigationArray);
        return this.tenantNavigationArray;
    }

    addConfig(navigationArray:Array<any>,routeConfig:any,registry:any,component:any){
        for (var routeEntry in navigationArray) {
            var routeNode = navigationArray[routeEntry];
            routeConfig.configs.push(routeNode);
            registry.config(component, routeNode);
        }
    }

    getRoutes(component:any) {
        var reflection:any=Reflect;
        return reflection.getMetadata('annotations', component)
            .filter(a => {
                return a.constructor.name === 'RouteConfig';
            }).pop();
    }

    updateRouteConfig(component:any, routeConfig) {
        var reflection:any=Reflect;
        let annotations = reflection.getMetadata('annotations', component);
        let routeConfigIndex = -1;
        for (let i = 0; i < annotations.length; i += 1) {
            if (annotations[i].constructor.name === 'RouteConfig') {
                routeConfigIndex = i;
                break;
            }
        }
        if (routeConfigIndex < 0) {
            throw new Error('No route metadata attached to the component');
        }
        annotations[routeConfigIndex] = routeConfig;
        reflection.defineMetadata('annotations', annotations, this.constructor);
    }
}
