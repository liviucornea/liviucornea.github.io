import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../../../ReusableComponents/SharedModule";
import {IRSTradeReportRouting} from "./iRSTradeReport.routes";
import {IRSTradeReport} from "./iRSTradeReport";

@NgModule({
    imports: [
        CommonModule, RouterModule, SharedModule, FormsModule, IRSTradeReportRouting
    ],
    declarations:[IRSTradeReport],
    providers:[]

})

export class IRSTradeReportModule {
}