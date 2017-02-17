import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {UserRouting} from "./user.routing";
import {AuthUser} from "./user";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";

@NgModule({
    imports:      [ BrowserModule, UserRouting, SharedModule],
    declarations: [AuthUser ],

})
export class AuthUserModule { }

