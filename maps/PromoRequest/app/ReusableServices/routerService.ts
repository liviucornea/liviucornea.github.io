import {Injectable, Output, EventEmitter} from "angular2/core";

import {AlertService} from "./alertService";
import {ApiService} from "./apiService";
import {AppSettingsService} from "./appSettingsService";
import {RouteRegistry} from "angular2/router";

@Injectable()
export class RouterService {
    alert:AlertService;
    appSettingsService:any;
    navContent:Array<any>;
    nameExpression: any;
    routerLinkExpression:any;
    pathExpression:any;
    roleExpression:any;
    routeArray:Array<any>;

    @Output() OnNavContentChange = new EventEmitter();

    constructor(private altService:AlertService,private appSettingsSrv: AppSettingsService,private registry: RouteRegistry) {
        this.alert = altService;
        this.appSettingsService = appSettingsSrv;
        this.nameExpression = /^[A-Z][a-zA-Z ]{3,}$/;
        this.routerLinkExpression = /^[A-Z][a-zA-Z ]{3,}$/;
        this.pathExpression = /^\/[a-zA-Z ]{3,}$/;
        this.roleExpression = /^[a-zA-Z ]{4,}$/;
    }

    setLeftNavigationItems(navItems:Array<any>){

        let nameExpression=this.nameExpression;
        let routerLinkExpression=this.routerLinkExpression;
        let pathExpression=this.pathExpression;
        let roleExpression=this.pathExpression;
        try{
            if (this.validateNavItems(navItems)) {
                navItems.forEach(function (navItem) {
                    if (!nameExpression.test(navItem.Name)) {
                        return;
                    }
                    navItem.RouteLink.forEach(function (rl) {
                        if (!routerLinkExpression.test(rl)) {
                            return;
                        }
                    })
                    if (!pathExpression.test(navItem.Path)) {
                        return;
                    }
                    navItem.Roles.forEach(function (role) {
                        if (!roleExpression.test(role)) {
                            return;
                        }
                    })
                })
                this.navContent = navItems;
            }
        }
        catch(exception){return;}
    }

    validateNavItems(navItems){
        return true;
    }
}

