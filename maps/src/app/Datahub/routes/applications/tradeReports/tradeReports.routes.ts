import {ModuleWithProviders} from "@angular/core";
import {RouterModule} from '@angular/router';
import {AuthGuard} from "../../../../ReusableServices/AuthGuard";
import {TradeReports} from "./tradeReports";

export const TradeReportsRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports', component: TradeReports, canActivate:[AuthGuard]}
]);

