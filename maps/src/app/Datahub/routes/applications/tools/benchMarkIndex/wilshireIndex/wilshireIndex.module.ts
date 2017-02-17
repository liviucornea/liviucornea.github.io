import {NgModule}       from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../../../ReusableComponents/SharedModule";
import {BmiWilshireIndex} from "./wilshireIndex";
import {BmiWilshireIndexRouting} from "./wilshireIndex.routes";

@NgModule({
    imports: [
        CommonModule, RouterModule,SharedModule, FormsModule, BmiWilshireIndexRouting
    ],
    declarations:[BmiWilshireIndex],
    providers:[]

})
export class BmiWilshireIndexModule {
}