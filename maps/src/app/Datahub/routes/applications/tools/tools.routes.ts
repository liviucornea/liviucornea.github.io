import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {Tools} from "./tools";
import {AuthGuard} from "../../../../ReusableServices/AuthGuard";

export const ToolsRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/Tools', component: Tools, canActivate:[AuthGuard]}
]);


