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
var router_1 = require('angular2/router');
var api_1 = require('../../services/api/api');
var alert_1 = require('../../services/alert/alert');
var NlogInstance = (function () {
    function NlogInstance(api, alert, params) {
        this.sampleValue = "2016-01-11T13:49:42.7";
        this.sampleDate = new Date("2016-01-11T13:49:42.7");
        this.api = api;
        this.alert = alert;
        this.instanceId = params.get('instanceId');
        this.refresh();
    }
    NlogInstance.prototype.stringAsDate = function (str) {
        return new Date(str);
    };
    NlogInstance.prototype.refresh = function () {
        var _this = this;
        this.api.getNLogByInstanceId(this.instanceId)
            .subscribe(function (res) {
            _this.nlogInstance = res.json();
        }, function (error) {
            _this.alert.error("async error #" + error.status);
        }, function () { });
    };
    NlogInstance.prototype.clear = function () {
        this.nlogInstance = Array();
    };
    NlogInstance = __decorate([
        core_1.Component({
            selector: 'nlogInstance',
            templateUrl: '../..//routes/log/nlogInstance.html',
            styleUrls: ['../..//routes/log/nlogInstance.css'],
        }), 
        __metadata('design:paramtypes', [api_1.ApiService, alert_1.AlertService, (typeof (_a = typeof router_1.RouteParams !== 'undefined' && router_1.RouteParams) === 'function' && _a) || Object])
    ], NlogInstance);
    return NlogInstance;
    var _a;
}());
exports.NlogInstance = NlogInstance;
//# sourceMappingURL=nlogInstance.js.map