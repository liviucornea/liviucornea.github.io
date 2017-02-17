import {RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {Configuration} from "./configuration";
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";

export const ConfigurationRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Schematic/Configuration', component: Configuration, canActivate:[AuthGuard]}
]);
