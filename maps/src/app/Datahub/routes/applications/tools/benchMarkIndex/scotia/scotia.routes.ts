import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {AuthGuard} from "../../../../../../ReusableServices/AuthGuard";
import {BmiScotia} from "./scotia";

export const BmiScotiaRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/BenchMarkIndex/BmiScotia', component: BmiScotia, canActivate:[AuthGuard] }
]);