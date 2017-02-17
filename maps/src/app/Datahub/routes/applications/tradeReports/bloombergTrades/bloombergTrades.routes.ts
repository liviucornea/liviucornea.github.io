import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";
import {BloombergTrades} from "./bloombergTrades";

export const BloombergTradesRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports/BloombergTrades', component: BloombergTrades, canActivate:[AuthGuard]}
]);

