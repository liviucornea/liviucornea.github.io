import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {Home} from "./home";
import {AuthGuard} from "../../../ReusableServices/AuthGuard";

export const HomeRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Home', component: Home, canActivate:[AuthGuard]}
]);


