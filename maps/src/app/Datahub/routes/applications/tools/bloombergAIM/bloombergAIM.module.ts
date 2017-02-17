import {NgModule}       from '@angular/core';
import {BloombergAIM} from "./bloombergAIM";
import {BrowserModule} from "@angular/platform-browser";
import {BloombergAIMRouting} from "./bloombergAIM.routes";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";

@NgModule({
    imports: [
        BrowserModule, BloombergAIMRouting, SharedModule
    ],
    declarations:[BloombergAIM],
    providers:[]

})
export class BloombergAIMModule {

}