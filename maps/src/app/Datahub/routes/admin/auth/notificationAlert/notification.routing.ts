import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {NotificationAlert} from "./notificationAlert";
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";



export const NotificationRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Auth/NotificationAlert', component: NotificationAlert, canActivate:[AuthGuard]}
]);


