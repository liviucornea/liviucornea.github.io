import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { DefaultSettingsRouting } from "./defaultSettings.routes";
import { SharedModule } from "../../../../../ReusableComponents/SharedModule";
import { DefaultSettings } from "./defaultSettings";

@NgModule({
    imports: [BrowserModule, DefaultSettingsRouting, SharedModule],
    declarations: [DefaultSettings],
})
export class DefaultSettingsModule { }

