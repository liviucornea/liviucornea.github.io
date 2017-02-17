import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {MpdbAdministration} from "./administration";
import {AuthGuard} from "../../../../../../ReusableServices/AuthGuard";

export const MpdbAdministrationRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/ManagedProgramDb/MpdbAdministration', component: MpdbAdministration,canActivate:[AuthGuard]}
]);