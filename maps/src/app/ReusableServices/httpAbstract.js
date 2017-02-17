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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/Rx');
var appSettingsService_1 = require('./appSettingsService');
var HttpAbstract = (function () {
    function HttpAbstract(http, appSettingsService) {
        this.appSettingsService = appSettingsService;
        this.baseUrl = this.appSettingsService.appSettings.apiSettings.apiURL_BASE + '/api/tdam/datahub/ae';
        this.http = http;
        this.contentTypeDefault = 'application/x-www-form-urlencoded';
        this.contentTypeJson = 'application/json';
    }
    // region CRUD return observable
    HttpAbstract.prototype.fetch = function (apiParams) {
        var test = this.baseUrl + apiParams;
        this.result = this.http.get(test).map(function (response) { return response.json(); });
        return this.result;
    };
    HttpAbstract.prototype.fetchMultiple = function (apiParams, contentType) {
        var allObservables = new Array();
        var httpProvider = this.http;
        var root = this.baseUrl;
        var headers = this.constructHeaders('', '', contentType);
        apiParams.forEach(function (x) {
            if (x.body) {
                allObservables.push(httpProvider.post(root + x.url, x.body, { headers: headers }).map(function (response) { return response.json(); }));
            }
            else if (x.url) {
                allObservables.push(httpProvider.get(root + x.url).map(function (response) { return response.json(); }));
            }
            else {
                allObservables.push(httpProvider.get(root + x).map(function (response) { return response.json(); }));
            }
        });
        Observable_1.Observable.forkJoin(allObservables);
        this.result = Observable_1.Observable.forkJoin(allObservables);
        return this.result;
    };
    HttpAbstract.prototype.fetchWithHeader = function (apiParams, headerKey, headerValue, contentType) {
        var headers = this.constructHeaders(headerKey, headerValue, contentType);
        this.result = this.http.get(this.baseUrl + apiParams, { headers: headers }).map(function (response) { return response.json(); });
        return this.result;
    };
    HttpAbstract.prototype.fetchWithFilter = function (apiParams, body, contentType) {
        var headers = this.constructHeaders('', '', contentType);
        this.result = this.http.post(this.baseUrl + apiParams, body, { headers: headers }).map(function (response) { return response.json(); });
        return this.result;
    };
    HttpAbstract.prototype.remove = function (apiParams) {
        this.result = this.http.delete(this.baseUrl + apiParams).map(function (response) { return response.json(); });
        return this.result;
    };
    HttpAbstract.prototype.removeWithHeader = function (apiParams, headerKey, headerValue, contentType) {
        var headers = this.constructHeaders(headerKey, headerValue, contentType);
        this.result = this.http.delete(this.baseUrl + apiParams, { headers: headers }).map(function (response) { return response.json(); });
        return this.result;
    };
    HttpAbstract.prototype.removeMultiple = function (apiParams, contentType) {
        var _this = this;
        var allObservables = new Array();
        apiParams.forEach(function (x) {
            var headers = _this.constructHeaders(x.headerKey, x.headerValue, contentType);
            allObservables.push(_this.http.delete(_this.baseUrl + x.url, { headers: headers, body: x.headerKey }).map(function (response) { return response.json(); }));
        });
        Observable_1.Observable.forkJoin(allObservables);
        this.result = Observable_1.Observable.forkJoin(allObservables);
        return this.result;
    };
    HttpAbstract.prototype.removeBulkRecords = function (apiParams, body, headerKey, headerValue, contentType) {
        var headers = this.constructHeaders(headerKey, headerValue, contentType);
        this.result = this.http.delete(this.baseUrl + apiParams, { headers: headers, body: body }).map(function (response) { return response.json(); });
        return this.result;
    };
    HttpAbstract.prototype.update = function (apiParams, body) {
        this.result = this.http.put(this.baseUrl + apiParams, body).map(function (response) { return response.json(); });
        return this.result;
    };
    HttpAbstract.prototype.updateBulkRecords = function (apiParams, body, headerKey, headerValue, contentType) {
        var headers = this.constructHeaders(headerKey, headerValue, contentType);
        this.result = this.http.put(this.baseUrl + apiParams, body, { headers: headers }).map(function (response) { return response.json(); });
        return this.result;
    };
    HttpAbstract.prototype.updateWithHeader = function (apiParams, body, headerKey, headerValue, contentType) {
        var headers = this.constructHeaders(headerKey, headerValue, contentType);
        this.result = this.http.put(this.baseUrl + apiParams, body, { headers: headers }).map(function (response) { return response.json(); });
        return this.result;
    };
    HttpAbstract.prototype.insert = function (apiParams, body) {
        this.result = this.http.post(this.baseUrl + apiParams, body).map(function (response) { return response.json(); });
        return this.result;
    };
    HttpAbstract.prototype.insertWithHeader = function (apiParams, body, headerKey, headerValue, contentType) {
        var headers = this.constructHeaders(headerKey, headerValue, contentType);
        this.result = this.http.post(this.baseUrl + apiParams, body, { headers: headers }).map(function (response) { return response.json(); });
        return this.result;
    };
    HttpAbstract.prototype.insertBulkRecords = function (apiParams, body, headerKey, headerValue, contentType) {
        var headers = this.constructHeaders(headerKey, headerValue, contentType);
        this.result = this.http.post(this.baseUrl + apiParams, body, { headers: headers }).map(function (response) { return response.json(); });
        return this.result;
    };
    HttpAbstract.prototype.insertJson = function (apiParams, body) {
        var headers = this.constructContentType(this.contentTypeJson);
        this.result = this.http.post(this.baseUrl + apiParams, body, { headers: headers }).map(function (response) { return response.json(); });
        return this.result;
    };
    // endregion CRUD with observable
    // region helper functions
    HttpAbstract.prototype.setBaseAddress = function (url) {
        this.baseUrl = url;
    };
    HttpAbstract.prototype.constructContentType = function (contentType) {
        var headers = new http_1.Headers();
        if (contentType) {
            headers.append('Content-Type', contentType);
        }
        return headers;
    };
    HttpAbstract.prototype.constructHeaders = function (headerKey, headerValue, contentType) {
        var headers = new http_1.Headers();
        if (contentType) {
            headers.append('Content-Type', contentType);
        }
        else {
            headers.append('Content-Type', this.contentTypeDefault);
        }
        if (headerKey) {
            if (headerValue) {
                headers.append(headerKey, headerValue);
            }
        }
        return headers;
    };
    HttpAbstract = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, appSettingsService_1.AppSettingsService])
    ], HttpAbstract);
    return HttpAbstract;
}());
exports.HttpAbstract = HttpAbstract;
//# sourceMappingURL=httpAbstract.js.map