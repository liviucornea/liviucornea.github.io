import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from "../../../../../../ReusableServices/AuthGuard";
import {PostingsByDateTrader} from "./postingsByDateTrader";

export const PostingsByDateTraderRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports/ExcelTrades/PostingsByDateTrader', component: PostingsByDateTrader, canActivate:[AuthGuard] }
]);