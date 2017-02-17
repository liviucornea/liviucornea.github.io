import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";


import {AppConfigurationRouting} from "./appConfiguration.routes";
import { AppConfiguration } from "./appConfiguration";


@NgModule({
    imports: [BrowserModule, AppConfigurationRouting, SharedModule],
    declarations: [AppConfiguration],
})
export class AppConfigurationModule { 

}

