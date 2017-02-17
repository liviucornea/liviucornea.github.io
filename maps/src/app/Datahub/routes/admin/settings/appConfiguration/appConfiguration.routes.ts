import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {AppConfiguration} from "./appConfiguration";
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";

export const AppConfigurationRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Settings/AppConfiguration', component: AppConfiguration, canActivate:[AuthGuard]}
]);


