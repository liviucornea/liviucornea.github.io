import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {AuthGuard} from "../../../../../../ReusableServices/AuthGuard";
import {BmiWorldGovernmentBondIndex} from "./worldGovernmentBondIndex";

export const BmiWorldGovernmentBondIndexRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/BenchMarkIndex/BmiWorldGovernmentBondIndex', component: BmiWorldGovernmentBondIndex, canActivate:[AuthGuard] }
]);