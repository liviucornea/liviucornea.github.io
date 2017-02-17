import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from "../../../../../../ReusableServices/AuthGuard";
import {Trades} from "./trades";

export const TradesRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports/Settlement/Trades', component: Trades, canActivate:[AuthGuard] }
]);