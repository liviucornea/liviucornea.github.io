import {RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {ValueSet} from "./valueSet";
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";

export const ValueSetRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Localization/ValueSet', component: ValueSet, canActivate:[AuthGuard]}
]);
