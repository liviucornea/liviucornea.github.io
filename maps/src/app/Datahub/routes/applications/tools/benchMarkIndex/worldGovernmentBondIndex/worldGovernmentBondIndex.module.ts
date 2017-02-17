import {NgModule}       from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../../../ReusableComponents/SharedModule";
import {BmiWorldGovernmentBondIndex} from "./worldGovernmentBondIndex";
import {BmiWorldGovernmentBondIndexRouting} from "./worldGovernmentBondIndex.routes";

@NgModule({
    imports: [
        CommonModule, RouterModule,SharedModule, FormsModule, BmiWorldGovernmentBondIndexRouting
    ],
    declarations:[BmiWorldGovernmentBondIndex],
    providers:[]

})
export class BmiWorldGovernmentBondIndexModule {
}