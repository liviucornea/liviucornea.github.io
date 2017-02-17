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
var AuthResource = (function () {
    function AuthResource(api, alert) {
        this.newResource = {};
        this.searchKey = "";
        this.api = api;
        this.alert = alert;
        this.refreshResources();
    }
    AuthResource.prototype.getResourceIndex = function (resource) {
        return this.resources.findIndex(function (u) { return u.Id == resource.Id; });
    };
    AuthResource.prototype.refreshResource = function (resource) {
        var _this = this;
        var index = this.getResourceIndex(resource);
        this.api.getAuthResource(resource.Id)
            .subscribe(function (res) {
            _this.resources[index] = res.json();
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    AuthResource.prototype.refreshResources = function () {
        var _this = this;
        this.api.getAuthResource()
            .subscribe(function (res) {
            _this.resources = res.json();
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    AuthResource.prototype.editResource = function (resource) {
        resource.canEdit = true;
    };
    AuthResource.prototype.cancelEditResource = function (resource) {
        this.refreshResource(resource);
    };
    AuthResource.prototype.deleteResource = function (resource) {
        var _this = this;
        var index = this.getResourceIndex(resource);
        this.api.deleteAuthResource(resource)
            .subscribe(function (res) {
            _this.resources.splice(index, 1);
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    AuthResource.prototype.updateResource = function (resource) {
        var _this = this;
        this.api.updateAuthResource(resource)
            .subscribe(function (res) {
            // refresh 
            //this.refreshResources();
            _this.refreshResource(resource);
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    AuthResource.prototype.createResource = function () {
        var _this = this;
        var resource = this.newResource;
        this.api.createAuthResource(resource)
            .subscribe(function (res) {
            // refresh
            _this.refreshResources();
            _this.newResource = {};
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    AuthResource = __decorate([
        core_1.Component({
            selector: 'auth',
            templateUrl: '../../..//routes/auth/resource/resource.html',
            directives: [routerLink_1.CustomRouterLink],
            pipes: [tokenFilter_1.TokenFilterPipe],
        }), 
        __metadata('design:paramtypes', [api_1.ApiService, alert_1.AlertService])
    ], AuthResource);
    return AuthResource;
}());
exports.AuthResource = AuthResource;
//# sourceMappingURL=resource.js.map