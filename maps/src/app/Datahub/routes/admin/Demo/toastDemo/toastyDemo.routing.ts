import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {ToastDemo} from "./toastyDemo";
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";



export const ToastDemoRoute: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Demo/ToastDemo', component: ToastDemo, canActivate:[AuthGuard]}
]);


