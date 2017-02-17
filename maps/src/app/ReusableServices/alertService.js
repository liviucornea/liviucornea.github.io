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
var appSettings_1 = require('../Configuration/appSettings');
var interFormsService_1 = require('./interFormsService');
var AlertService = (function () {
    function AlertService(intFormsSvc) {
        this.intFormsSvc = intFormsSvc;
        this.askConfirmation = false;
        this.notificationTitle = appSettings_1.AppNotificationsMSG.notificationTitle;
        this.alerts = new Array();
        this.requestConfirmationAnswer$ = new core_1.EventEmitter();
        this.sendSectionForDelete$ = new core_1.EventEmitter();
    }
    AlertService.prototype.ok = function (text) {
        if (text === void 0) { text = 'N/A'; }
        this.addAlert(text, 'success');
    };
    AlertService.prototype.warn = function (text) {
        if (text === void 0) { text = 'N/A'; }
        this.addAlert(text, 'warning');
        this.notificationTitle = 'Warning';
    };
    AlertService.prototype.error = function (text) {
        if (text === void 0) { text = 'N/A'; }
        this.addAlert(text, 'danger');
        this.notificationTitle = 'Error';
    };
    AlertService.prototype.addAlert = function (text, type) {
        if (text === void 0) { text = 'N/A'; }
        if (type === void 0) { type = 'success'; }
        this.intFormsSvc.stopSpinner();
        var alert = new Alert(text, type);
        this.notificationTitle = appSettings_1.AppNotificationsMSG.notificationTitle;
        if (this.alerts.find(function (o) { return o.text === text && o.type === type; }) === undefined) {
            this.alerts.push(alert);
        }
    };
    AlertService.prototype.addAlertAndRequestAnswer = function (text, type, title) {
        if (text === void 0) { text = 'N/A'; }
        if (type === void 0) { type = 'inputRequired'; }
        this.intFormsSvc.stopSpinner();
        this.askConfirmation = true;
        this.notificationTitle = title ? title : appSettings_1.AppNotificationsMSG.deletionTitle;
        var alert = new Alert(text, type);
        if (this.alerts.find(function (o) { return o.text === text && o.type === type; }) === undefined) {
            this.alerts.push(alert);
        }
    };
    AlertService = __decorate([
        core_1.Injectable(),
        core_1.Component({}), 
        __metadata('design:paramtypes', [interFormsService_1.InterFormsService])
    ], AlertService);
    return AlertService;
}());
exports.AlertService = AlertService;
;
var Alert = (function () {
    function Alert(text, type) {
        this.text = text;
        this.type = type;
    }
    return Alert;
}());
exports.Alert = Alert;
;
//# sourceMappingURL=alertService.js.map