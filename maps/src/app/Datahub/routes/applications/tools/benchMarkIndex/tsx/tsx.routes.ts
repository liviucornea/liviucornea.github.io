import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {AuthGuard} from "../../../../../../ReusableServices/AuthGuard";
import {BmiTsx} from "./tsx";

export const BmiTsxRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/BenchMarkIndex/BmiTsx', component: BmiTsx, canActivate:[AuthGuard] }
]);