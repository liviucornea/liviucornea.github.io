import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";
import {ValueSet} from "./valueSet";
import {ValueSetRouting} from "./valueSet.routing";

@NgModule({
    imports:      [BrowserModule, ValueSetRouting, SharedModule],
    declarations: [ValueSet],

})
export class ValueSetModule { }
