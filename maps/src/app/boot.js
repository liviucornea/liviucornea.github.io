"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// CORE
var browser_1 = require('angular2/platform/browser');
var core_1 = require('angular2/core');
// HTTP
var http_1 = require('angular2/http');
// ROUTER
var router_1 = require('angular2/router');
// CUSTOM Services for injection
var api_1 = require('./services/api/api');
var auth_1 = require('./services/auth/auth');
var alert_1 = require('./services/alert/alert');
// STARTUP APP
var app_1 = require('./app');
var CORSBrowserXHr = (function (_super) {
    __extends(CORSBrowserXHr, _super);
    function CORSBrowserXHr() {
        _super.apply(this, arguments);
    }
    CORSBrowserXHr.prototype.build = function () {
        var x = _super.prototype.build.call(this);
        x['withCredentials'] = true;
        return x;
    };
    CORSBrowserXHr = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CORSBrowserXHr);
    return CORSBrowserXHr;
}(http_1.BrowserXhr));
exports.CORSBrowserXHr = CORSBrowserXHr;
document.addEventListener('DOMContentLoaded', function main() {
    browser_1.bootstrap(app_1.App, [
        router_1.ROUTER_PROVIDERS,
        core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
        //provide(APP_BASE_HREF, { useValue: '/' }), // this can be used for PathLocationStrategy, which we're not using
        http_1.HTTP_PROVIDERS,
        core_1.provide(http_1.BrowserXhr, { useClass: CORSBrowserXHr }),
        api_1.ApiService,
        alert_1.AlertService,
        auth_1.AuthService,
    ]);
});
//# sourceMappingURL=boot.js.map