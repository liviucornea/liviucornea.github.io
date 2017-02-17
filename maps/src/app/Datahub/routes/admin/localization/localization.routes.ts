import {RouterModule} from '@angular/router';
import {Localization} from "./localization";
import {ModuleWithProviders} from "@angular/core";
import {AuthGuard} from "../../../../ReusableServices/AuthGuard";

export const LocalizationRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Localization', component: Localization, canActivate:[AuthGuard]}
]);