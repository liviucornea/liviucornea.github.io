"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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