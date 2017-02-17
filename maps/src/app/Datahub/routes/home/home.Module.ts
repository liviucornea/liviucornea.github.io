import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {Home} from "./home";
import {HomeRouting} from "./home.routing";
import {SharedModule} from "../../../ReusableComponents/SharedModule";
import {CalendarModule} from "../../../ReusableComponents/Calendar/calendar.Module";
import {AuxComponentsModule} from "../../../ReusableComponents/AuxComponenetsModule";

@NgModule({
    imports:      [ BrowserModule, HomeRouting, SharedModule, CalendarModule, AuxComponentsModule],
    declarations: [Home]
})
export class HomeModule { }




