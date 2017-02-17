import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {AuthUser} from "./user";
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";

export const UserRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Auth/User', component: AuthUser, canActivate:[AuthGuard]}
]);


