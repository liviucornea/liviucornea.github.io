import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";
import {ExcelTradesRouting} from "./excelTrades.routes";
import {ExcelTrades} from "./excelTrades";
import {PostingsByDateTraderModule} from "./postingsByDateTrader/postingsByDateTrader.module";

@NgModule({
    imports: [
        CommonModule, RouterModule, SharedModule, ExcelTradesRouting, PostingsByDateTraderModule
    ],
    declarations:[ExcelTrades],
    providers:[]

})

export class ExcelTradesModule {

}