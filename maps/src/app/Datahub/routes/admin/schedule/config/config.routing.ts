import {Config} from "./config";
import {RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";

export const ConfigRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Schedule/Config', component: Config, canActivate:[AuthGuard]}
]);
