"use strict";
var core_1 = require('@angular/core');
var navigationService_1 = require("../../ReusableServices/navigationService");
var alertService_1 = require("../../ReusableServices/alertService");
var apiService_1 = require("../../ReusableServices/apiService");
var appSettings_1 = require("../../Configuration/appSettings");
var httpAbstract_1 = require("../../ReusableServices/httpAbstract");
var router_1 = require("@angular/router");
var localizationService_1 = require("../../ReusableServices/localizationService");
var common_1 = require('@angular/common');
var navBar = (function () {
    function navBar(httpAbs, apiService, nav, router, localizationService, alert, loc) {
        var _this = this;
        this.nav = nav;
        this.router = router;
        this.localizationService = localizationService;
        this.alert = alert;
        this.loc = loc;
        this.routeName = "Home";
        this.userName = "Guest";
        this.canShowAlert = false;
        this.showAlertWindow = false;
        this.langList = new Array();
        this.theme = "standard";
        this.envDetails = [];
        this.envDetailsOpen = false;
        this.environmentBaseUrl = "/application/configuration/Environment";
        this.apiService = apiService;
        this.httpAbs = httpAbs;
        this.navigation = nav;
        this.navigation.navigationCb.subscribe(function (data) {
            _this.langList = _this.localizationService.languageList;
            if (_this.selectedLangId == undefined || _this.selectedLangCode == undefined) {
                _this.selectedLangId = _this.langList.find(function (p) { return p.LangCode.toLowerCase().substring(0, 2) == 'en'; }).Id;
                _this.selectedLangCode = _this.langList.find(function (p) { return p.LangCode.toLowerCase().substring(0, 2) == 'en'; }).LangCode;
            }
            _this.links = _this.navigation.buildNavigationMenu(data);
            _this.links = _this.sortDropdownLinks(_this.links);
        });
        this.setCurrentUser();
        this.localizationService.localizationEventEmitter.subscribe(function (message) {
            _this.refreshPage(message);
        });
    }
    navBar.prototype.activeClass = function (item) {
        if (this.isActive(item)) {
            return "list-group-item-info";
        }
        return "";
    };
    ;
    navBar.prototype.updateSelectedLanguage = function (langId) {
        this.localizationService.toggleSelection(langId);
    };
    navBar.prototype.refreshPage = function (lang) {
        this.selectedLangId = lang.Id;
        this.selectedLangCode = lang.LangCode;
        this.navigation.navigationCb.emit(this.links);
        this.navigation.getLeftMenuRoutes([this.navigation.leftMenuItems.LookupKey]);
        this.router.navigate(['/Datahub/PageRedirect', { path: this.loc.path() }]);
    };
    navBar.prototype.isActive = function (item) {
        return item.Active;
    };
    navBar.prototype.setCurrentUser = function () {
        var _this = this;
        var currentUser = new apiService_1.AuthUser();
        //this.apiService.getAuthCurrentUser()
        this.apiService.fetchMultipleList(['/auth/currentuser', this.environmentBaseUrl])
            .subscribe(function (res) {
            if (res[0]) {
                currentUser = _this.assignUserDetails(currentUser, res[0]);
            }
            if (res[1] && res[1].length) {
                _this.assignEnvironmentDetails(res[1]);
            }
        }, function (error) {
            _this.alert.error(appSettings_1.AppNotificationsMSG.apiMsg.apiGetUserInfo + '   ' + error.status);
        });
    };
    navBar.prototype.getActiveClass = function (path) {
        /*if (this.location.path().toLowerCase() == path.toLowerCase()) {
         return "active";
         }*/
        return "active";
    };
    navBar.prototype.showAlert = function (res) {
        this.canShowAlert = false;
        if (res) {
            if (res.DataTable.length) {
                this.alertInfo = res.DataTable;
                this.canShowAlert = true;
            }
        }
    };
    navBar.prototype.showHideAlert = function (result) {
        if (result != "disable") {
            this.canShowAlert = result;
        }
    };
    navBar.prototype.toggleTheme = function () {
        if (this.theme == "standard") {
            this.theme = "dark";
            document.getElementById('theme-link').setAttribute('href', 'resources/Datahub/assets/theme_dark.css');
        }
        else {
            this.theme = "standard";
            document.getElementById('theme-link').setAttribute('href', 'resources/Datahub/assets/theme_standard.css');
        }
    };
    navBar.prototype.shrinkAllFont = function () {
        var previousFontSize = window.getComputedStyle(document.getElementById("app-html")).getPropertyValue('font-size').split("px")[0];
        document.getElementById("app-html").style.fontSize = (parseInt(previousFontSize) - 1) + "px";
    };
    navBar.prototype.expandAllFont = function () {
        var previousFontSize = window.getComputedStyle(document.getElementById("app-html")).getPropertyValue('font-size').split("px")[0];
        document.getElementById("app-html").style.fontSize = (parseInt(previousFontSize) + 1) + "px";
    };
    navBar.prototype.toggleEnvDetails = function () {
        this.envDetailsOpen = !this.envDetailsOpen;
    };
    navBar.prototype.assignUserDetails = function (user, res) {
        user.CostCentre = res.CostCentre;
        user.Id = res.Id;
        user.Login = res.Login;
        user.Name = res.Name;
        var nPos = res.Login.lastIndexOf('\\');
        if (nPos > -1) {
            user.LoginName = res.Login.substring(nPos + 1).toString().trim();
        }
        this.userName = user.Login;
        this.userId = user.Id;
        this.apiService.CurrentUser = user;
        return user;
    };
    navBar.prototype.assignEnvironmentDetails = function (res) {
        var _this = this;
        JSON.parse(res).forEach(function (item) {
            var jsonStringPair = {
                name: Object.getOwnPropertyNames(item)[0],
                value: Object.values(item)[0]
            };
            _this.envDetails.push(jsonStringPair);
        });
    };
    navBar.prototype.sortDropdownLinks = function (links) {
        for (var _i = 0, links_1 = links; _i < links_1.length; _i++) {
            var link = links_1[_i];
            link.Children = link.Children.sort(function (a, b) {
                var firstValue = a.Name.toLowerCase();
                var secondValue = b.Name.toLowerCase();
                if (firstValue < secondValue)
                    return -1;
                if (firstValue > secondValue)
                    return 1;
                return 0;
            });
        }
        return links;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', String)
    ], navBar.prototype, "activeClass", null);
    navBar = __decorate([
        core_1.Component({
            selector: 'navBar',
            template: require('./navbar.html'),
        }), 
        __metadata('design:paramtypes', [httpAbstract_1.HttpAbstract, apiService_1.ApiService, navigationService_1.NavigationService, router_1.Router, localizationService_1.LocalizationService, alertService_1.AlertService, common_1.Location])
    ], navBar);
    return navBar;
}());
exports.navBar = navBar;
//# sourceMappingURL=navbar.js.map