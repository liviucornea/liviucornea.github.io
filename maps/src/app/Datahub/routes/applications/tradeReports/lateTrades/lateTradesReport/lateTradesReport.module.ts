import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../../../ReusableComponents/SharedModule";
import {LateTradesReportRouting} from "./lateTradesreport.routes";
import {LateTradesReport} from "./lateTradesReport";

@NgModule({
    imports: [
        CommonModule, RouterModule, SharedModule, FormsModule, LateTradesReportRouting
    ],
    declarations:[LateTradesReport],
    providers:[]

})
export class LateTradesReportModule {
}