import {Component, Injector, Injectable} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS, BrowserXhr} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class api {
    http: Http;

    //base: string = 'http://wmaadvcp01pfo.tdbfg.com/api';
    base: string = 'http://localhost:17752';

    constructor(private h: Http) {
        this.http = h;
    }

    getAllSchematics() {
        return this.http.get(this.base + '/api/tdam/datahub/ae/config/schematic');
    }

    getSchematic(schematicID: string) {
        //return this.http.get(this.base + '/api/tdam/datahub/ae/config/schematic/' + schematicID + '/configvalue');
        return this.http.get(this.base + '/api/tdam/datahub/ae/config/schematicconfiguration?schematicid=' + schematicID);
    }

    executeSchematic(selectedID: string) {
        console.log("Getting details of schematic id " + selectedID);
    }
}

