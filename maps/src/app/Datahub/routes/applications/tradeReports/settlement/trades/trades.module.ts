import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../../../ReusableComponents/SharedModule";
import {TradesRouting} from "./trades.routes";
import {Trades} from "./trades";

@NgModule({
    imports: [
        CommonModule, RouterModule, SharedModule, FormsModule, TradesRouting
    ],
    declarations:[Trades],
    providers:[]

})

export class TradesModule {
}