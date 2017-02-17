import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from "../../../../../../ReusableServices/AuthGuard";
import {PostingsByDate} from "./postingsByDate";

export const PostingsByDateRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports/BloombergTrades/PostingsByDate', component: PostingsByDate, canActivate:[AuthGuard] }
]);