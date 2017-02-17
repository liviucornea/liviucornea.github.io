import {Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {ApiService} from "./apiService";
import {HttpAbstract} from "./httpAbstract";
import {LocalizationService} from "./localizationService";
import {NavigationService} from "./navigationService";
import {InterFormsService} from "./interFormsService";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private apiService: ApiService
        , private httpAbstract: HttpAbstract, private localizationService: LocalizationService,
                private intFormSvc:InterFormsService
        , private navigationService: NavigationService) {
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        this.intFormSvc.stopSpinner();

        var tempbaseUrl = this.httpAbstract.baseUrl;
        if(tempbaseUrl != this.apiService.base)
        {
            this.httpAbstract.setBaseAddress((this.apiService.base));
        }

        var urlPath = state.url.split(';')[0];//this.loc.path(false);

        if(this.localizationService.selectedLanguage && this.localizationService.localizationResourcesList.length) {
            return this.apiService.checkUserAuthorization(urlPath).map(authState => {
                this.httpAbstract.setBaseAddress(tempbaseUrl);
                if (!authState) this.router.navigate(['Datahub', 'AccessDenied']);
                this.navigationService.NavigateByLocationUrl(urlPath);
                return true;
            }).take(1);
        }
        else {
                var langId =1;
                if(this.localizationService.selectedLanguage)
                {
                    langId = this.localizationService.selectedLanguage.Id;
                }
                return this.apiService.fetchMultipleList(['/localization/language',
                    '/localization/languagevalue/' + langId,
                    '/auth/currentuser/checkpermission?route=' + urlPath
                ,"/profile"]).map(
                    res=> {
                        this.httpAbstract.setBaseAddress(tempbaseUrl);
                        this.localizationService.setLanguageFromAuthGuard(res[0]);
                        this.localizationService.setResourcesByLangIdFromAuthGuard(res[1]);
                        this.navigationService.getMainPageNavigation(res[3]);
                        this.navigationService.getFiltertedPageNavigation('Datahub');
                        this.navigationService.NavigateByLocationUrl(urlPath);

                        if(!res[2]) {
                            this.router.navigate(['Datahub','AccessDenied']);
                        }
                        return true;
                    }
                ).take(1);
        }

    }

}