import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {stringify} from "querystring";
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class HttpAbstract {
    result: any;
    baseUrl : string;
    contentTypeDefault:string;
    contentTypeJson:string;
    http: Http;
    constructor(http: Http) {
       this.http=http;
        this.contentTypeDefault = 'application/x-www-form-urlencoded';
        this.contentTypeJson = 'application/json';
    }

    //region CRUD return observable

    fetch(apiParams: string):Observable<any> {
        this.result = this.http.get(this.baseUrl + apiParams).map(response => response.json());
        return this.result;
    }

    fetchMultiple(apiParams:Array<string>):Observable<any> {
        var allObservables:Array<Observable<any>> = new Array<Observable<any>>();
        var httpProvider=this.http;
        var root=this.baseUrl;
        apiParams.forEach(function(x){
            allObservables.push(httpProvider.get(root+x).map(response=>response.json()))
        });
        Observable.forkJoin(allObservables);
        this.result = Observable.forkJoin(allObservables);
        return this.result;
    }
    fetchWithHeader(apiParams: string, headerKey: string, headerValue: string, contentType?: string):Observable<any> {
        var headers = this.constructHeaders(headerKey, headerValue, contentType);
        this.result = this.http.get(this.baseUrl + apiParams, { headers: headers }).map(response => response.json());
        return this.result;
    }
    fetchWithFilter(apiParams: string, body: string, contentType?: string): Observable<any> {
        var headers = this.constructHeaders('', '', contentType);
        this.result = this.http.post(this.baseUrl + apiParams, body, { headers: headers }).map(response => response.json());
        return this.result;
    }

    remove(apiParams: string) {
        this.result = this.http.delete(this.baseUrl + apiParams).map(response => response.json());;
        return this.result;
    }

    removeWithHeader(apiParams: string, headerKey: string, headerValue: string, contentType?: string) {
        var headers = this.constructHeaders(headerKey, headerValue, contentType);
        this.result = this.http.delete(this.baseUrl + apiParams, { headers: headers }).map(response => response.json());
        return this.result;
    }


    update(apiParams: string, body: string) {
        this.result = this.http.put(this.baseUrl + apiParams, body).map(response => response.json());;
        return this.result;
    }

    updateWithHeader(apiParams: string, body: string, headerKey: string, headerValue: string, contentType?: string) {
        var headers = this.constructHeaders(headerKey, headerValue, contentType);
        this.result = this.http.put(this.baseUrl + apiParams, body, { headers: headers }).map(response => response.json());
        return this.result;
    }

    insert(apiParams: string, body: string) {
        this.result = this.http.post(this.baseUrl + apiParams, body).map(response => response.json());;
        return this.result;
    }

    insertWithHeader(apiParams: string, body: string, headerKey: string, headerValue: string, contentType?: string) {
        var headers = this.constructHeaders(headerKey, headerValue, contentType);
        this.result = this.http.post(this.baseUrl + apiParams, body ,{ headers: headers }).map(response => response.json());
        return this.result;
    }

    insertJson(apiParams: string, body: string) {
        var headers = this.constructContentType(this.contentTypeJson);
        this.result = this.http.post(this.baseUrl + apiParams, body ,{ headers: headers }).map(response => response.json());
        return this.result;
    }


    //endregion CRUD with observable



    //region helper functions

    setBaseAddress(url:string){
        this.baseUrl=url;
    }

    constructContentType(contentType?: string) {
        var headers = new Headers();
        if (contentType) {
            headers.append('Content-Type', contentType);
        }
        return headers;
    }

    constructHeaders(headerKey: string, headerValue: string, contentType?: string) {
        var headers = new Headers();
        if (contentType) {
            headers.append('Content-Type', contentType);
        }
        else {
            headers.append('Content-Type', this.contentTypeDefault);
        }
        if (headerKey) {
            if (headerValue) {
                headers.append(headerKey, headerValue)
            }
        }
        return headers;
    }

    //endregion helper functions
}
