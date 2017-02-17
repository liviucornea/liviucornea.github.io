import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {MpdbAnalysisConstructionTool} from "./analysisConstructionTool";
import {AuthGuard} from "../../../../../../ReusableServices/AuthGuard";

export const MpdbAnalysisConstructionToolRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/ManagedProgramDb/MpdbAnalysisConstructionTool', component: MpdbAnalysisConstructionTool, canActivate:[AuthGuard] }
]);