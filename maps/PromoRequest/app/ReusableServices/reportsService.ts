import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {HttpAbstract} from "./httpAbstract";
import {AppSettingsService} from "./appSettingsService";

@Injectable()
export class ReportsApiService {
    httpAbs:HttpAbstract;
    prefixUrl:string = '/reports';
    contentType:string = 'application/json; charset=utf-8';

    base: string = this.appSettingsService.appSettings.apiSettings.apiURL_BASE + '/api/centraldb/ae';

    constructor(private abstractHttp:HttpAbstract, private appSettingsService: AppSettingsService) {
        this.httpAbs = abstractHttp;
        this.httpAbs.setBaseAddress(this.base);
    }

    getArrayFromQuery(reportOptions: string): Observable<any> {

       return this.httpAbs.fetchWithFilter(this.prefixUrl + '/GetArrayFromQuery'
            , reportOptions
            , this.contentType);
   }
}

