import { Injectable } from '@angular/core';
import { HttpAbstract } from './httpAbstract';
import { AppSettingsService } from './appSettingsService';

@Injectable()
export class ImportExportService {
    httpAbs: HttpAbstract;

    contentType: string = 'application/json; charset=utf-8';

    base: string = this.appSettingsService.appSettings.apiSettings.apiURL_BASE + '/api/tdam/datahub/ae';
    importTextFileUrl: string = '/import/textfile';

    constructor(private abstractHttp: HttpAbstract, private appSettingsService: AppSettingsService) {
        this.httpAbs = abstractHttp;
        this.httpAbs.setBaseAddress(this.base);
    }

    setApplicationsBaseUrl() {
        this.httpAbs = this.abstractHttp;
        this.httpAbs.setBaseAddress(this.base);
    }

    importTextFile(dataKey: string, id: number) {
        return this.httpAbs.fetchWithFilter(
            this.importTextFileUrl + '/' + dataKey + '/' + id,
            '',
            this.contentType);
    }
}
