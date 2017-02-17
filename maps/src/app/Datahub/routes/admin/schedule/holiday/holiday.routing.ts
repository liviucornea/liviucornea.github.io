
import {RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {Holiday} from "./holiday";
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";

export const HolidayRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Schedule/Holiday', component: Holiday, canActivate:[AuthGuard]}
]);
