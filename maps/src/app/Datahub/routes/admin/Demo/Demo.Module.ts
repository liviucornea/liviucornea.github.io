import { NgModule }           from '@angular/core';
import {SharedModule} from "../../../../ReusableComponents/SharedModule";
import {AuxComponentsModule} from "../../../../ReusableComponents/AuxComponenetsModule";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {Demo} from "./Demo";
import {DemoRoute} from "./Demo.routing";
import {ToastDemoModule} from "./toastDemo/toastyDemo.Module";
import {DnDDemoModule} from "./dndDemo/dndDemo.Module";
import {SlimSliderDemoModule} from "./slimSlider/slimSliderDemo.Module";


@NgModule({
    imports:      [ BrowserModule, FormsModule, RouterModule, SharedModule,AuxComponentsModule  ,DemoRoute,SlimSliderDemoModule,DnDDemoModule,ToastDemoModule ],
    declarations: [Demo]
})
export class DemoModule { }




