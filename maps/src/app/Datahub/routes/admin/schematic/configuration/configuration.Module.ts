import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";
import {Configuration} from "./configuration";
import {ConfigurationRouting} from "./configuration.routing";


@NgModule({
    imports:      [ BrowserModule, SharedModule,ConfigurationRouting],
    declarations: [Configuration ],

})
export class ConfigurationModule { }