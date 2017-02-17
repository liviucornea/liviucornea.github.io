import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";
import {LateTradesRouting} from "./lateTrades.routes";
import {LateTrades} from "./lateTrades";
import {LateTradesReportModule} from "./lateTradesReport/lateTradesReport.module";

@NgModule({
    imports: [
        CommonModule, RouterModule, SharedModule, LateTradesRouting, LateTradesReportModule
    ],
    declarations:[LateTrades],
    providers:[]

})

export class LateTradesModule {

}