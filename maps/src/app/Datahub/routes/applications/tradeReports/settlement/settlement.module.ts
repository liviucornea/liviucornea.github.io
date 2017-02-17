import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";
import {SettlementRouting} from "./settlement.routes";
import {Settlement} from "./settlement";
import {BondRepoReportModule} from "./bondRepoReport/bondRepoReport.module";
import {IRSTradeReportModule} from "./iRSTradeReport/iRSTradeReport.module";
import {TradeReportByPMModule} from "./tradeReportByPM/tradeReportByPM.module";
import {TradesModule} from "./trades/trades.module";
import {SettlementService} from "./settlementService";

@NgModule({
    imports: [
        CommonModule, RouterModule, SharedModule, SettlementRouting, BondRepoReportModule, IRSTradeReportModule, TradeReportByPMModule, TradesModule
    ],
    declarations:[Settlement],
    providers:[SettlementService]

})

export class SettlementModule {

}