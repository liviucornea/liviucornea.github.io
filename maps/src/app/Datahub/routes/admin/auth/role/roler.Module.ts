import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";
import {AuthRole} from "./role";
import {RoleRouting} from "./role.routing";

@NgModule({
    imports:      [ BrowserModule, RoleRouting, SharedModule],
    declarations: [AuthRole ],

})
export class AuthRoleModule { }

