import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";
import {AuthResource} from "./resource";
import {ResourceRouting} from "./resource.routing";

@NgModule({
    imports:      [ BrowserModule, ResourceRouting, SharedModule],
    declarations: [AuthResource ],

})
export class ResourceModule { }

