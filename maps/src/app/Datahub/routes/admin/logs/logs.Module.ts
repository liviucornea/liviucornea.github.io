import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {SharedModule} from "../../../../ReusableComponents/SharedModule";
import {LogsRoutes} from "./logs.routes";

import {Logs} from "./logs";

@NgModule({
    imports: [CommonModule, BrowserModule, SharedModule, LogsRoutes],
    declarations: [Logs]

})

export class LogsModule { }
