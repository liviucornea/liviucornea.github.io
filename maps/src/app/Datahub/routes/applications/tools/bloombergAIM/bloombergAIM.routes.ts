import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {BloombergAIM} from "./bloombergAIM";
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";


export const BloombergAIMRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/BloombergAIM', component: BloombergAIM, canActivate:[AuthGuard]}
]);

