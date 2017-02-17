import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {Dashboard} from './dashboard.component';
import {AuthGuard} from "../../../ReusableServices/AuthGuard";

export const DashboardRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Dashboard', component: Dashboard, canActivate:[AuthGuard]}
]);