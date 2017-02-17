import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {ApplicationBuilder} from "./applicationBuilder";
import {AuthGuard} from "../../../../ReusableServices/AuthGuard";

export const ApplicationBuilderRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/ApplicationBuilder', component: ApplicationBuilder, canActivate:[AuthGuard]}
]);


