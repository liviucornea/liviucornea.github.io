import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import { Settings} from "./settings";
import {AuthGuard} from "../../../../ReusableServices/AuthGuard";

export const SettingRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Settings', component: Settings, canActivate:[AuthGuard]}
]);

