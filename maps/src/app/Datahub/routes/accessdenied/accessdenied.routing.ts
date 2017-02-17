import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {AccessDenied} from "./accessdenied";
import {AuthGuard} from "../../../ReusableServices/AuthGuard";

export const AccessDeniedRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/AccessDenied', component: AccessDenied, canActivate:[AuthGuard]}
]);


