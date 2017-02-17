import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";
import {HolidayRouting} from "./holiday.routing";
import {Holiday} from "./holiday";

@NgModule({
    imports:      [ BrowserModule, HolidayRouting, SharedModule],
    declarations: [Holiday ],

})
export class HolidayModule { }
