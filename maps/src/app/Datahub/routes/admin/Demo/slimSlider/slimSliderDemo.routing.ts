import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {SlimSliderDemo} from "./SlimSliderDemo";
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";

export const SlimSliderRoute: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Demo/SlimSlider', component: SlimSliderDemo, canActivate:[AuthGuard]}
]);


