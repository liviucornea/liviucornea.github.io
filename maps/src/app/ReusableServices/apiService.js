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
var core_1 = require('@angular/core');
var httpAbstract_1 = require('./httpAbstract');
var appSettingsService_1 = require('./appSettingsService');
var AuthUser = (function () {
    function AuthUser() {
        this.Id = 0;
    }
    return AuthUser;
}());
exports.AuthUser = AuthUser;
var ApiService = (function () {
    function ApiService(abstractHttp, appSettingsService) {
        this.abstractHttp = abstractHttp;
        this.appSettingsService = appSettingsService;
        this.prefixurl = '/auth';
        this.contentType = 'application/json; charset=utf-8';
        this.base = this.appSettingsService.appSettings.apiSettings.apiURL_BASE + '/api/tdam/datahub/ae';
        this.currentuserbaseurl = this.prefixurl + '/currentuser';
        this.logbaseurl = '/log';
        this.sqlStatementsUrl = '/application/sqlstatementdetail';
        this.httpAbs = abstractHttp;
        this.httpAbs.setBaseAddress(this.base);
    }
    ApiService.prototype.setApplicationsBaseUrl = function () {
        this.httpAbs = this.abstractHttp;
        this.httpAbs.setBaseAddress(this.base);
    };
    ApiService.prototype.getArrayFromQuery = function (dataKey, reportOptions) {
        if (reportOptions === void 0) { reportOptions = '{}'; }
        return this.httpAbs.fetchWithFilter(this.sqlStatementsUrl + '/' + dataKey, reportOptions, this.contentType);
    };
    ApiService.prototype.getMultipleArrayFromQuery = function (dataKeys) {
        var _this = this;
        dataKeys.forEach(function (x) {
            x.url = _this.sqlStatementsUrl + '/' + x.url;
            x.body = x.body ? x.body : '{}';
        });
        return this.httpAbs.fetchMultiple(dataKeys, this.contentType);
    };
    ApiService.prototype.executeMultipleNonQuery = function (dataKeys) {
        var _this = this;
        dataKeys.forEach(function (x) {
            x.url = _this.sqlStatementsUrl + '/executenonquery/' + x.url;
            x.body = x.body ? x.body : '{}';
        });
        return this.httpAbs.fetchMultiple(dataKeys, this.contentType);
    };
    ApiService.prototype.executeNonQuery = function (dataKey, reportOptions) {
        if (reportOptions === void 0) { reportOptions = '{}'; }
        return this.httpAbs.fetchWithFilter(this.sqlStatementsUrl + '/executenonquery/' + dataKey, reportOptions, this.contentType);
    };
    ApiService.prototype.getAuthCurrentUser = function () {
        return this.httpAbs.fetch(this.currentuserbaseurl);
    };
    ApiService.prototype.getAuthCurrentUserRoles = function () {
        return this.httpAbs.fetch(this.currentuserbaseurl + '/role');
    };
    ApiService.prototype.checkUserAuthorization = function (routepath) {
        return this.httpAbs.fetch(this.currentuserbaseurl + '/checkpermission?route=' + routepath);
    };
    ApiService.prototype.fetchMultipleList = function (urlList) {
        return this.httpAbs.fetchMultiple(urlList);
    };
    ApiService.prototype.fetchMultipleListWithBody = function (urldataList) {
        return this.httpAbs.fetchMultiple(urldataList, this.contentType);
    };
    ApiService.prototype.updateBulkRecords = function (apiParams, jsonData, headerKey, headers) {
        return this.httpAbs.updateBulkRecords(apiParams, jsonData, headerKey, headers, this.contentType);
    };
    ApiService.prototype.removeBulkRecords = function (apiParams, jsonData, headerKey, headers) {
        return this.httpAbs.removeBulkRecords(apiParams, jsonData, headerKey, headers, this.contentType);
    };
    ApiService.prototype.insertBulkRecords = function (apiParams, jsonData, headerKey, headers) {
        return this.httpAbs.insertBulkRecords(apiParams, jsonData, headerKey, headers, this.contentType);
    };
    ApiService.prototype.ExecuteUpdate = function (obj, pagename, primaryKeyColumn) {
        if (primaryKeyColumn === void 0) { primaryKeyColumn = ''; }
        switch (pagename.toLowerCase()) {
            default:
                break;
        }
    };
    ApiService.prototype.ExecutePageFilter = function (pagename, filterObject) {
        switch (pagename.toLowerCase()) {
            default:
                break;
        }
    };
    ApiService.prototype.ExecutePageRefresh = function (pagename, id) {
        if (id === void 0) { id = null; }
        switch (pagename.toLowerCase()) {
            default:
                break;
        }
    };
    ApiService.prototype.ExecuteDelete = function (obj, pagename, primaryKeyColumn) {
        if (primaryKeyColumn === void 0) { primaryKeyColumn = ''; }
        switch (pagename.toLowerCase()) {
            default:
                break;
        }
    };
    ApiService.prototype.ExecuteInsert = function (obj, pagename) {
        switch (pagename.toLowerCase()) {
            default:
                break;
        }
    };
    ApiService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [httpAbstract_1.HttpAbstract, appSettingsService_1.AppSettingsService])
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
//# sourceMappingURL=apiService.js.map