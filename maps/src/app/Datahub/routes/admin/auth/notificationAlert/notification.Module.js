"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require("@angular/platform-browser");
var SharedModule_1 = require("../../../../../ReusableComponents/SharedModule");
var notification_routing_1 = require("./notification.routing");
var notificationAlert_1 = require("./notificationAlert");
var NotificationModule = (function () {
    function NotificationModule() {
    }
    NotificationModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, notification_routing_1.NotificationRouting, SharedModule_1.SharedModule],
            declarations: [notificationAlert_1.NotificationAlert],
        }), 
        __metadata('design:paramtypes', [])
    ], NotificationModule);
    return NotificationModule;
}());
exports.NotificationModule = NotificationModule;
//# sourceMappingURL=notification.Module.js.map