"use strict";
var core_1 = require('@angular/core');
var appSettings_1 = require("../Configuration/appSettings");
var AppSettingsService = (function () {
    function AppSettingsService() {
        this.appSettings = appSettings_1.AppSettings;
        this.appNotificationsMsg = appSettings_1.AppNotificationsMSG;
    }
    AppSettingsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AppSettingsService);
    return AppSettingsService;
}());
exports.AppSettingsService = AppSettingsService;
;
//# sourceMappingURL=appSettingsService.js.map