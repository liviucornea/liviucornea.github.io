import {Component, Injector, Injectable} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS, BrowserXhr} from 'angular2/http'
import {Observable} from 'rxjs/Observable';
import {HttpAbstract} from "../../../ReusableServices/httpAbstract";


@Injectable()
export class SchedulesApiService {
    httpAbs: HttpAbstract
    prefixurl: string = '/schedules';
    contentType: string = 'application/json; charset=utf-8';

    HolidayCodeBaseUrl: string = this.prefixurl + '/holidayssetcode';
    HolidayBaseUrl: string = this.prefixurl + '/holiday';
    ConfigBaseUrl: string = this.prefixurl + '/config';

    constructor(private httpAbstract:HttpAbstract) {
        this.httpAbs=httpAbstract
    }
    //Start: HolidaySetCode
    getHolidaySetCodes(): Observable<any> {
        return this.httpAbs.fetch(this.HolidayCodeBaseUrl);
    }

    getHolidaySetCodesById(id: number) {
        return this.httpAbs.fetch(this.HolidayCodeBaseUrl + '/' + id);
    }

    getHolidaySetCodesFiltered(filter: string): Observable<any> {
        return this.httpAbs.fetchWithFilter(this.HolidayCodeBaseUrl + '/paged'
            , filter
            , this.contentType);
    }

    createHolidaySetCode(obj) {
        return this.httpAbs.insertWithHeader(this.HolidayCodeBaseUrl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }
    updateHolidaySetCode(obj) {
        return this.httpAbs.updateWithHeader(this.HolidayCodeBaseUrl + '/' + obj.Id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    deleteHolidaySetCode(obj) {
        return this.httpAbs.remove(
            this.HolidayCodeBaseUrl + '/' + obj.Id
        );
    }
    //End: HolidaySetCode

    //Start:Holiday
    getHolidays(): Observable<any> {
        return this.httpAbs.fetch(this.HolidayBaseUrl);
    }

    getHolidaysById(id: number) {
        return this.httpAbs.fetch(this.HolidayBaseUrl + '/' + id);
    }

    getHolidaysFiltered(filter: string): Observable<any> {
        return this.httpAbs.fetchWithFilter(this.HolidayBaseUrl + '/paged'
            , filter
            , this.contentType);
    }

    createHoliday(obj) {
        return this.httpAbs.insertWithHeader(this.HolidayBaseUrl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    updateHoliday(obj) {
        return this.httpAbs.updateWithHeader(this.HolidayBaseUrl + '/' + obj.Id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }
    deleteHoliday(obj) {
        return this.httpAbs.remove(
            this.HolidayBaseUrl + '/' + obj.Id
        );
    }
    //End:Holiday

    //Start:Config
    getConfigs(): Observable<any> {
        return this.httpAbs.fetch(this.ConfigBaseUrl);
    }

    getConfigsById(id: number) {
        return this.httpAbs.fetch(this.ConfigBaseUrl + '/' + id);
    }

    getConfigsFiltered(filter: string): Observable<any> {
        return this.httpAbs.fetchWithFilter(this.ConfigBaseUrl + '/paged'
            , filter
            , this.contentType);
    }

    createConfig(obj) {
        return this.httpAbs.insertWithHeader(this.ConfigBaseUrl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    updateConfig(obj) {
        return this.httpAbs.updateWithHeader(this.ConfigBaseUrl + '/' + obj.Id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }
    deleteConfig(obj) {
        return this.httpAbs.remove(
            this.HolidayBaseUrl + '/' + obj.Id
        );
    }

    ExecuteUpdate(obj, pagename)
    {
        switch(pagename.toLowerCase())
        {
            case "holidaysetcode":
                return this.updateHolidaySetCode(obj);
                // break;
            case "holiday":
                return this.updateHoliday(obj);
                //break;
            case "config":
                return this.updateConfig(obj);
               // break;
        }
    }

    ExecuteInsert(obj, pagename)
    {
        switch(pagename.toLowerCase())
        {
            case "holidaysetcode":
                return this.createHolidaySetCode(obj);
            // break;
            case "holiday":
                return this.createHoliday(obj);
            //break;
            case "config":
                return this.createConfig(obj);
            // break;
        }
    }

    ExecuteDelete(obj, pagename)
    {
        switch(pagename.toLowerCase())
        {
            case "holidaysetcode":
                return this.deleteHolidaySetCode(obj);
            // break;
            case "holiday":
                return this.deleteHoliday(obj);
            //break;
            case "config":
                return this.deleteConfig(obj);
            // break;
        }
    }

    ExecutePageRefersh( pagename)
    {
        switch(pagename.toLowerCase())
        {
            case "holidaysetcode":
                return this.getHolidaySetCodes();
               // break;
            case "holiday":
                return this.getHolidays();
                //break;
            case "config":
                return this.getConfigs();
               // break;
        }
    }

    ExecutePageFilter(pagename, filterObject: string){
        switch(pagename.toLowerCase())
        {
            case "holidaysetcode":
                return this.getHolidaySetCodesFiltered(filterObject);
            // break;
            case "holiday":
                return this.getHolidaysFiltered(filterObject);
            //break;
            case "config":
                return this.getConfigsFiltered(filterObject);
            // break;
        }
    }
    //End: Config
}