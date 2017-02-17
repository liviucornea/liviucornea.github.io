import {Component, Input} from '@angular/core';
import {NavigationService} from "../../ReusableServices/navigationService";
import {AlertService} from "../../ReusableServices/alertService";
import {ApiService, AuthUser} from "../../ReusableServices/apiService";
import {AppNotificationsMSG} from "../../Configuration/appSettings";
import {HttpAbstract} from "../../ReusableServices/httpAbstract";
import {Router, ActivatedRoute} from "@angular/router";
import {LocalizationService, SelectedLanguage} from "../../ReusableServices/localizationService";
import {Location} from '@angular/common';
import {isNullOrUndefined} from "util";
import {InterFormsService} from "../../ReusableServices/interFormsService";

@Component({
    selector: 'navBar',
    template: require('./navbar.html'),
})

export class navBar {
    apiService: ApiService;
    links: Array<any>;
    routeName: string = "Home";
    userName: string = "Guest";
    userId: number;
    canShowAlert: boolean = false;
    showAlertWindow: boolean = false;
    alertInfo: any;
    navigation: NavigationService;
    selectedLangId: number;
    selectedLangCode: string;
    langList: Array<SelectedLanguage> = new Array<SelectedLanguage>();
    theme: string = "standard";
    httpAbs: HttpAbstract;
    envDetails: Array<any> = [];
    envDetailsOpen: boolean = false;
    private environmentBaseUrl: string = "/application/configuration/Environment";

    @Input() activeClass(item: any): string {
        if (this.isActive(item)) {
            return "list-group-item-info";
        }
        return "";
    };

    constructor(httpAbs: HttpAbstract, apiService: ApiService, private nav: NavigationService, private router: Router
        , private localizationService: LocalizationService, private alert: AlertService, private loc: Location, private intFormSvc: InterFormsService) {
        this.apiService = apiService;
        this.httpAbs = httpAbs;
        this.navigation = nav;

        this.navigation.navigationCb.subscribe(data => {
            this.langList = this.localizationService.languageList;
            if (this.selectedLangId == undefined || this.selectedLangCode == undefined) {
                this.selectedLangId = this.langList.find(p => p.LangCode.toLowerCase().substring(0, 2) == 'en').Id;
                this.selectedLangCode = this.langList.find(p => p.LangCode.toLowerCase().substring(0, 2) == 'en').LangCode;
            }
            this.links = this.navigation.buildNavigationMenu(data);
            this.links = this.sortDropdownLinks(this.links);
        });

        this.setCurrentUser();

        this.localizationService.localizationEventEmitter.subscribe((message) => {
            this.refreshPage(message);
        });
    }

    updateSelectedLanguage(langId: number) {
        this.localizationService.toggleSelection(langId);
    }

    refreshPage(lang) {
        this.selectedLangId = lang.Id;
        this.selectedLangCode = lang.LangCode;
        this.navigation.navigationCb.emit(this.links);
        this.navigation.getLeftMenuRoutes([this.navigation.leftMenuItems.LookupKey]);
        this.router.navigate(['/Datahub/PageRedirect', {path: this.loc.path()}]);
    }

    isActive(item: any): boolean {
        return item.Active;
    }

    setCurrentUser() {
        var currentUser = new AuthUser();

        //this.apiService.getAuthCurrentUser()
        this.apiService.fetchMultipleList(['/auth/currentuser', this.environmentBaseUrl])
            .subscribe(
                res => {
                    if (res[0]) {
                        currentUser = this.assignUserDetails(currentUser, res[0]);
                    }
                    if (res[1] && res[1].ConfigurationValue) {
                        this.assignEnvironmentDetails(res[1].ConfigurationValue);
                    }
                },
                error => {
                    this.alert.error(AppNotificationsMSG.apiMsg.apiGetUserInfo + '   ' + error.status);
                },
            );

    }

    getActiveClass(path): string {
        /*if (this.location.path().toLowerCase() == path.toLowerCase()) {
         return "active";
         }*/

        return "active";
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

    showHideAlert(result: any) {
        if (result != "disable") {
            this.canShowAlert = result;
        }
    }

    toggleTheme() {
        this.intFormSvc.toggleTheme();
    }

    shrinkAllFont() {
        this.intFormSvc.adjustFontSize(-1);

    }

    expandAllFont() {
        this.intFormSvc.adjustFontSize(1);
    }

    toggleEnvDetails() {
        this.envDetailsOpen = !this.envDetailsOpen;
    }

    private assignUserDetails(user: AuthUser, res: any) {
        user.CostCentre = res.CostCentre;
        user.Id = res.Id;
        user.Login = res.Login;
        user.Name = res.Name;

        let nPos = res.Login.lastIndexOf('\\');
        if (nPos > -1) {
            user.LoginName = res.Login.substring(nPos + 1).toString().trim();
        }
        this.userName = user.Login;
        this.userId = user.Id;
        this.apiService.CurrentUser = user;

        return user;
    }

    private assignEnvironmentDetails(res: any) {
        JSON.parse(res).forEach(item => {
            var jsonStringPair = {
                name: Object.getOwnPropertyNames(item)[0],
                value: Object.values(item)[0]
            }
            this.envDetails.push(jsonStringPair);
        })
    }

    private sortDropdownLinks(links: any) {
        for (let link of links) {
            link.Children = link.Children.sort(function (a, b) {
                let firstValue = a.Name.toLowerCase();
                let secondValue = b.Name.toLowerCase();

                if (firstValue < secondValue)
                    return -1;
                if (firstValue > secondValue)
                    return 1;
                return 0;
            });
        }
        return links;
    }
}