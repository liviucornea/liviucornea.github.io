import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {AuthGuard} from "../../../../../../ReusableServices/AuthGuard";
import {BmiBMONesbittBurnsIndex} from "./bmoNesbittBurnsIndex";

export const BmiBMONesbittBurnsIndexRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/Tools/BenchMarkIndex/BmiBMONesbittBurnsIndex', component: BmiBMONesbittBurnsIndex, canActivate:[AuthGuard] }
]);