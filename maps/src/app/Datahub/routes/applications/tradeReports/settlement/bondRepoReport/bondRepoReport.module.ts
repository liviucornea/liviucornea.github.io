import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../../../ReusableComponents/SharedModule";
import {BondRepoReportRouting} from "./bondRepoReport.routes";
import {BondRepoReport} from "./bondRepoReport";

@NgModule({
    imports: [
        CommonModule, RouterModule, SharedModule, FormsModule, BondRepoReportRouting
    ],
    declarations:[BondRepoReport],
    providers:[]

})

export class BondRepoReportModule {
}