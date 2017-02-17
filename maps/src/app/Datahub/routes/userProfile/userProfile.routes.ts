/**
 * Created by vikhnv2 on 11/30/2016.
 */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {UserProfile} from './userProfile.component';
import {AuthGuard} from '../../../ReusableServices/AuthGuard';

export const UserProfileRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/UserProfile', component: UserProfile, canActivate:[AuthGuard]}
]);