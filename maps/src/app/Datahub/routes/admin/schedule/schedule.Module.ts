import {Schedule} from "./schedule";
import {SharedModule} from "../../../../ReusableComponents/SharedModule";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
//import {NgModule} from "@angular/core//metadata/ng_module";
import {ScheduleRouting} from "./schedule.routes";
import {NgModule} from "@angular/core";
import {HolidayModule} from "./holiday/holiday.Module";
import {HolidaySetCodeModule} from "./holidaySetCode/holidaySetCode.Module";
import {ConfigModule} from "./config/config.Module";
@NgModule({
    imports: [
        CommonModule, FormsModule,RouterModule,SharedModule,ScheduleRouting,HolidayModule,HolidaySetCodeModule,ConfigModule
    ],
    declarations:[Schedule]
})
export class ScheduleModule {
}
