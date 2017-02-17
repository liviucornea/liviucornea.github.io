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
var router_1 = require("@angular/router");
var navigationService_1 = require("../../ReusableServices/navigationService");
var TileView = (function () {
    function TileView(router, navigationService) {
        this.router = router;
        this.navigationService = navigationService;
        this.menuItemsList = [];
    }
    TileView.prototype.gotoChildItem = function (childItem) {
        this.router.navigate(childItem.RouteLink);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TileView.prototype, "menuItemsList", void 0);
    TileView = __decorate([
        core_1.Component({
            selector: 'tileView',
            //templateUrl: 'app/ReusableComponents/tabBuilder/tabBuilder.html',
            template: require('./tileView.html'),
        }), 
        __metadata('design:paramtypes', [router_1.Router, navigationService_1.NavigationService])
    ], TileView);
    return TileView;
}());
exports.TileView = TileView;
//# sourceMappingURL=tileView.js.map