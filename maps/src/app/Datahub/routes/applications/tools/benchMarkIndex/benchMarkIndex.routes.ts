import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";
import {BenchMarkIndex} from "./benchMarkIndex";

export const BenchMarkIndexRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/BenchMarkIndex', component: BenchMarkIndex, canActivate:[AuthGuard]}
]);

