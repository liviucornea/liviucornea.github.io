import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {MenuItem} from "./menuItem";
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";

export const MenuItemRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Auth/MenuItem', component: MenuItem, canActivate:[AuthGuard]}
]);


