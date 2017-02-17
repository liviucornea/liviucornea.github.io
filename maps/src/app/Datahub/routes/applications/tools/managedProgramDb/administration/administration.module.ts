import {NgModule}       from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../../../../ReusableComponents/SharedModule";
import {MpdbAdministrationRouting} from "./administration.routes";
import {MpdbAdministration} from "./administration";

@NgModule({
    imports: [
        CommonModule, RouterModule,SharedModule, MpdbAdministrationRouting
    ],
    declarations:[MpdbAdministration],
    providers:[]

})
export class MpdbAdministrationModule {
}