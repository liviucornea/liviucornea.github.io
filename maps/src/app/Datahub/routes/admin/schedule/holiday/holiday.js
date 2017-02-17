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