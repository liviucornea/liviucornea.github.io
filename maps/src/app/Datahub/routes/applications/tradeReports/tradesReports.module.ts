import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {TradeReports} from "./tradeReports";
import {TradeReportsRouting} from "./tradeReports.routes";
import {BloombergTradesModule} from "./bloombergTrades/bloombergTrades.module";
import {ExcelTradesModule} from "./excelTrades/excelTrades.module";
import {GlobalLinkModule} from "./globalLink/globalLink.module";
import {LateTradesModule} from "./lateTrades/lateTrades.module";
import {SettlementModule} from "./settlement/settlement.module";

@NgModule({
    imports: [
        CommonModule, RouterModule, TradeReportsRouting, BloombergTradesModule, ExcelTradesModule, GlobalLinkModule, LateTradesModule, SettlementModule
    ],
    declarations:[TradeReports]
})

export class TradeReportsModule {

}