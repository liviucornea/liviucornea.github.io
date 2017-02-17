import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Logs} from "./logs";
import {AuthGuard} from "../../../../ReusableServices/AuthGuard";

export const LogsRoutes: ModuleWithProviders = RouterModule.forChild([
    {path: 'Datahub/Admin/Logs', component: Logs, canActivate: [AuthGuard]}
]);
