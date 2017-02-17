import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";
import {Settlement} from "./settlement";

export const SettlementRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports/Settlement', component: Settlement, canActivate:[AuthGuard]}
]);

