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
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var router_1 = require('angular2/router');
var routerLink_1 = require('../../directives/routerLink/routerLink');
var NavBarVert = (function () {
    function NavBarVert(_location) {
        this._location = _location;
    }
    NavBarVert.prototype.activate = function (item) {
        var toggle = !item.active;
        this.items.forEach(function (item) {
            item.active = false;
        });
        item.active = toggle;
    };
    NavBarVert.prototype.isActive = function (item) {
        return this._location.path().toLowerCase() == item.Path.toLowerCase();
    };
    NavBarVert.prototype.activeClass = function (item) {
        if (this.isActive(item)) {
            return "active";
        }
        return "";
    };
    NavBarVert = __decorate([
        core_1.Component({
            selector: 'navBarVert',
            templateUrl: '../..//components/navbarvert/navbarvert.html',
            directives: [routerLink_1.CustomRouterLink, common_1.CORE_DIRECTIVES],
            styleUrls: ['../..//includes/style.css'],
            inputs: ['items: content']
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Location !== 'undefined' && router_1.Location) === 'function' && _a) || Object])
    ], NavBarVert);
    return NavBarVert;
    var _a;
}());
exports.NavBarVert = NavBarVert;
var NavItem = (function () {
    function NavItem(Name, RouteLink, Path, Roles, Children) {
        if (Roles === void 0) { Roles = []; }
        if (Children === void 0) { Children = []; }
        this.Name = Name;
        this.RouteLink = RouteLink;
        this.Path = Path;
        this.Roles = Roles;
        this.Children = Children;
    }
    return NavItem;
}());
exports.NavItem = NavItem;
//# sourceMappingURL=navbarvert.js.map