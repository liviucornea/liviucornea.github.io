import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {AuthGuard} from "../../../../../../ReusableServices/AuthGuard";
import {MpdbPortfolio} from "./portfolio";

export const MpdbPortfolioRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/ManagedProgramDb/MpdbPortfolio', component: MpdbPortfolio, canActivate:[AuthGuard]},
    { path: 'Datahub/Applications/Tools/ManagedProgramDb/MpdbPortfolio/:id', component: MpdbPortfolio, canActivate:[AuthGuard]}
]);