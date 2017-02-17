"use strict";
var core_1 = require("@angular/core");
var displayGrid_1 = require("../../../../../ReusableComponents/displayGrid/displayGrid");
var notificationAlertControlConfig_1 = require("./notificationAlertControlConfig");
var adminAuthApiService_1 = require("../adminAuthApiService");
var NotificationAlert = (function () {
    function NotificationAlert(adminAuthApiService) {
        this.adminAuthApiService = adminAuthApiService;
        this.controlConfig = notificationAlertControlConfig_1.NotificationAlertControlConfig;
    }
    NotificationAlert.prototype.ngAfterViewInit = function () {
        this.refreshAlerts();
    };
    NotificationAlert.prototype.refreshAlerts = function () {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.adminAuthApiService, "alert");
    };
    __decorate([
        core_1.ViewChild(displayGrid_1.DisplayGridComponent), 
        __metadata('design:type', displayGrid_1.DisplayGridComponent)
    ], NotificationAlert.prototype, "dataTable", void 0);
    NotificationAlert = __decorate([
        core_1.Component({
            selector: 'notificationAlert',
            template: '<div><displayGrid></displayGrid></div>'
        }), 
        __metadata('design:paramtypes', [adminAuthApiService_1.AdminAuthApiService])
    ], NotificationAlert);
    return NotificationAlert;
}());
exports.NotificationAlert = NotificationAlert;
//# sourceMappingURL=notificationAlert.js.map