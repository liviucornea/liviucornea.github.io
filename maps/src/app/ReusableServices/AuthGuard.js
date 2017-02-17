"use strict";
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var apiService_1 = require("./apiService");
var httpAbstract_1 = require("./httpAbstract");
var localizationService_1 = require("./localizationService");
var navigationService_1 = require("./navigationService");
var interFormsService_1 = require("./interFormsService");
var AuthGuard = (function () {
    function AuthGuard(router, apiService, httpAbstract, localizationService, intFormSvc, navigationService) {
        this.router = router;
        this.apiService = apiService;
        this.httpAbstract = httpAbstract;
        this.localizationService = localizationService;
        this.intFormSvc = intFormSvc;
        this.navigationService = navigationService;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        this.intFormSvc.stopSpinner();
        var tempbaseUrl = this.httpAbstract.baseUrl;
        if (tempbaseUrl != this.apiService.base) {
            this.httpAbstract.setBaseAddress((this.apiService.base));
        }
        var urlPath = state.url.split(';')[0]; //this.loc.path(false);
        if (this.localizationService.selectedLanguage && this.localizationService.localizationResourcesList.length) {
            return this.apiService.checkUserAuthorization(urlPath).map(function (authState) {
                _this.httpAbstract.setBaseAddress(tempbaseUrl);
                if (!authState)
                    _this.router.navigate(['Datahub', 'AccessDenied']);
                _this.navigationService.NavigateByLocationUrl(urlPath);
                return true;
            }).take(1);
        }
        else {
            var langId = 1;
            if (this.localizationService.selectedLanguage) {
                langId = this.localizationService.selectedLanguage.Id;
            }
            return this.apiService.fetchMultipleList(['/localization/language',
                '/localization/languagevalue/' + langId,
                '/auth/currentuser/checkpermission?route=' + urlPath,
                "/profile"]).map(function (res) {
                _this.httpAbstract.setBaseAddress(tempbaseUrl);
                _this.localizationService.setLanguageFromAuthGuard(res[0]);
                _this.localizationService.setResourcesByLangIdFromAuthGuard(res[1]);
                _this.navigationService.getMainPageNavigation(res[3]);
                _this.navigationService.getFiltertedPageNavigation('Datahub');
                _this.navigationService.NavigateByLocationUrl(urlPath);
                if (!res[2]) {
                    _this.router.navigate(['Datahub', 'AccessDenied']);
                }
                return true;
            }).take(1);
        }
    };
    AuthGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, apiService_1.ApiService, httpAbstract_1.HttpAbstract, localizationService_1.LocalizationService, interFormsService_1.InterFormsService, navigationService_1.NavigationService])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=AuthGuard.js.map