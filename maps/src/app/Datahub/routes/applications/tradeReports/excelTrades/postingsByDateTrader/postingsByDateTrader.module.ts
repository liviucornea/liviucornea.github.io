import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../../../ReusableComponents/SharedModule";
import {PostingsByDateTraderRouting} from "./postingsByDateTrader.routes";
import {PostingsByDateTrader} from "./postingsByDateTrader";

@NgModule({
    imports: [
        CommonModule, RouterModule, SharedModule, FormsModule, PostingsByDateTraderRouting
    ],
    declarations:[PostingsByDateTrader],
    providers:[]

})

export class PostingsByDateTraderModule {
}