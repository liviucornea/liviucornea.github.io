import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {ConfigBuilder} from "./configBuilder";
import {AuthGuard} from "../../../../ReusableServices/AuthGuard";


export const ConfigBuilderRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/configBuilder', component: ConfigBuilder, canActivate:[AuthGuard]}
]);


