
import {RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {HolidaySetCode} from "./holidaySetCode";
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";

export const HolidaySetCodeRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Schedule/HolidaySetCode', component: HolidaySetCode, canActivate:[AuthGuard]}
]);
