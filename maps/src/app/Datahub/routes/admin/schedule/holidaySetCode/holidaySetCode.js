"use strict";
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