import {Injectable, Input} from "angular2/core";
import {Observable} from "rxjs/Rx";
import {AppSettingsService} from "../../../../ReusableServices/appSettingsService";
import {HttpAbstract} from "../../../../ReusableServices/httpAbstract";


@Injectable()
export class ToolsApiService {
    httpAbs:HttpAbstract;
    prefixUrl:string = '/reports';
    contentType:string = 'application/json; charset=utf-8';
    filterObject: string = "";
    base: string = this.appSettingsService.appSettings.apiSettings.apiURL_BASE + '/api/centraldb/ae';

    constructor(private abstractHttp:HttpAbstract, private appSettingsService: AppSettingsService) {
        this.httpAbs = abstractHttp;
        this.httpAbs.setBaseAddress(this.base);
    }

    FilterObject(obj: string) {
        this.filterObject = obj;
    }

    ExecutePageRefersh(pageName)
    {
        switch(pageName)
        {
            case "BenchMarkIndex":
                return this.getBenchMarkIndexFiltered(this.filterObject);
        }
    }

    //Start: BenchMarkIndex
    getBenchMarkIndexFiltered(filter: string): Observable<any> {
        return this.httpAbs.fetchWithFilter(this.prefixUrl + '/GetArrayFromQuery'
            , filter
            , this.contentType);
    }

    // End: BenchMarkIndex
}

