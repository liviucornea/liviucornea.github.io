"use strict";
var schedule_1 = require("./schedule");
var SharedModule_1 = require("../../../../ReusableComponents/SharedModule");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
//import {NgModule} from "@angular/core//metadata/ng_module";
var schedule_routes_1 = require("./schedule.routes");
var core_1 = require("@angular/core");
var holiday_Module_1 = require("./holiday/holiday.Module");
var holidaySetCode_Module_1 = require("./holidaySetCode/holidaySetCode.Module");
var config_Module_1 = require("./config/config.Module");
var ScheduleModule = (function () {
    function ScheduleModule() {
    }
    ScheduleModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, forms_1.FormsModule, router_1.RouterModule, SharedModule_1.SharedModule, schedule_routes_1.ScheduleRouting, holiday_Module_1.HolidayModule, holidaySetCode_Module_1.HolidaySetCodeModule, config_Module_1.ConfigModule
            ],
            declarations: [schedule_1.Schedule]
        }), 
        __metadata('design:paramtypes', [])
    ], ScheduleModule);
    return ScheduleModule;
}());
exports.ScheduleModule = ScheduleModule;
//# sourceMappingURL=schedule.Module.js.map