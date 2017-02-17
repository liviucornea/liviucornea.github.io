

import {RouteInfo, MenuType} from "../../../../app.router.metadata";
import {Configuration} from "./configuration/configuration";
import {Routes, RouterModule} from "@angular/router";
import {SchematicDesigner} from "./designer/schematicDesigner";
import {SchematicExecution} from "./Execution/schematicExecution";
import {Schematic} from "./schematic";
import {ModuleWithProviders} from "@angular/core";
import {AuthGuard} from "../../../../ReusableServices/AuthGuard";



export const SchematicRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Schematic', component: Schematic, canActivate: [AuthGuard]}
]);