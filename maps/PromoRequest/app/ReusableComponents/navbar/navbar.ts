import {Component} from 'angular2/core';
import {Location, Router} from 'angular2/router';
import {CustomRouterLink} from '../../ReusableDirectives/routerLink/routerLink'
import {AlertService} from '../../ReusableServices/alertService'
import {ApiService} from '../../ReusableServices/apiService'
import {AppNotificationsMSG} from '../../ReusableServices/appSettings'
import {ElementRef} from "angular2/core";
import {DynamicComponentLoader} from "angular2/core";
import {NavItem} from "../navbarVert/navItem";
import {NavigationService} from "../../ReusableServices/navigationService";

@Component({
    selector: 'navBar',
    templateUrl: 'app/ReusableComponents/navbar/navbar.html',
    directives: [CustomRouterLink]
})

export class navBar {
    api:ApiService;
    alert:AlertService;
    location:Location;
    router:Router;
    dc:DynamicComponentLoader;
    elemRef:ElementRef;
    links:Array<any>;
    routeName:string = "Home";
    userName:string = "Guest";
    userId:number;
    canShowAlert:boolean = false;
    showAlertWindow:boolean = false;
    alertInfo:any;
    navigation:NavigationService;
    routerLinkMap:Array<any>;

    constructor(private alt:AlertService, private apiS:ApiService, private loc:Location, private rt:Router, private elementRef:ElementRef, private dcl:DynamicComponentLoader, private nav:NavigationService) {
        this.alert = alt;
        this.api = apiS;
        this.location = loc;
        this.router = rt;
        this.elemRef = elementRef;
        this.dc = dcl;
        this.navigation = nav;
        var array = this.navigation.getMainPageNavigation();
        this.navigation.navigationCb.subscribe(data => {
            this.links = this.buildNavigation(data);
        });
        this.router.subscribe(
            (route:string) => {
                var index = route.indexOf("/");
                index = index == -1 ? route.length : index;
                this.routeName = route[0].toUpperCase() + route.substring(1, index);
            });

        this.getUserName();
        this.routerLinkMap = [
            {name: "Home", routerLink: ['Home'], role: []},
            {name: "TreeView", routerLink: ['TreeView'], role: []},
            {name: "ConfigBuilder", routerLink: ['ConfigBuilder'], role: []},
            {name: "Contact", routerLink: ['Contact'], role: []},
            {name: "Administration", routerLink: ['Administration', 'PromotionRequestPage'], role: ['admin']},
            {name: "Logs", routerLink: ['Logs', 'List'], role: ['logs']},
            {name: "Auth", routerLink: ['Auth', 'User'], role: ['auth']},
            {name: "Schedule", routerLink: ['Schedule', 'HolidaySetCode'], role: ['schedule']},
            {name: "Schematic", routerLink: ['Schematic', 'Configuration'], role: ['schematic']},
            {name: "EtfCreationRedemption", routerLink: ['EtfCreationRedemption'], role:[]},
            {name: "TradeAnalysis", routerLink: ['TradeAnalysis'], role:[]},
            {name: "Tools", routerLink: ['Tools', 'BenchMarkIndex'], role: ['apps']},
            {name: "TradeReports", routerLink: ['TradeReports', 'PostingsByDate'], role: ['apps']},
            {name: "ExceptionReports", routerLink: ['ExceptionReports', 'NewSecurities'], role: ['apps']},
        ];
        this.links = this.buildNavigation(array);
    }

    buildNavigation(injectedArray):Array<any> {
        var map = this.routerLinkMap;
        var links = new Array<any>();
        var tenantArray = injectedArray;
        tenantArray.forEach(function (x) {
            var match = map.find(function (xx) {
                return x.name === xx.name
            });
            if (match) {
                var node = new NavItem(match.name, match.routerLink, match.roles, []);
                links.push(node);
            }
        });
        return links;
    }

    getUserName() {
        this.api.getAuthCurrentUser()
            .subscribe(
                res => {
                    this.setUserNameAndUserId(res);
                },
                error => {
                    this.alert.error(AppNotificationsMSG.apiMsg.apiGetUserInfo + '   ' + error.status);
                },
                () => {
                }
            );
    }

    getActiveClass(path):string {
        if (this.location.path().toLowerCase() == path.toLowerCase()) {
            return "active";
        }
    }


    setUserNameAndUserId(res) {
        this.userName = res.Login;
        this.userId = res.Id;
        /*this.getAlerts();
         let timer = Observable.timer(20000,10000);
         timer.subscribe(t=> {
         this.getAlerts();
         });*/
    }

    getAlerts() {
        if (this.userId > 0) {
            this.api.getLatestAlert(this.userId).subscribe(
                res => {
                    this.showAlert(res);
                },
                error => {
                    this.alert.error(AppNotificationsMSG.apiMsg.apiGetUserInfo + '   ' + error.status);
                },
                () => {
                }
            );
        }
    }

    showAlert(res) {
        this.canShowAlert = false;
        if (res) {
            if (res.DataTable.length) {
                this.alertInfo = res.DataTable;
                this.canShowAlert = true;
            }
        }
    }

    showHideAlert(result:any) {
        if (result != "disable") {
            this.canShowAlert = result;
        }
    }
}