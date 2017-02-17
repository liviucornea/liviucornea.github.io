import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";
import {GlobalLink} from "./globalLink";

export const GlobalLinkRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports/GlobalLink', component: GlobalLink, canActivate:[AuthGuard]}
]);

