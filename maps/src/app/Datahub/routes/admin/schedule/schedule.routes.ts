import {RouterModule} from '@angular/router';
import {Schedule} from "./schedule";
import {ModuleWithProviders} from "@angular/core";
import {AuthGuard} from "../../../../ReusableServices/AuthGuard";

export const ScheduleRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Schedule', component: Schedule, canActivate:[AuthGuard]}
]);