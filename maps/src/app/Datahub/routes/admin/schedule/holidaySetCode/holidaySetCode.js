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
var holidaySetCodeConfig_1 = require("./holidaySetCodeConfig");
var common_1 = require("@angular/common");
var navigationService_1 = require("../../../../../ReusableServices/navigationService");
var HolidaySetCode = (function () {
    function HolidaySetCode(schedulesApi, alert, navService, location) {
        this.schedulesApi = schedulesApi;
        this.alert = alert;
        this.navService = navService;
        this.location = location;
        this.newHolidaySetCode = {};
        this.searchKey = "";
        //TODO:RF
        this.controlConfig = holidaySetCodeConfig_1.HolidaySetCodeControlConfig;
        // navService.setCurrentPage(location.path(false));
    }
    HolidaySetCode.prototype.ngAfterViewInit = function () {
        this.refreshHolidaySetCodes();
    };
    HolidaySetCode.prototype.refreshHolidaySetCodes = function () {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.schedulesApi, "holidaysetcode");
    };
    __decorate([
        core_1.ViewChild(displayGrid_1.DisplayGridComponent), 
        __metadata('design:type', displayGrid_1.DisplayGridComponent)
    ], HolidaySetCode.prototype, "dataTable", void 0);
    HolidaySetCode = __decorate([
        core_1.Component({
            selector: 'schedule',
            template: '<div><displayGrid></displayGrid></div>',
            //TODO:RF
            //directives: [DisplayGridComponent],
            //pipes: [TokenFilterPipe],
            providers: [scheduleService_1.SchedulesApiService]
        }), 
        __metadata('design:paramtypes', [scheduleService_1.SchedulesApiService, alertService_1.AlertService, navigationService_1.NavigationService, common_1.Location])
    ], HolidaySetCode);
    return HolidaySetCode;
}());
exports.HolidaySetCode = HolidaySetCode;
//# sourceMappingURL=holidaySetCode.js.map