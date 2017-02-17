import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../../../ReusableComponents/SharedModule";
import {TradeReportByPMRouting} from "./tradeReportByPM.routes";
import {TradeReportByPM} from "./tradeReportByPM";

@NgModule({
    imports: [
        CommonModule, RouterModule, SharedModule, FormsModule, TradeReportByPMRouting
    ],
    declarations:[TradeReportByPM],
    providers:[]

})

export class TradeReportByPMModule {
}