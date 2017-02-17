"use strict";
var core_1 = require("@angular/core");
var displayGrid_1 = require("../../../../../ReusableComponents/displayGrid/displayGrid");
var scheduleService_1 = require("../scheduleService");
var alertService_1 = require("../../../../../ReusableServices/alertService");
var holidayControlConfig_1 = require("./holidayControlConfig");
var common_1 = require("@angular/common");
var navigationService_1 = require("../../../../../ReusableServices/navigationService");
var Holiday = (function () {
    function Holiday(schedulesApi, alert, navService, location) {
        this.schedulesApi = schedulesApi;
        this.alert = alert;
        this.navService = navService;
        this.location = location;
        this.newHoliday = {};
        this.searchKey = "";
        this.controlConfig = holidayControlConfig_1.HolidayControlConfig;
        //   navService.setCurrentPage(location.path(false));
    }
    Holiday.prototype.ngAfterViewInit = function () {
        this.refreshHolidays();
    };
    Holiday.prototype.refreshHolidays = function () {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.schedulesApi, "holiday");
    };
    __decorate([
        core_1.ViewChild(displayGrid_1.DisplayGridComponent), 
        __metadata('design:type', displayGrid_1.DisplayGridComponent)
    ], Holiday.prototype, "dataTable", void 0);
    Holiday = __decorate([
        core_1.Component({
            selector: 'schedule',
            template: "<div><displayGrid></displayGrid></div>",
            providers: [scheduleService_1.SchedulesApiService]
        }), 
        __metadata('design:paramtypes', [scheduleService_1.SchedulesApiService, alertService_1.AlertService, navigationService_1.NavigationService, common_1.Location])
    ], Holiday);
    return Holiday;
}());
exports.Holiday = Holiday;
//# sourceMappingURL=holiday.js.map