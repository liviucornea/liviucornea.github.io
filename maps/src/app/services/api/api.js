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
var http_1 = require('angular2/http');
var ApiService = (function () {
    function ApiService(http) {
        this.base = 'http://wmaadvcp01pfo.tdbfg.com/api/api/tdam/ae';
        //base: string = 'http://localhost:17752/api/tdam/ae';
        this.headers = new http_1.Headers();
        this.http = http;
        this.headers.append('Content-Type', 'application/json; charset=utf-8');
    }
    ApiService.prototype.getNlogInstance = function () {
        return this.http.get(this.base + '/logs/nloginstance');
    };
    ApiService.prototype.getNLogByInstanceId = function (instanceId) {
        return this.http.get(this.base + '/logs/nlog?InstanceId=' + instanceId);
    };
    ApiService.prototype.getAuthCurrentUser = function () {
        return this.http.get(this.base + '/auth/currentuser');
    };
    ApiService.prototype.getAuthCurrentUserRoles = function () {
        return this.http.get(this.base + '/auth/currentuser/role');
    };
    ApiService.prototype.getAuthCurrentUserRole = function (roleName) {
        return this.http.get(this.base + '/auth/currentuser/role/' + roleName);
    };
    ApiService.prototype.getAuthUser = function (id) {
        if (id === void 0) { id = null; }
        if (id)
            return this.http.get(this.base + '/auth/user/' + id);
        else
            return this.http.get(this.base + '/auth/user');
    };
    ApiService.prototype.createAuthUser = function (obj) {
        return this.http.post(this.base + '/auth/user', JSON.stringify(obj), {
            headers: this.headers
        });
    };
    ApiService.prototype.updateAuthUser = function (obj) {
        return this.http.put(this.base + '/auth/user/' + obj.Id, JSON.stringify(obj), {
            headers: this.headers
        });
    };
    ApiService.prototype.deleteAuthUser = function (obj) {
        return this.http.delete(this.base + '/auth/user/' + obj.Id);
    };
    ApiService.prototype.getAuthRole = function (id) {
        if (id === void 0) { id = null; }
        if (id)
            return this.http.get(this.base + '/auth/role/' + id);
        else
            return this.http.get(this.base + '/auth/role');
    };
    ApiService.prototype.createAuthRole = function (obj) {
        return this.http.post(this.base + '/auth/role', JSON.stringify(obj), {
            headers: this.headers
        });
    };
    ApiService.prototype.updateAuthRole = function (obj) {
        return this.http.put(this.base + '/auth/role/' + obj.Id, JSON.stringify(obj), {
            headers: this.headers
        });
    };
    ApiService.prototype.deleteAuthRole = function (obj) {
        return this.http.delete(this.base + '/auth/role/' + obj.Id);
    };
    ApiService.prototype.getAuthResource = function (id) {
        if (id === void 0) { id = null; }
        if (id)
            return this.http.get(this.base + '/auth/resource/' + id);
        else
            return this.http.get(this.base + '/auth/resource');
    };
    ApiService.prototype.createAuthResource = function (obj) {
        return this.http.post(this.base + '/auth/resource', JSON.stringify(obj), {
            headers: this.headers
        });
    };
    ApiService.prototype.updateAuthResource = function (obj) {
        return this.http.put(this.base + '/auth/resource/' + obj.Id, JSON.stringify(obj), {
            headers: this.headers
        });
    };
    ApiService.prototype.deleteAuthResource = function (obj) {
        return this.http.delete(this.base + '/auth/resource/' + obj.Id);
    };
    ApiService.prototype.getAuthRoleResource = function () {
        return this.http.get(this.base + '/auth/roleResource');
    };
    ApiService.prototype.createAuthRoleResource = function (obj) {
        return this.http.post(this.base + '/auth/roleresource', JSON.stringify(obj), {
            headers: this.headers
        });
    };
    ApiService.prototype.updateAuthRoleResource = function (obj) {
        return this.http.put(this.base + '/auth/roleresource/' + obj.Id, JSON.stringify(obj), {
            headers: this.headers
        });
    };
    ApiService.prototype.deleteAuthRoleResource = function (obj) {
        return this.http.delete(this.base + '/auth/roleresource/' + obj.Id);
    };
    ApiService.prototype.getAuthUserRole = function () {
        return this.http.get(this.base + '/auth/userRole');
    };
    ApiService.prototype.createAuthUserRole = function (obj) {
        return this.http.post(this.base + '/auth/userrole', JSON.stringify(obj), {
            headers: this.headers
        });
    };
    ApiService.prototype.updateAuthUserRole = function (obj) {
        return this.http.put(this.base + '/auth/userrole/' + obj.Id, JSON.stringify(obj), {
            headers: this.headers
        });
    };
    ApiService.prototype.deleteAuthUserRole = function (obj) {
        return this.http.delete(this.base + '/auth/userrole/' + obj.Id);
    };
    ApiService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], ApiService);
    return ApiService;
    var _a;
}());
exports.ApiService = ApiService;
//# sourceMappingURL=api.js.map