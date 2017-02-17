import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from "../../../../../../ReusableServices/AuthGuard";
import {IRSTradeReport} from "./iRSTradeReport";

export const IRSTradeReportRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports/Settlement/IRSTradeReport', component: IRSTradeReport, canActivate:[AuthGuard] }
]);