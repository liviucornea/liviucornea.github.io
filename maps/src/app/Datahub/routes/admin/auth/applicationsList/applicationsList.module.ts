import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {ApplicationsListRouting} from "./applicationsList.routes";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";
import {ApplicationsList} from "./applicationsList";

@NgModule({
    imports:      [ BrowserModule, ApplicationsListRouting, SharedModule],
    declarations: [ApplicationsList],
})
export class ApplicationsListModule { }

