import {NgModule}       from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../../../ReusableComponents/SharedModule";
import {BmiScotiaRouting} from "./scotia.routes";
import {BmiScotia} from "./scotia";

@NgModule({
    imports: [
        CommonModule, RouterModule,SharedModule, FormsModule, BmiScotiaRouting
    ],
    declarations:[BmiScotia],
    providers:[]

})
export class BmiScotiaModule {
}