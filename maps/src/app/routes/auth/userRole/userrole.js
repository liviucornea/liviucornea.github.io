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
var Rx_1 = require('rxjs/Rx');
var core_1 = require('angular2/core');
var routerLink_1 = require('../../../directives/routerLink/routerLink');
var api_1 = require('../../../services/api/api');
var alert_1 = require('../../../services/alert/alert');
var tokenFilter_1 = require('../../../pipes/tokenFilter');
var objectFilter_1 = require('../../../pipes/objectFilter');
var objectNotFilter_1 = require('../../../pipes/objectNotFilter');
var AuthUserRole = (function () {
    function AuthUserRole(api, alert) {
        this.api = api;
        this.alert = alert;
        this.refresh();
    }
    AuthUserRole.prototype.refresh = function () {
        var _this = this;
        // Load async
        Rx_1.Observable.forkJoin(this.api.getAuthUser(), this.api.getAuthRole(), this.api.getAuthUserRole())
            .subscribe(function (data) {
            _this.users = data[0].json();
            _this.roles = data[1].json();
            _this.userRoles = data[2].json();
            if (_this.mapping == null)
                _this.mapping = [];
            for (var _i = 0, _a = _this.users; _i < _a.length; _i++) {
                var user = _a[_i];
                _this.mapping[user.Id] = [];
            }
            for (var _b = 0, _c = _this.userRoles; _b < _c.length; _b++) {
                var map = _c[_b];
                _this.mapping[map.UserId][map.RoleId] = map;
            }
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    AuthUserRole.prototype.addMapping = function (userId, roleId) {
        var _this = this;
        var userRole = {
            Id: 0,
            UserId: userId,
            RoleId: roleId,
            Create: false,
            Read: true,
            Update: false,
            Delete: false,
        };
        this.api.createAuthUserRole(userRole)
            .subscribe(function (res) {
            _this.refresh();
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    AuthUserRole.prototype.removeMapping = function (userId, roleId) {
        var _this = this;
        var userRole = this.mapping[userId][roleId];
        this.mapping[userId][roleId] = null;
        this.api.deleteAuthUserRole(userRole)
            .subscribe(function (res) {
            _this.refresh();
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    AuthUserRole.prototype.updateMapping = function (e, userId, roleId) {
        var _this = this;
        var userRole = this.mapping[userId][roleId];
        this.api.updateAuthUserRole(userRole)
            .subscribe(function (res) {
            _this.refresh();
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    AuthUserRole = __decorate([
        core_1.Component({
            selector: 'auth',
            templateUrl: '../../..//routes/auth/userrole/userrole.html',
            directives: [routerLink_1.CustomRouterLink],
            pipes: [tokenFilter_1.TokenFilterPipe, objectFilter_1.ObjectFilterPipe, objectNotFilter_1.ObjectNotFilterPipe],
        }), 
        __metadata('design:paramtypes', [api_1.ApiService, alert_1.AlertService])
    ], AuthUserRole);
    return AuthUserRole;
}());
exports.AuthUserRole = AuthUserRole;
//# sourceMappingURL=userrole.js.map