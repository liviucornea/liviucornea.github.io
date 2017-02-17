import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {Demo} from "./Demo";
import {AuthGuard} from "../../../../ReusableServices/AuthGuard";

export const DemoRoute: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Demo', component: Demo, canActivate:[AuthGuard]}
]);


