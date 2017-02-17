import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {Applications} from "./applications";
import {AuthGuard} from "../../../ReusableServices/AuthGuard";

export const ApplicationsMainRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications', component: Applications, canActivate:[AuthGuard]}
]);

