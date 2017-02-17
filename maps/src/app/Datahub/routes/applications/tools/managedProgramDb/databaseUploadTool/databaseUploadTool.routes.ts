import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {MpdbDatabaseUploadTool} from "./databaseUploadTool";
import {AuthGuard} from "../../../../../../ReusableServices/AuthGuard";

export const MpdbDatabaseUploadToolRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/ManagedProgramDb/MpdbDatabaseUploadTool', component: MpdbDatabaseUploadTool, canActivate:[AuthGuard] }
]);