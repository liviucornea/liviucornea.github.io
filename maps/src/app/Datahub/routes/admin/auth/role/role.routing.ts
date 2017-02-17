import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {AuthRole} from "./role";
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";


export const RoleRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Auth/Role', component: AuthRole, canActivate:[AuthGuard]}
]);


