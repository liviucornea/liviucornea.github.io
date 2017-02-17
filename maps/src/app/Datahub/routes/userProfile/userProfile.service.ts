/**
 * Created by vikhnv2 on 12/5/2016.
 */
import {Injectable} from '@angular/core';
import {HttpAbstract} from '../../../ReusableServices/httpAbstract';
import {ComponentSettings} from './userProfile.config';

@Injectable()
export class UserProfileService {
    private baseUrl: string = ComponentSettings.Api.BaseUrl;

    constructor(private httpBase: HttpAbstract) {
        //
    }

    getAuthUserProfile() {
        this.httpBase.setBaseAddress(this.baseUrl);
        return this.httpBase.fetch('profile');
    }
}