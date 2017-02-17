import {Component, Injector, Injectable} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS, BrowserXhr} from 'angular2/http'
import {Observable} from 'rxjs/Observable';
import {HttpAbstract} from "../../../ReusableServices/httpAbstract";


@Injectable()
export class SchematicApiService {
    httpAbs: HttpAbstract
    prefixurl: string = '/config';
    contentType: string = 'application/json; charset=utf-8';

    configValueTypeBaseUrl: string = this.prefixurl + '/configvaluetype';
    unitbaseurl: string = this.prefixurl + '/unit';
    unittypebaseurl: string = this.prefixurl + '/unittype';
    configvaluebaseurl: string = this.prefixurl + '/configvalue';
    schematicBaseUrl: string = this.prefixurl + '/schematic';
    schematicViewUrl:string = this.prefixurl+'/schematicconfiguration';
    schematicStepurl: string = this.prefixurl + '/schematicstep';

    constructor(private httpAbstract: HttpAbstract) {
        this.httpAbs = httpAbstract
    }
    //Start: ConfigValueType
    getConfigValueTypes(): Observable<any> {
        return this.httpAbs.fetch(this.configValueTypeBaseUrl);
    }

    getConfigValueTypesById(id: number) {
        return this.httpAbs.fetch(this.configValueTypeBaseUrl + '/' + id);
    }

    getConfigValueTypesByUnitId(id: number) {
        return this.httpAbs.fetch(this.unitbaseurl + '/' + id + '/configValueType');
    }

    createConfigValueType(obj) {
        return this.httpAbs.insertWithHeader(this.configValueTypeBaseUrl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    getallSchematics() {
        return this.httpAbs.fetch(this.schematicBaseUrl);
    }

    createSchematic(obj) {
        return this.httpAbs.insertWithHeader(this.schematicBaseUrl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    updateSchematic(obj, primaryKeyColumn)
    {
        var Id = 0;
        Id = this.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.schematicBaseUrl + '/' + Id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    updateConfigValueType(obj, primaryKeyColumn) {
        var Id = 0;
        Id = this.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.configValueTypeBaseUrl + '/' + Id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    getIdValue(obj, primaryKeyColumn) {
        let Id;
        if (primaryKeyColumn != undefined && primaryKeyColumn != "") {
            for (let i = 0; i < Object.keys(obj).length; i++) {
                if (Object.keys(obj)[i] === primaryKeyColumn || Object.keys(obj)[i] === "Id") {
                    Id = obj[Object.keys(obj)[i]];
                    break;
                }
            }
        }

        return Id;
    }

    deleteConfigValueType(obj) {
        return this.httpAbs.remove(
            this.configValueTypeBaseUrl + '/' + obj.Id
        );
    }
    //End: ConfigValueType

    //ConfigValue
    updateConfigValues(obj, primaryKeyColumn) {
        let Id = 0;
        Id = this.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.configvaluebaseurl + '/' + Id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    createConfigValues(obj) {
        return this.httpAbs.insertWithHeader(this.configvaluebaseurl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    deleteConfigValues(obj, primaryKeyColumn) {
        let Id = 0;
        Id = this.getIdValue(obj, primaryKeyColumn);

        return this.httpAbs.remove(
            this.configvaluebaseurl + '/' + Id
        );
    }


    //Config.Unit

    getConfigUnits(): Observable<any> {
        return this.httpAbs.fetch(this.unitbaseurl);
    }

    getConfigUnitssById(id: number) {
        return this.httpAbs.fetch(this.unitbaseurl + '/' + id);
    }

    getConfigUnitsFiltered(filter: string): Observable<any> {
        return this.httpAbs.fetchWithFilter(this.unitbaseurl + '/paged'
            , filter
            , this.contentType);
    }

    getConfigUnitsByUnitTypeId(id: number) {
        return this.httpAbs.fetch(this.unittypebaseurl + '/' + id + '/unit');
    }

    createConfigUnits(obj) {
        return this.httpAbs.insertWithHeader(this.unitbaseurl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    updateConfigUnits(obj, primaryKeyColumn) {
        let Id = 0;
        Id = this.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.unitbaseurl + '/' + Id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    getSchematicConfiguartionById(id) {
        return this.httpAbs.fetch(this.schematicViewUrl+"?schematicId=" + id);
    }

    fetchMultipleForSchematics() {
        var processTablesArray = new Array<string>();
        processTablesArray.push("/config/schematic");
        processTablesArray.push("/config/unit");
        processTablesArray.push("/config/configvaluetype");
        processTablesArray.push("/config/unitType");
        //processTablesArray.push("/config/SchematicStep");
        return this.httpAbs.fetchMultiple(processTablesArray);
    }

    fetchMultipleForSchematicConfiguration(id)
    {
        var schematicConfigArray = new Array<string>();
        schematicConfigArray.push(this.schematicViewUrl+"?schematicId=" + id);
        schematicConfigArray.push(this.configValueTypeBaseUrl);
        return this.httpAbs.fetchMultiple(schematicConfigArray);
    }

    getSchematicStepsBySchematicId(id)
    {
        var processTablesArray = new Array<string>();
        processTablesArray.push(this.schematicBaseUrl +"/" + id + '/schematicstep');
        processTablesArray.push("/config/getconfigvaluesbyschematicid?SchematicID=" + id);
        return this.httpAbs.fetchMultiple(processTablesArray);
        //return this.httpAbs.fetch(this.schematicBaseUrl +"/" + id + '/schematicstep');
    }

    createSchematicStep(obj)
    {
        return this.httpAbs.insertWithHeader(this.schematicStepurl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    updateSchematicStep(obj, primaryKeyColumn)
    {
        let Id = 0;
        Id = this.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.schematicStepurl + '/' + Id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }


    ExecuteUpdate(obj, pagename, primaryKeyColumn) {
        switch (pagename.toLowerCase()) {
            case "unit_child":
                return this.updateConfigValueType(obj, primaryKeyColumn);
            // break;
            case "unit":
                return this.updateConfigUnits(obj, primaryKeyColumn);
            case "configvalue":
                return this.updateConfigValues(obj, primaryKeyColumn);
        }
    }

    ExecuteInsert(obj, pagename) {
        switch (pagename.toLowerCase()) {
            case "unit_child":
                return this.createConfigValueType(obj);
            case "unit":
                return this.createConfigUnits(obj);
            case "configvalue":
                return this.createConfigValues(obj);
            case "schematic":
                return this.createSchematic(obj);
        }
    }

    ExecuteDelete(obj, pagename) {
        switch (pagename.toLowerCase()) {
            case "unit_child":
                return this.deleteConfigValueType(obj);
        }
    }

    ExecutePageRefersh(pagename, id = null) {
        switch (pagename.toLowerCase()) {
            case "unit_child":
                return this.getConfigValueTypesByUnitId(id);
            case "unit":
                return this.getConfigUnits();
            case "unittype_child":
                return this.getConfigUnitsByUnitTypeId(id);
            //break;
        }
    }

    ExecutePageFilter(pagename, filterObject: string){
        switch(pagename.toLowerCase())
        {
            case "unit":
                return this.getConfigUnitsFiltered(filterObject);
        }
    }

    //End: Config
}