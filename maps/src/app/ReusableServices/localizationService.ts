import { Injectable, EventEmitter } from '@angular/core';
import { HttpAbstract } from './httpAbstract';
import { AlertService } from './alertService';
import { ApiService } from './apiService';

export class SelectedLanguage {
    Id: number;
    Description: string;
    LangCode: string;

    constructor(id: number, desc: string, code: string) {
        this.Id = id;
        this.Description = desc;
        this.LangCode = code;
    }
}

@Injectable()
export class LocalizationService {

    contentType: string = 'application/json; charset=utf-8';
    selectedLanguage: SelectedLanguage;

    languageList: Array<any> = [];
    localizationResourcesList: Array<any> = [];

    localizationEventEmitter: EventEmitter<any>;
    prefixUrl: string = '/localization';
    localizationLanguageUrl: string = this.prefixUrl + '/language';
    localizationLanguageValueUrl: string = this.prefixUrl + '/languagevalue';
    localizationValueSetUrl: string = this.prefixUrl + '/valueset';
    localizationValueUrl: string = this.prefixUrl + '/value';

    constructor(private httpAbstract: HttpAbstract, private apiService: ApiService, private alert: AlertService) {
        this.localizationEventEmitter = new EventEmitter();

        this.setDefaultLanguge();
    }

    setDefaultLanguge() {
        this.getLocalizationLanguagesList().subscribe(
            res => {
                this.languageList = res;
                if (this.languageList.length > 0) {
                    let selectedLang = this.languageList.find(p => p.LangCode.toLowerCase().substring(0, 2) === 'en');
                    if (selectedLang) {
                        this.selectedLanguage = selectedLang;
                    }
                }
            },
            error => {
                this.alert.error('Error in retrieving Localization info' + error.status);
            }
            , () => { }
        );
    }


    setLanguageFromAuthGuard(res) {
        this.languageList = res;
        if (this.languageList.length > 0) {
            let selectedLang = this.languageList.find(p => p.LangCode.toLowerCase().substring(0, 2) === 'en');
            if (selectedLang) {
                this.selectedLanguage = selectedLang;
            }
        }
    }

    setResourcesByLangIdFromAuthGuard(res) {
        this.localizationResourcesList = res;
    }

    getLocalizationLanguagesList() {
        return this.httpAbstract.fetch(this.localizationLanguageUrl);
    }

    getResourcesByLanguageId() {
        let tempBaseUrl = this.httpAbstract.baseUrl;
        if (tempBaseUrl !== this.apiService.base) {
            this.httpAbstract.setBaseAddress(this.apiService.base);
        }

        this.httpAbstract.fetch(this.localizationLanguageValueUrl + '/' + this.selectedLanguage.Id).subscribe(
            res => {
                this.localizationResourcesList = res;

                this.localizationEventEmitter.emit(this.selectedLanguage);
            },
            error => {
                this.alert.error('Error in retrieving Resources info' + error.status);
            }
            , () => { }
        );

        this.httpAbstract.setBaseAddress(tempBaseUrl);
    }


    toggleSelection(langId) {

        this.selectedLanguage = this.languageList.find(p => p.Id === langId);

        this.getResourcesByLanguageId();
    }

    getLocalizedValueDescription(valueSet) {
        if (this.localizationResourcesList.length) {
            let tempLocalizationValue = this.localizationResourcesList.find(p => p.ValueSetDescription.toLowerCase() === valueSet.toString().toLowerCase());
            if (tempLocalizationValue) {
                valueSet = tempLocalizationValue.ValueDescription;
            }
        }

        return valueSet;
    }

    ExecutePageRefresh(pageName, id = null) {
        switch (pageName.toLowerCase()) {
            case 'language':
                return this.getLanguage();
            case 'valueset':
                return this.getValueSet();
            case 'valueset_child':
                return this.getValuesByValueSetId(id);
            default:
                return null;
        }
    }

    ExecuteInsert(obj, pageName) {
        switch (pageName.toLowerCase()) {
            case 'language':
                return this.createLanguage(obj);
            case 'valueset':
                return this.createValueSet(obj);
            case 'valueset_child':
                return this.createValueSetValue(obj);
            default:
                return null;
        }
    }

    ExecuteUpdate(obj, pageName) {
        switch (pageName.toLowerCase()) {
            case 'language':
                return this.updateLanguage(obj);
            case 'valueset':
                return this.updateValueSet(obj);
            case 'valueset_child':
                return this.updateValueSetValue(obj);
            default:
                return null;
        }
    }

    ExecuteDelete(obj, pageName) {
        switch (pageName.toLowerCase()) {
            case 'valueset':
                return this.deleteValueSet(obj);
            case 'valueset_child':
                return this.deleteValueSetValue(obj);
            default:
                return null;
        }
    }

    getLanguage(id = null) {
        if (id) {
            return this.httpAbstract.fetch(this.localizationLanguageUrl + '/' + id);
        } else {
            return this.httpAbstract.fetch(this.localizationLanguageUrl);
        }
    }
    updateLanguage(obj) {
        return this.httpAbstract.updateWithHeader(this.localizationLanguageUrl + '/' + obj.Id
            , JSON.stringify(obj)
            , '', ''    // empty headers
            , this.contentType);
    }
    createLanguage(obj) {
        return this.httpAbstract.insertWithHeader(this.localizationLanguageUrl
            , JSON.stringify(obj)
            , '', ''    // empty headers
            , this.contentType);
    }

    getValueSet(id = null) {
        if (id) {
            return this.httpAbstract.fetch(this.localizationValueSetUrl + '/' + id);
        } else {
            return this.httpAbstract.fetch(this.localizationValueSetUrl);
        }
    }
    updateValueSet(obj) {
        return this.httpAbstract.updateWithHeader(this.localizationValueSetUrl + '/' + obj.Id
            , JSON.stringify(obj)
            , '', ''    // empty headers
            , this.contentType);
    }
    createValueSet(obj) {
        return this.httpAbstract.insertWithHeader(this.localizationValueSetUrl
            , JSON.stringify(obj)
            , '', ''    // empty headers
            , this.contentType);
    }
    deleteValueSet(obj) {
        return this.httpAbstract.remove(
            this.localizationValueSetUrl + '/' + obj.Id
        );
    }

    getValuesByValueSetId(id) {
        return this.httpAbstract.fetch(this.localizationValueSetUrl + '/' + id + '/value');
    }
    updateValueSetValue(obj) {
        return this.httpAbstract.updateWithHeader(this.localizationValueUrl + '/' + obj.Id
            , JSON.stringify(obj)
            , '', ''    // empty headers
            , this.contentType);
    }
    createValueSetValue(obj) {
        return this.httpAbstract.insertWithHeader(this.localizationValueUrl
            , JSON.stringify(obj)
            , '', ''    // empty headers
            , this.contentType);
    }
    deleteValueSetValue(obj) {
        return this.httpAbstract.remove(
            this.localizationValueUrl + '/' + obj.Id
        );
    }
}
