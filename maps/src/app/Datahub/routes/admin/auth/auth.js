"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var navigationService_1 = require("../../../../ReusableServices/navigationService");
var Auth = (function () {
    function Auth(navService, location) {
        this.navService = navService;
        /*this.navService.getChildMenu(['Admin','Auth']);
        navService.setCurrentPage(location.path(false));*/
        /* let links=this.navService.getLeftMenuRoutes(['Auth']);
         navService.NavigateToPage(links,null);*/
    }
    Auth = __decorate([
        core_1.Component({
            selector: 'auth',
            template: "",
        }), 
        __metadata('design:paramtypes', [navigationService_1.NavigationService, common_1.Location])
    ], Auth);
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map