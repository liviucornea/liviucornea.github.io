
import {RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {SchematicDesigner} from "./schematicDesigner";
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";

export const SchematicDesignerRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Schematic/SchematicDesigner', component: SchematicDesigner, canActivate:[AuthGuard]},
    { path: 'Datahub/Admin/Schematic/SchematicDesigner/:id', component: SchematicDesigner, canActivate:[AuthGuard]}
]);
