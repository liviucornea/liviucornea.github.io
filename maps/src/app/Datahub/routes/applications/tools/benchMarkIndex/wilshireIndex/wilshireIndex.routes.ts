import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {AuthGuard} from "../../../../../../ReusableServices/AuthGuard";
import {BmiWilshireIndex} from "./wilshireIndex";

export const BmiWilshireIndexRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/BenchMarkIndex/BmiWilshireIndex', component: BmiWilshireIndex, canActivate:[AuthGuard] }
]);