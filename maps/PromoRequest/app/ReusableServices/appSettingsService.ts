import {Injectable} from 'angular2/core';
import {AppSettings, AppNotificationsMSG} from "./appSettings";


@Injectable()
export class AppSettingsService {
    appSettings:any = AppSettings;
    appNotificationsMsg:any = AppNotificationsMSG;
    t:any;
    constructor() {

    }

};

