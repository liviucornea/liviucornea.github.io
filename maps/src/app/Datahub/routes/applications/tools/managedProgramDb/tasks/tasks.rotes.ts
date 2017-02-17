import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {MpdbTasks} from "./tasks";
import {AuthGuard} from "../../../../../../ReusableServices/AuthGuard";

export const MpdbTasksRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/ManagedProgramDb/MpdbTasks', component: MpdbTasks, canActivate:[AuthGuard] }
]);