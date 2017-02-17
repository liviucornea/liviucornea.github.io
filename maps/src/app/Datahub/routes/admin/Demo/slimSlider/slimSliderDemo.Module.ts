import { NgModule }           from '@angular/core';
import {SlimSliderRoute} from "./slimSliderDemo.routing";
import {SlimSliderDemo} from "./SlimSliderDemo";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AuxComponentsModule} from "../../../../../ReusableComponents/AuxComponenetsModule";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";


@NgModule({
    imports:      [ BrowserModule, FormsModule, RouterModule, SharedModule,AuxComponentsModule  ,SlimSliderRoute ],
    declarations: [SlimSliderDemo]
})
export class SlimSliderDemoModule { }




