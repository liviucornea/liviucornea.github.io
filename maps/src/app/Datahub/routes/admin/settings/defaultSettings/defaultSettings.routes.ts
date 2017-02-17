import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultSettings } from "./defaultSettings";
import { AuthGuard } from "../../../../../ReusableServices/AuthGuard";

export const DefaultSettingsRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Settings/DefaultSettings', component: DefaultSettings, canActivate: [AuthGuard] }
]);


