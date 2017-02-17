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
var routerLink_1 = require('../../directives/routerLink/routerLink');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var router_1 = require('angular2/router');
var api_1 = require('../../services/api/api');
var alert_1 = require('../../services/alert/alert');
var auth_1 = require('../../services/auth/auth');
var NlogInstances = (function () {
    function NlogInstances(_api, _alert, _auth, _router, _location) {
        this._api = _api;
        this._alert = _alert;
        this._auth = _auth;
        this._router = _router;
        this._location = _location;
        this.totalItems = 0;
        this.itemsPerPage = 10;
        this.currentPage = 0;
        this.refresh();
    }
    ;
    NlogInstances.prototype.clear = function () {
        this.totalItems = 0;
        this.currentPage = 1;
        this.nlogInstances = null;
        this.nlogInstancesPaged = null;
    };
    NlogInstances.prototype.refresh = function () {
        var _this = this;
        this._api.getNlogInstance()
            .subscribe(function (res) {
            _this.nlogInstances = res.json();
            _this.totalItems = _this.nlogInstances.length;
            _this.pageChanged(_this.currentPage);
        }, function (error) {
            _this._alert.error("async error #" + error.status);
        }, function () { });
    };
    NlogInstances.prototype.pageChanged = function (event) {
        if (event != null && event.page != null)
            this.currentPage = event.page;
        if (event != null && event.itemsPerPage != null)
            this.itemsPerPage = event.itemsPerPage;
        if (this.nlogInstances != null)
            this.nlogInstancesPaged = this.nlogInstances.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
    };
    ;
    NlogInstances = __decorate([
        core_1.Component({
            selector: 'nlogInstances',
            templateUrl: '../..//routes/logs/nlogInstances.html',
            directives: [ng2_bootstrap_1.Pagination, routerLink_1.CustomRouterLink],
        }), 
        __metadata('design:paramtypes', [api_1.ApiService, alert_1.AlertService, auth_1.AuthService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Location !== 'undefined' && router_1.Location) === 'function' && _b) || Object])
    ], NlogInstances);
    return NlogInstances;
    var _a, _b;
}());
exports.NlogInstances = NlogInstances;
//# sourceMappingURL=nlogInstances.js.map