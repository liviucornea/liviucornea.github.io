import { Injectable } from '@angular/core';
import { AppSettings, AppNotificationsMSG } from '../Configuration/appSettings';

@Injectable()
export class AppSettingsService {
    appSettings: any = AppSettings;
    appNotificationsMsg: any = AppNotificationsMSG;
    t: any;
    constructor() {

    }
};
