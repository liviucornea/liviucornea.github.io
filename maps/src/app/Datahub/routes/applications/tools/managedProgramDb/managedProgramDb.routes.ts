import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {ManagedProgramDb} from "./managedProgramDb";
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";

export const ManagedProgramDbRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/ManagedProgramDb', component: ManagedProgramDb, canActivate:[AuthGuard]}
]);

