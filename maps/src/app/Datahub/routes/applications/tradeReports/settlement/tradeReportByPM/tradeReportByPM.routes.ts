import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from "../../../../../../ReusableServices/AuthGuard";
import {TradeReportByPM} from "./tradeReportByPM";

export const TradeReportByPMRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports/Settlement/TradeReportByPM', component: TradeReportByPM, canActivate:[AuthGuard] }
]);