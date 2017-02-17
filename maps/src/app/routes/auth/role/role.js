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
var AuthRole = (function () {
    function AuthRole(api, alert) {
        this.newRole = {};
        this.searchKey = "";
        this.api = api;
        this.alert = alert;
        this.refreshRoles();
    }
    AuthRole.prototype.getRoleIndex = function (role) {
        return this.roles.findIndex(function (u) { return u.Id == role.Id; });
    };
    AuthRole.prototype.refreshRole = function (role) {
        var _this = this;
        var index = this.getRoleIndex(role);
        this.api.getAuthRole(role.Id)
            .subscribe(function (res) {
            _this.roles[index] = res.json();
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    AuthRole.prototype.refreshRoles = function () {
        var _this = this;
        this.api.getAuthRole()
            .subscribe(function (res) {
            _this.roles = res.json();
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    AuthRole.prototype.editRole = function (role) {
        role.canEdit = true;
    };
    AuthRole.prototype.cancelEditRole = function (role) {
        this.refreshRole(role);
    };
    AuthRole.prototype.deleteRole = function (role) {
        var _this = this;
        var index = this.getRoleIndex(role);
        this.api.deleteAuthRole(role)
            .subscribe(function (res) {
            _this.roles.splice(index, 1);
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    AuthRole.prototype.updateRole = function (role) {
        var _this = this;
        this.api.updateAuthRole(role)
            .subscribe(function (res) {
            // refresh 
            //this.refreshRoles();
            _this.refreshRole(role);
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    AuthRole.prototype.createRole = function () {
        var _this = this;
        var role = this.newRole;
        this.api.createAuthRole(role)
            .subscribe(function (res) {
            // refresh
            _this.refreshRoles();
            _this.newRole = {};
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    AuthRole = __decorate([
        core_1.Component({
            selector: 'auth',
            templateUrl: '../../..//routes/auth/role/role.html',
            directives: [routerLink_1.CustomRouterLink],
            pipes: [tokenFilter_1.TokenFilterPipe],
        }), 
        __metadata('design:paramtypes', [api_1.ApiService, alert_1.AlertService])
    ], AuthRole);
    return AuthRole;
}());
exports.AuthRole = AuthRole;
//# sourceMappingURL=role.js.map