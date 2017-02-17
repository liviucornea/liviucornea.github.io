import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from "../../../../../../ReusableServices/AuthGuard";
import {LateTradesReport} from "./lateTradesReport";

export const LateTradesReportRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports/LateTrades/LateTradesReport', component: LateTradesReport, canActivate:[AuthGuard] }
]);