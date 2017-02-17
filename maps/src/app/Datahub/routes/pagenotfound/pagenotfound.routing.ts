import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {PageNotFound} from "./pagenotfound";
import {AuthGuard} from "../../../ReusableServices/AuthGuard";

export const PageNotFoundRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/PageNotFound', component: PageNotFound, canActivate:[AuthGuard]}
]);


