import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";
import {LateTrades} from "./lateTrades";

export const LateTradesRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports/LateTrades', component: LateTrades, canActivate:[AuthGuard]}
]);

