import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { ConnectionStringRouting } from "./connectionString.routes";
import { SharedModule } from "../../../../../ReusableComponents/SharedModule";
import { ConnectionString } from "./connectionString";

@NgModule({
    imports: [BrowserModule, ConnectionStringRouting, SharedModule],
    declarations: [ConnectionString],
})
export class ConnectionStringModule { }

