import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {AuthGuard} from "../../../../../../ReusableServices/AuthGuard";
import {BmiMsci} from "./msci";

export const BmiMsciRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/BenchMarkIndex/BmiMsci', component: BmiMsci, canActivate:[AuthGuard] }
]);