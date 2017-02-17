import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {MpdbReports} from "./reports";
import {AuthGuard} from "../../../../../../ReusableServices/AuthGuard";

export const MpdbReportsRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/ManagedProgramDb/MpdbReports', component: MpdbReports, canActivate:[AuthGuard] }
]);