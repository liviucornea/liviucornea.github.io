import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {Admin} from "./admin";
import {AuthGuard} from "../../../ReusableServices/AuthGuard";

export const AdminMainRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin', component: Admin, canActivate:[AuthGuard]}
]);


