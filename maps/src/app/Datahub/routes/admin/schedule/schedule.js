"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var navigationService_1 = require("../../../../ReusableServices/navigationService");
var Schedule = (function () {
    function Schedule(navService, location) {
        this.navService = navService;
        this.location = location;
        /*this.navService.getChildMenu(['Admin','Schedule']);
        this.navService.getLeftMenuRoutes(['Schedule']);
        navService.setCurrentPage(location.path(false));*/
    }
    Schedule = __decorate([
        core_1.Component({
            selector: 'schedule',
            template: ""
        }), 
        __metadata('design:paramtypes', [navigationService_1.NavigationService, common_1.Location])
    ], Schedule);
    return Schedule;
}());
exports.Schedule = Schedule;
//# sourceMappingURL=schedule.js.map