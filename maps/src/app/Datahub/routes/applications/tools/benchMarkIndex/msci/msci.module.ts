import {NgModule}       from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../../../ReusableComponents/SharedModule";
import {BmiMsciRouting} from "./msci.routes";
import {BmiMsci} from "./msci";

@NgModule({
    imports: [
        CommonModule, RouterModule,SharedModule, FormsModule, BmiMsciRouting
    ],
    declarations:[BmiMsci],
    providers:[]

})
export class BmiMsciModule {
}