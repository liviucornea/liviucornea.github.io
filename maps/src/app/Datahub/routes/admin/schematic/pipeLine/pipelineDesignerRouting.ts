import {RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {PipeLineDesigner} from "./pipeLineDesigner";
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";
export const PipelineDesignerRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Schematic/Pipeline', component: PipeLineDesigner, canActivate:[AuthGuard]}
]);
