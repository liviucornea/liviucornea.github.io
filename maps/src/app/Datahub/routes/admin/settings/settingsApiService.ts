import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApiService} from "../../../../ReusableServices/apiService";
import {HttpAbstract} from "../../../../ReusableServices/httpAbstract";
import {getIdValue} from "../../../../ReusableServices/genericfunctions";

@Injectable()
export class SettingsApiService {

    settingsPrefixUrl: string = '/settings';
    applicationPrefixUrl: string = '/application';
    contentType: string = 'application/json; charset=utf-8';

    keyringUrl: string = this.settingsPrefixUrl + '/keyring';
    connectionStringUrl: string = this.applicationPrefixUrl + '/connectionstring';

    sectionUrl: string = this.settingsPrefixUrl + '/section';
    sectionValueUrl: string = this.settingsPrefixUrl + '/sectionvalue';

    appConfigurationUrl: string = this.applicationPrefixUrl + '/configuration';
    sqlStatementsUrl: string = this.applicationPrefixUrl + '/sqlstatement';


    constructor(private httpAbs: HttpAbstract, private apiService: ApiService) {
        this.httpAbs.setBaseAddress(this.apiService.base);
    }

    // ---------------------- Methods for Encryption Keyrings
    getKeyrings(id = null) {
        if (id) {
            return this.httpAbs.fetch(this.keyringUrl + '/' + id);
        } else {
            return this.httpAbs.fetch(this.keyringUrl);
        }
    }
    createKeyring(obj) {
        return this.httpAbs.insertWithHeader(this.keyringUrl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    updateKeyring(obj, primaryKeyColumn) {
        var id = getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.keyringUrl + '/' + id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }
    deleteKeyring(obj, primaryKeyColumn) {
        var id = getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.remove(
            this.keyringUrl + '/' + id
        );
    }
    //----------------------------------------------------------------------------

    // ---------------------- Methods for ConnectionStrings
    getConnectionStrings(id = null) {
        if (id) {
            return this.httpAbs.fetch(this.connectionStringUrl + '/' + id);
        } else {
            return this.httpAbs.fetch(this.connectionStringUrl);
        }
    }
    createConnectionString(obj) {
        return this.httpAbs.insertWithHeader(this.connectionStringUrl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    updateConnectionString(obj, primaryKeyColumn) {
        var id = getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.connectionStringUrl + '/' + id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }
    deleteConnectionString(obj, primaryKeyColumn) {
        var id = getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.remove(
            this.connectionStringUrl + '/' + id
        );
    }
    //----------------------------------------------------------------------------
    
    // ---------------------- Methods for DefaultSettings
    getDefaultSettings(id = null) {
        if (id) {
            return this.httpAbs.fetch(this.sectionUrl + '/' + id);
        } else {
            return this.httpAbs.fetch(this.sectionUrl);
        }
    }
    createDefaultSettings(obj) {
        return this.httpAbs.insertWithHeader(this.sectionUrl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }
    updateDefaultSettings(obj, primaryKeyColumn) {
        var id = getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.sectionUrl + '/' + id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }
    deleteDefaultSettings(obj, primaryKeyColumn) {
        var id = getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.remove(
            this.sectionUrl + '/' + id
        );
    }
    getDefaultSettingsValues(id) {
        return this.httpAbs.fetch(this.sectionUrl + '/' + id + '/sectionvalue');
    }
    createDefaultSettingsValues(obj) {
        return this.httpAbs.insertWithHeader(this.sectionValueUrl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }
    updateDefaultSettingsValues(obj, primaryKeyColumn) {
        var id = getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.sectionValueUrl + '/' + id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }
    deleteDefaultSettingsValues(obj, primaryKeyColumn) {
        var id = getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.remove(
            this.sectionValueUrl + '/' + id
            );
    }
    //----------------------------------------------------------------------------

    // ---------------------- Methods for Application Configuration
    getAppConfiguration(id = null) {
        if (id) {
            return this.httpAbs.fetch(this.appConfigurationUrl + '/' + id);
        } else {
            return this.httpAbs.fetch(this.appConfigurationUrl);
        }
    }
    createAppConfiguration(obj) {
        return this.httpAbs.insertWithHeader(this.appConfigurationUrl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }
    updateAppConfiguration(obj, primaryKeyColumn) {
        var id = getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.appConfigurationUrl + '/' + id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }
    deleteAppConfiguration(obj, primaryKeyColumn) {
        var id = getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.remove(
            this.appConfigurationUrl + '/' + id
        );
    }
    //----------------------------------------------------------------------------
        
    // ---------------------- Methods for SQL Statements
    getSqlStatement(id = null) {
        if (id) {
            return this.httpAbs.fetch(this.sqlStatementsUrl + '/' + id);
        } else {
            return this.httpAbs.fetch(this.sqlStatementsUrl);
        }
    }
    createSqlStatement(obj) {
        return this.httpAbs.insertWithHeader(this.sqlStatementsUrl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }
    updateSqlStatement(obj, primaryKeyColumn) {
        var id = getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.sqlStatementsUrl + '/' + id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }
    deleteSqlStatement(obj, primaryKeyColumn) {
        var id = getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.remove(
            this.sqlStatementsUrl + '/' + id
        );
    }
    //----------------------------------------------------------------------------

    // --------------- Common methods that must be declared because this service is passed into
    //dataGrid, TabBuilder, or Formbuilder controls-------------------------------
    ExecuteUpdate(obj, pagename, primaryKeyColumn = "") {
        switch (pagename.toLowerCase()) {
            case "keyring":
                return this.updateKeyring(obj, primaryKeyColumn);
            case "connectionstring":
                return this.updateConnectionString(obj, primaryKeyColumn);
            case "defaultsettings":
                return this.updateDefaultSettings(obj, primaryKeyColumn);
            case "defaultsettings_child":
                return this.updateDefaultSettingsValues(obj, primaryKeyColumn);
            case "configuration":
                return this.updateAppConfiguration(obj, primaryKeyColumn);
            case "sqlstatement":
                return this.updateSqlStatement(obj, primaryKeyColumn);
        }
    }

    ExecutePageFilter(pagename, filterObject: string) {
        switch (pagename.toLowerCase()) {
            case "keyring":
                return this.getKeyrings(null);
            case "connectionstring":
                return this.getConnectionStrings(null);
            case "configuration":
                return this.getAppConfiguration(null);
            case "sqlstatement":
                return this.getSqlStatement(null);
        }
    }


    ExecutePageRefresh(pagename, id = null) {
        switch (pagename.toLowerCase()) {
            case "keyring":
                return this.getKeyrings();
            case "keyring_child":
                return this.getKeyrings(id);
            case "connectionstring":
                return this.getConnectionStrings();
            case "connectionstring_child":
                return this.getConnectionStrings(id);
            case "defaultsettings":
                return this.getDefaultSettings();
            case "defaultsettings_child":
                return this.getDefaultSettingsValues(id);
            case "configuration":
                return this.getAppConfiguration();
            case "configuration_child":
                return this.getAppConfiguration(id);
            case "sqlstatement":
                return this.getSqlStatement();
            case "sqlstatement_child":
                return this.getSqlStatement(id);
        }
    }

    ExecuteDelete(obj, pagename, primaryKeyColumn ="") {
        switch (pagename.toLowerCase()) {
            case "keyring":
                return this.deleteKeyring(obj, primaryKeyColumn);
            case "connectionstring":
                return this.deleteConnectionString(obj, primaryKeyColumn);
            case "defaultsettings":
                return this.deleteDefaultSettings(obj, primaryKeyColumn);
            case "defaultsettings_child":
                return this.deleteDefaultSettingsValues(obj, primaryKeyColumn);
            case "configuration":
                return this.deleteAppConfiguration(obj, primaryKeyColumn);
            case "sqlstatement":
                return this.deleteSqlStatement(obj, primaryKeyColumn);
        }
    }

    ExecuteInsert(obj, pagename) {
        switch (pagename.toLowerCase()) {
            case "keyring":
                return this.createKeyring(obj);
            case "connectionstring":
                return this.createConnectionString(obj);
            case "defaultsettings":
                return this.createDefaultSettings(obj);
            case "defaultsettings_child":
                return this.createDefaultSettingsValues(obj);
            case "configuration":
                return this.createAppConfiguration(obj);
            case "sqlstatement":
                return this.createSqlStatement(obj);
        }
    }
    //----------------------------------------------------------------------------

}
