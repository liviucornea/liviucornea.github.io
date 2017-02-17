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
var routerLink_1 = require('../../../directives/routerLink/routerLink');
var api_1 = require('../../../services/api/api');
var alert_1 = require('../../../services/alert/alert');
var tokenFilter_1 = require('../../../pipes/tokenFilter');
var AuthUser = (function () {
    function AuthUser(api, alert) {
        this.newUser = {};
        this.searchKey = "";
        this.api = api;
        this.alert = alert;
        this.refreshUsers();
    }
    AuthUser.prototype.getUserIndex = function (user) {
        return this.users.findIndex(function (u) { return u.Id == user.Id; });
    };
    AuthUser.prototype.refreshUser = function (user) {
        var _this = this;
        var index = this.getUserIndex(user);
        this.api.getAuthUser(user.Id)
            .subscribe(function (res) {
            _this.users[index] = res.json();
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    AuthUser.prototype.refreshUsers = function () {
        var _this = this;
        this.api.getAuthUser()
            .subscribe(function (res) {
            _this.users = res.json();
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    AuthUser.prototype.editUser = function (user) {
        user.canEdit = true;
    };
    AuthUser.prototype.cancelEditUser = function (user) {
        this.refreshUser(user);
    };
    AuthUser.prototype.deleteUser = function (user) {
        var _this = this;
        var index = this.getUserIndex(user);
        this.api.deleteAuthUser(user)
            .subscribe(function (res) {
            _this.users.splice(index, 1);
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    AuthUser.prototype.updateUser = function (user) {
        var _this = this;
        this.api.updateAuthUser(user)
            .subscribe(function (res) {
            // refresh 
            //this.refreshUsers();
            _this.refreshUser(user);
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    AuthUser.prototype.createUser = function () {
        var _this = this;
        var user = this.newUser;
        this.api.createAuthUser(user)
            .subscribe(function (res) {
            // refresh
            _this.refreshUsers();
            _this.newUser = {};
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    AuthUser = __decorate([
        core_1.Component({
            selector: 'auth',
            templateUrl: '../../..//routes/auth/user/user.html',
            directives: [routerLink_1.CustomRouterLink],
            pipes: [tokenFilter_1.TokenFilterPipe],
        }), 
        __metadata('design:paramtypes', [api_1.ApiService, alert_1.AlertService])
    ], AuthUser);
    return AuthUser;
}());
exports.AuthUser = AuthUser;
//# sourceMappingURL=user.js.map