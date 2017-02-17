import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {ApplicationTreeView} from "./applicationTreeView";
import {AuthGuard} from "../../../../ReusableServices/AuthGuard";

export const ApplicationTreeViewRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/ApplicationTreeView', component: ApplicationTreeView, canActivate:[AuthGuard]}
]);


