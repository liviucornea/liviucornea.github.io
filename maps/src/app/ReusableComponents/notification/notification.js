"use strict";
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