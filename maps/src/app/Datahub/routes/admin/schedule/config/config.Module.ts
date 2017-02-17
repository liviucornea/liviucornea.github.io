import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {Config} from "./config";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";
import {ConfigRouting} from "./config.routing";

@NgModule({
    imports:      [ BrowserModule, ConfigRouting, SharedModule,ConfigRouting],
    declarations: [Config ],

})
export class ConfigModule { }
