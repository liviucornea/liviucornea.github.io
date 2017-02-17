import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {DnDDemo} from "./dndDemo";

import {DnDDemoRoute} from "./dndDemo.routing";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";
import {AuxComponentsModule} from "../../../../../ReusableComponents/AuxComponenetsModule";
@NgModule({
    imports:      [ BrowserModule, DnDDemoRoute, SharedModule, AuxComponentsModule],
    declarations: [DnDDemo]
})
export class DnDDemoModule { }




