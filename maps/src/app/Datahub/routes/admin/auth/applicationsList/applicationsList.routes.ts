import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {ApplicationsList} from "./applicationsList";
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";

export const ApplicationsListRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Auth/ApplicationsList', component: ApplicationsList, canActivate:[AuthGuard]}
]);


