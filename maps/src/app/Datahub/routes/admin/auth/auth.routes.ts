import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {Auth} from "./auth";
import {AuthGuard} from "../../../../ReusableServices/AuthGuard";

export const AuthRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Auth', component: Auth, canActivate:[AuthGuard]}
]);

