import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {ApplicationBuilder} from "./applicationBuilder";
import {ApplicationBuilderRouting} from "./applicationBuilder.routing";
import {SharedModule} from "../../../../ReusableComponents/SharedModule";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports:      [FormsModule, BrowserModule, ApplicationBuilderRouting, SharedModule],
    declarations: [ApplicationBuilder ],
    providers:[]
})
export class ApplicationBuilderModule { }

