
import {RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {SchematicExecution} from "./schematicExecution";
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";

export const SchematicExecutionRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Schematic/SchematicExecution', component: SchematicExecution, canActivate:[AuthGuard]}
]);