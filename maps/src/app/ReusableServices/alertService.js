"use strict";
var core_1 = require('@angular/core');
var appSettings_1 = require("../Configuration/appSettings");
var interFormsService_1 = require("./interFormsService");
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
        if (text === void 0) { text = "N/A"; }
        this.addAlert(text, "success");
    };
    AlertService.prototype.warn = function (text) {
        if (text === void 0) { text = "N/A"; }
        this.addAlert(text, "warning");
        this.notificationTitle = 'Warning';
    };
    AlertService.prototype.error = function (text) {
        if (text === void 0) { text = "N/A"; }
        this.addAlert(text, "danger");
        this.notificationTitle = 'Error';
    };
    AlertService.prototype.addAlert = function (text, type) {
        if (text === void 0) { text = "N/A"; }
        if (type === void 0) { type = "success"; }
        this.intFormsSvc.stopSpinner();
        var alert = new Alert(text, type);
        this.notificationTitle = appSettings_1.AppNotificationsMSG.notificationTitle;
        if (this.alerts.find(function (o) { return o.text === text && o.type === type; }) === undefined) {
            this.alerts.push(alert);
        }
    };
    AlertService.prototype.addAlertAndRequestAnswer = function (text, type, title) {
        if (text === void 0) { text = "N/A"; }
        if (type === void 0) { type = "inputRequired"; }
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