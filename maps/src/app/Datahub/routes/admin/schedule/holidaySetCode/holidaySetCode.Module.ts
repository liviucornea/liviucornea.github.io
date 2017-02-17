import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";
import {HolidaySetCode} from "./holidaySetCode";
import {HolidaySetCodeRouting} from "./holidaySetCode.routing";


@NgModule({
    imports:      [ BrowserModule, HolidaySetCodeRouting, SharedModule,HolidaySetCodeRouting],
    declarations: [HolidaySetCode ],

})
export class HolidaySetCodeModule { }
