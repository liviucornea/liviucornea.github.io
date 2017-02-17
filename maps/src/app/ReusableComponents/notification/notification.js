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
var alertService_1 = require("../../ReusableServices/alertService");
var Notification = (function () {
    function Notification(alert) {
        this.alert = alert;
        this.active = true;
    }
    ;
    Notification.prototype.closeAlerts = function (i) {
        this.alert.alerts.splice(i, 1);
    };
    ;
    Notification.prototype.clickOK = function () {
        this.alert.requestConfirmationAnswer$.emit("OK");
        this.alert.askConfirmation = false;
        this.closeAll();
    };
    ;
    Notification.prototype.clickCancel = function () {
        this.alert.requestConfirmationAnswer$.emit("CANCEL");
        this.alert.askConfirmation = false;
        this.closeAll();
    };
    Notification.prototype.closeAll = function () {
        this.alert.alerts = [];
    };
    Notification = __decorate([
        core_1.Component({
            template: require("./notification.html"),
            selector: 'tdamNotifications'
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService])
    ], Notification);
    return Notification;
}());
exports.Notification = Notification;
//# sourceMappingURL=notification.js.map