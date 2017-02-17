import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {AuthGuard} from "../../../../../../ReusableServices/AuthGuard";
import {BmiRiskAnalyticsBenchmarks} from "./riskAnalyticsBenchmarks";

export const BmiRiskAnalyticsBenchmarksRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/BenchMarkIndex/BmiRiskAnalyticsBenchmarks', component: BmiRiskAnalyticsBenchmarks, canActivate:[AuthGuard] }
]);