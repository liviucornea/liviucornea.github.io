import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {ExceptionReports} from "./exceptionReports";
import {AuthGuard} from "../../../../ReusableServices/AuthGuard";

export const ExceptionReportsRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/ExceptionReports', component: ExceptionReports, canActivate:[AuthGuard]}
]);
