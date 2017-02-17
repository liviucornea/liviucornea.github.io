import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";
import {BloombergTradesRouting} from "./bloombergTrades.routes";
import {BloombergTrades} from "./bloombergTrades";
import {PostingsByDateModule} from "./postingsByDate/postingsByDate.module";

@NgModule({
    imports: [
        CommonModule, RouterModule, SharedModule, BloombergTradesRouting, PostingsByDateModule
    ],
    declarations:[BloombergTrades],
    providers:[]

})

export class BloombergTradesModule {

}