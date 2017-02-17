import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { AppSettingsService } from './appSettingsService';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HttpAbstract {
    result: any;
    baseUrl: string = this.appSettingsService.appSettings.apiSettings.apiURL_BASE + '/api/tdam/datahub/ae';
    contentTypeDefault: string;
    contentTypeJson: string;
    http: Http;

    constructor(http: Http, private appSettingsService: AppSettingsService) {
        this.http = http;
        this.contentTypeDefault = 'application/x-www-form-urlencoded';
        this.contentTypeJson = 'application/json';
    }

    // region CRUD return observable

    fetch(apiParams: string): Observable<any> {
        let test = this.baseUrl + apiParams;
        this.result = this.http.get(test).map(response => response.json());
        return this.result;
    }

    fetchMultiple(apiParams: Array<any>, contentType?: string): Observable<any> {
        let allObservables: Array<Observable<any>> = new Array<Observable<any>>();
        let httpProvider = this.http;
        let root = this.baseUrl;
        let headers = this.constructHeaders('', '', contentType);
        apiParams.forEach(function (x) {
            if (x.body) {
                allObservables.push(httpProvider.post(root + x.url, x.body, { headers: headers }).map(response => response.json()));
            }
            else if (x.url) {
                allObservables.push(httpProvider.get(root + x.url).map(response => response.json()));
            }
            else {
                allObservables.push(httpProvider.get(root + x).map(response => response.json()));
            }
        });
        Observable.forkJoin(allObservables);
        this.result = Observable.forkJoin(allObservables);
        return this.result;
    }

    fetchWithHeader(apiParams: string, headerKey: string, headerValue: string, contentType?: string): Observable<any> {
        let headers = this.constructHeaders(headerKey, headerValue, contentType);
        this.result = this.http.get(this.baseUrl + apiParams, { headers: headers }).map(response => response.json());
        return this.result;
    }
    fetchWithFilter(apiParams: string, body: string, contentType?: string): Observable<any> {
        let headers = this.constructHeaders('', '', contentType);
        this.result = this.http.post(this.baseUrl + apiParams, body, { headers: headers }).map(response => response.json());
        return this.result;
    }

    remove(apiParams: string) {
        this.result = this.http.delete(this.baseUrl + apiParams).map(response => response.json());
        return this.result;
    }

    removeWithHeader(apiParams: string, headerKey: string, headerValue: string, contentType?: string) {
        let headers = this.constructHeaders(headerKey, headerValue, contentType);
        this.result = this.http.delete(this.baseUrl + apiParams, { headers: headers }).map(response => response.json());
        return this.result;
    }

    removeMultiple(apiParams: Array<any>, contentType?: string) {
        let allObservables: Array<Observable<any>> = new Array<Observable<any>>();

        apiParams.forEach(x => {
            let headers = this.constructHeaders(x.headerKey, x.headerValue, contentType);
            allObservables.push(this.http.delete(this.baseUrl + x.url, { headers: headers, body: x.headerKey }).map(response => response.json()));
        });

        Observable.forkJoin(allObservables);
        this.result = Observable.forkJoin(allObservables);

        return this.result;
    }

    removeBulkRecords(apiParams: string, body: string, headerKey: string, headerValue: string, contentType?: string) {
        let headers = this.constructHeaders(headerKey, headerValue, contentType);
        this.result = this.http.delete(this.baseUrl + apiParams, { headers: headers, body: body }).map(response => response.json());
        return this.result;
    }

    update(apiParams: string, body: string) {
        this.result = this.http.put(this.baseUrl + apiParams, body).map(response => response.json());
        return this.result;
    }

    updateBulkRecords(apiParams: string, body: string, headerKey: string, headerValue: string, contentType?: string) {
        let headers = this.constructHeaders(headerKey, headerValue, contentType);
        this.result = this.http.put(this.baseUrl + apiParams, body, { headers: headers }).map(response => response.json());
        return this.result;
    }

    updateWithHeader(apiParams: string, body: string, headerKey: string, headerValue: string, contentType?: string) {
        let headers = this.constructHeaders(headerKey, headerValue, contentType);
        this.result = this.http.put(this.baseUrl + apiParams, body, { headers: headers }).map(response => response.json());
        return this.result;
    }

    insert(apiParams: string, body: string) {
        this.result = this.http.post(this.baseUrl + apiParams, body).map(response => response.json());
        return this.result;
    }

    insertWithHeader(apiParams: string, body: string, headerKey: string, headerValue: string, contentType?: string) {
        let headers = this.constructHeaders(headerKey, headerValue, contentType);
        this.result = this.http.post(this.baseUrl + apiParams, body, { headers: headers }).map(response => response.json());
        return this.result;
    }

    insertBulkRecords(apiParams: string, body: string, headerKey: string, headerValue: string, contentType?: string) {
        let headers = this.constructHeaders(headerKey, headerValue, contentType);
        this.result = this.http.post(this.baseUrl + apiParams, body, { headers: headers }).map(response => response.json());
        return this.result;
    }

    insertJson(apiParams: string, body: string) {
        let headers = this.constructContentType(this.contentTypeJson);
        this.result = this.http.post(this.baseUrl + apiParams, body, { headers: headers }).map(response => response.json());
        return this.result;
    }


    // endregion CRUD with observable

    // region helper functions

    setBaseAddress(url: string) {
        this.baseUrl = url;
    }

    constructContentType(contentType?: string) {
        let headers = new Headers();
        if (contentType) {
            headers.append('Content-Type', contentType);
        }
        return headers;
    }

    constructHeaders(headerKey: string, headerValue: string, contentType?: string) {
        let headers = new Headers();
        if (contentType) {
            headers.append('Content-Type', contentType);
        }
        else {
            headers.append('Content-Type', this.contentTypeDefault);
        }
        if (headerKey) {
            if (headerValue) {
                headers.append(headerKey, headerValue);
            }
        }
        return headers;
    }

    // endregion helper functions
}
