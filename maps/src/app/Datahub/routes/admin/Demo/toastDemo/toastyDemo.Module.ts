import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ToastDemo} from "./toastyDemo";
import {ToastDemoRoute} from "./toastyDemo.routing";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";
import {AuxComponentsModule} from "../../../../../ReusableComponents/AuxComponenetsModule";

@NgModule({
    imports:      [ BrowserModule, FormsModule, RouterModule, SharedModule,AuxComponentsModule  ,ToastDemoRoute ],
    declarations: [ToastDemo]
})
export class ToastDemoModule { }




