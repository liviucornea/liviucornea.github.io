import {NgModule}       from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../../../ReusableComponents/SharedModule";
import {BmiBMONesbittBurnsIndex} from "./bmoNesbittBurnsIndex";
import {BmiBMONesbittBurnsIndexRouting} from "./bmoNesbittBurnsIndex.routes";

@NgModule({
    imports: [
        CommonModule, RouterModule,SharedModule, FormsModule, BmiBMONesbittBurnsIndexRouting
    ],
    declarations:[BmiBMONesbittBurnsIndex],
    providers:[]

})
export class BmiBMONesbittBurnsIndexModule {
}