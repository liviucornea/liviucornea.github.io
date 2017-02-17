import {NgModule}       from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AccessDeniedRouting} from "./accessdenied.routing";
import {AccessDenied} from "./accessdenied";


@NgModule({
    imports: [
        CommonModule, RouterModule,AccessDeniedRouting
    ],
    declarations:[AccessDenied],

})
export class AccessDeniedModule {
}