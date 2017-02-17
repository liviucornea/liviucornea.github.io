import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpAbstract } from './httpAbstract';
import { AppSettingsService } from './appSettingsService';

export class AuthUser {

    CostCentre: string;
    Id: number = 0;
    Login: string;
    Name: string;
    LoginName: string;

    constructor() {
    }
}

@Injectable()
export class ApiService {
    httpAbs: HttpAbstract;
    prefixurl: string = '/auth';
    contentType: string = 'application/json; charset=utf-8';

    base: string = this.appSettingsService.appSettings.apiSettings.apiURL_BASE + '/api/tdam/datahub/ae';
    currentuserbaseurl: string = this.prefixurl + '/currentuser';
    logbaseurl: string = '/log';

    sqlStatementsUrl: string = '/application/sqlstatementdetail';
    CurrentUser: AuthUser;

    constructor(private abstractHttp: HttpAbstract, private appSettingsService: AppSettingsService) {
        this.httpAbs = abstractHttp;
        this.httpAbs.setBaseAddress(this.base);
    }

    setApplicationsBaseUrl() {
        this.httpAbs = this.abstractHttp;
        this.httpAbs.setBaseAddress(this.base);
    }

    getArrayFromQuery(dataKey: string, reportOptions: string = '{}'): Observable<any> {
        return this.httpAbs.fetchWithFilter(this.sqlStatementsUrl + '/' + dataKey
            , reportOptions
            , this.contentType);
    }

    getMultipleArrayFromQuery(dataKeys: Array<any>): Observable<any> {
        dataKeys.forEach(x => {
            x.url = this.sqlStatementsUrl + '/' + x.url;
            x.body = x.body ? x.body : '{}';
        });
        return this.httpAbs.fetchMultiple(dataKeys, this.contentType);
    }

    executeMultipleNonQuery(dataKeys: Array<any>): Observable<any> {
        dataKeys.forEach(x => {
            x.url = this.sqlStatementsUrl + '/executenonquery/' + x.url;
            x.body = x.body ? x.body : '{}';
        });
        return this.httpAbs.fetchMultiple(dataKeys, this.contentType);
    }

    executeNonQuery(dataKey: string, reportOptions: string = '{}'): Observable<any> {
        return this.httpAbs.fetchWithFilter(this.sqlStatementsUrl + '/executenonquery/' + dataKey
            , reportOptions
            , this.contentType);
    }

    getAuthCurrentUser() {
        return this.httpAbs.fetch(this.currentuserbaseurl);
    }

    getAuthCurrentUserRoles() {
        return this.httpAbs.fetch(this.currentuserbaseurl + '/role');
    }

    checkUserAuthorization(routepath: string) {
        return this.httpAbs.fetch(this.currentuserbaseurl + '/checkpermission?route=' + routepath);
    }

    fetchMultipleList(urlList: Array<any>) {
        return this.httpAbs.fetchMultiple(urlList);
    }

    fetchMultipleListWithBody(urldataList: Array<any>) {
        return this.httpAbs.fetchMultiple(urldataList, this.contentType);
    }

    updateBulkRecords(apiParams: string, jsonData: string, headerKey?: string, headers?: string) {
        return this.httpAbs.updateBulkRecords(apiParams, jsonData, headerKey, headers, this.contentType);
    }

    removeBulkRecords(apiParams: string, jsonData: string, headerKey?: string, headers?: string) {
        return this.httpAbs.removeBulkRecords(apiParams, jsonData, headerKey, headers, this.contentType);
    }

    insertBulkRecords(apiParams: string, jsonData: string, headerKey?: string, headers?: string) {
        return this.httpAbs.insertBulkRecords(apiParams, jsonData, headerKey, headers, this.contentType);
    }

    ExecuteUpdate(obj, pagename, primaryKeyColumn = '') {
        switch (pagename.toLowerCase()) {
            default:
                break;
        }
    }

    ExecutePageFilter(pagename, filterObject: string) {
        switch (pagename.toLowerCase()) {
            default:
                break;
        }
    }


    ExecutePageRefresh(pagename, id = null) {
        switch (pagename.toLowerCase()) {
            default:
                break;
        }
    }

    ExecuteDelete(obj, pagename, primaryKeyColumn = '') {
        switch (pagename.toLowerCase()) {
            default:
                break;
        }
    }

    ExecuteInsert(obj, pagename) {
        switch (pagename.toLowerCase()) {
            default:
                break;
        }
    }
}
