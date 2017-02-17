import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {Applications} from "./applications";
import {ApplicationsMainRouting} from "./applications.routes";
import {ToolsModule} from "./tools/tools.module";
import {ExceptionReportsModule} from "./exceptionReports/exceptionReports.module";
import {TradeReportsModule} from "./tradeReports/tradesReports.module";
import {ApplicationsCommonModule} from "./aplicationsComponents/applicationsComponentsModule";

@NgModule({
    imports: [
        CommonModule, RouterModule, ApplicationsMainRouting, ToolsModule, ExceptionReportsModule, TradeReportsModule,ApplicationsCommonModule
    ],
    declarations:[Applications],
    providers:[]

})
export class ApplicationsModule {
}