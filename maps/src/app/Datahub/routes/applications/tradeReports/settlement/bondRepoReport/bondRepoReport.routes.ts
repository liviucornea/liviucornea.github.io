import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from "../../../../../../ReusableServices/AuthGuard";
import {BondRepoReport} from "./bondRepoReport";

export const BondRepoReportRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports/Settlement/BondRepoReport', component: BondRepoReport, canActivate:[AuthGuard] }
]);