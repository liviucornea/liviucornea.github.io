import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";
import {MenuItemRouting} from "./menuItem.routing";
import {MenuItem} from "./menuItem";

@NgModule({
    imports:      [ BrowserModule, MenuItemRouting, SharedModule],
    declarations: [MenuItem ],

})
export class MenuItemModule { }

