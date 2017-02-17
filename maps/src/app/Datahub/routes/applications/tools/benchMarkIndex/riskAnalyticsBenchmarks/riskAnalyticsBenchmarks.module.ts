import {NgModule}       from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../../../ReusableComponents/SharedModule";
import {BmiRiskAnalyticsBenchmarksRouting} from "./riskAnalyticsBenchmarks.routes";
import {BmiRiskAnalyticsBenchmarks} from "./riskAnalyticsBenchmarks";

@NgModule({
    imports: [
        CommonModule, RouterModule,SharedModule, FormsModule, BmiRiskAnalyticsBenchmarksRouting
    ],
    declarations:[BmiRiskAnalyticsBenchmarks],
    providers:[]

})
export class BmiRiskAnalyticsBenchmarksModule {
}