import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {AuthResource} from "./resource";
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";



export const ResourceRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Auth/Resource', component: AuthResource, canActivate:[AuthGuard]}
]);


