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
var router_1 = require('angular2/router');
var routerLink_1 = require('../../directives/routerLink/routerLink');
var alert_1 = require('../../services/alert/alert');
var api_1 = require('../../services/api/api');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var NavBar = (function () {
    function NavBar(alert, api, location, router) {
        var _this = this;
        this.routeName = "Home";
        this.userName = "Guest";
        this.alert = alert;
        this.api = api;
        this.location = location;
        this.router = router;
        // Subscribe to router events and save route name locally
        this.router.subscribe(function (route) {
            var index = route.indexOf("/");
            index = index == -1 ? route.length : index;
            _this.routeName = route[0].toUpperCase() + route.substring(1, index);
        });
        this.getUserName();
    }
    NavBar.prototype.getUserName = function () {
        var _this = this;
        this.api.getAuthCurrentUser()
            .subscribe(function (res) {
            _this.userName = res.json().Login;
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    NavBar.prototype.getActiveClass = function (path) {
        if (this.location.path().toLowerCase() == path.toLowerCase()) {
            return "active";
        }
    };
    NavBar = __decorate([
        core_1.Component({
            selector: 'navBar',
            templateUrl: '../..//components/navbar/navbar.html',
            directives: [routerLink_1.CustomRouterLink, ng2_bootstrap_1.DROPDOWN_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [alert_1.AlertService, api_1.ApiService, (typeof (_a = typeof router_1.Location !== 'undefined' && router_1.Location) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object])
    ], NavBar);
    return NavBar;
    var _a, _b;
}());
exports.NavBar = NavBar;
//# sourceMappingURL=navbar.js.map