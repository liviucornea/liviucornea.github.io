import {RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {Language} from "./language";
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";

export const LanguageRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Localization/Language', component: Language, canActivate:[AuthGuard]}
]);
