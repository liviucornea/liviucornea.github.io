"use strict";
var core_1 = require('@angular/core');
//TODO:RF
//import {CORE_DIRECTIVES,} from '@angular/common'
var router_1 = require("@angular/router");
var navigationService_1 = require("../../ReusableServices/navigationService");
var localizationService_1 = require("../../ReusableServices/localizationService");
var NavBarVert = (function () {
    function NavBarVert(_router, navigation, localizationService) {
        var _this = this;
        this._router = _router;
        this.navigation = navigation;
        this.localizationService = localizationService;
        this.items = [];
        this.navigation.navigationLeftMenuEmitter.subscribe(function (data) {
            _this.items = _this.navigation.buildNavigationMenu(data);
        });
    }
    NavBarVert.prototype.activeClass = function (item) {
        if (item.Active) {
            return "list-group-item-info";
        }
        return "";
    };
    ;
    NavBarVert.prototype.activate = function (item) {
        var toggle = !item.Active;
        this.items.forEach(function (item) {
            item.Active = false;
        });
        item.Active = toggle;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', String)
    ], NavBarVert.prototype, "activeClass", null);
    NavBarVert = __decorate([
        core_1.Component({
            selector: 'navBarVert',
            template: require('./navbarvert.html'),
        }), 
        __metadata('design:paramtypes', [router_1.Router, navigationService_1.NavigationService, localizationService_1.LocalizationService])
    ], NavBarVert);
    return NavBarVert;
}());
exports.NavBarVert = NavBarVert;
//# sourceMappingURL=navbarVert.js.map