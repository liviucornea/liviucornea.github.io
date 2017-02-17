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
var AuthRoleResource = (function () {
    function AuthRoleResource(api, alert) {
        this.api = api;
        this.alert = alert;
        this.refresh();
    }
    AuthRoleResource.prototype.refresh = function () {
        var _this = this;
        // Load async
        Rx_1.Observable.forkJoin(this.api.getAuthRole(), this.api.getAuthResource(), this.api.getAuthRoleResource())
            .subscribe(function (data) {
            _this.roles = data[0].json();
            _this.resources = data[1].json();
            _this.roleResources = data[2].json();
            if (_this.mapping == null)
                _this.mapping = [];
            for (var _i = 0, _a = _this.roles; _i < _a.length; _i++) {
                var role = _a[_i];
                _this.mapping[role.Id] = [];
            }
            for (var _b = 0, _c = _this.roleResources; _b < _c.length; _b++) {
                var map = _c[_b];
                _this.mapping[map.RoleId][map.ResourceId] = map;
            }
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    AuthRoleResource.prototype.addMapping = function (roleId, resourceId) {
        var _this = this;
        var roleResource = {
            Id: 0,
            RoleId: roleId,
            ResourceId: resourceId,
            Create: false,
            Read: true,
            Update: false,
            Delete: false,
        };
        this.api.createAuthRoleResource(roleResource)
            .subscribe(function (res) {
            _this.refresh();
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    AuthRoleResource.prototype.removeMapping = function (roleId, resourceId) {
        var _this = this;
        var roleResource = this.mapping[roleId][resourceId];
        this.api.deleteAuthRoleResource(roleResource)
            .subscribe(function (res) {
            _this.refresh();
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    AuthRoleResource.prototype.updateMapping = function (e, roleId, resourceId) {
        var _this = this;
        var roleResource = this.mapping[roleId][resourceId];
        this.api.updateAuthRoleResource(roleResource)
            .subscribe(function (res) {
            _this.refresh();
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    AuthRoleResource = __decorate([
        core_1.Component({
            selector: 'auth',
            templateUrl: '../../..//routes/auth/roleresource/roleresource.html',
            directives: [routerLink_1.CustomRouterLink],
            pipes: [tokenFilter_1.TokenFilterPipe, objectFilter_1.ObjectFilterPipe, objectNotFilter_1.ObjectNotFilterPipe],
        }), 
        __metadata('design:paramtypes', [api_1.ApiService, alert_1.AlertService])
    ], AuthRoleResource);
    return AuthRoleResource;
}());
exports.AuthRoleResource = AuthRoleResource;
//# sourceMappingURL=roleresource.js.map