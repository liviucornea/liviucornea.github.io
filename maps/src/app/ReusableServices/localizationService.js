"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var httpAbstract_1 = require('./httpAbstract');
var alertService_1 = require('./alertService');
var apiService_1 = require('./apiService');
var SelectedLanguage = (function () {
    function SelectedLanguage(id, desc, code) {
        this.Id = id;
        this.Description = desc;
        this.LangCode = code;
    }
    return SelectedLanguage;
}());
exports.SelectedLanguage = SelectedLanguage;
var LocalizationService = (function () {
    function LocalizationService(httpAbstract, apiService, alert) {
        this.httpAbstract = httpAbstract;
        this.apiService = apiService;
        this.alert = alert;
        this.contentType = 'application/json; charset=utf-8';
        this.languageList = [];
        this.localizationResourcesList = [];
        this.prefixUrl = '/localization';
        this.localizationLanguageUrl = this.prefixUrl + '/language';
        this.localizationLanguageValueUrl = this.prefixUrl + '/languagevalue';
        this.localizationValueSetUrl = this.prefixUrl + '/valueset';
        this.localizationValueUrl = this.prefixUrl + '/value';
        this.localizationEventEmitter = new core_1.EventEmitter();
        this.setDefaultLanguge();
    }
    LocalizationService.prototype.setDefaultLanguge = function () {
        var _this = this;
        this.getLocalizationLanguagesList().subscribe(function (res) {
            _this.languageList = res;
            if (_this.languageList.length > 0) {
                var selectedLang = _this.languageList.find(function (p) { return p.LangCode.toLowerCase().substring(0, 2) === 'en'; });
                if (selectedLang) {
                    _this.selectedLanguage = selectedLang;
                }
            }
        }, function (error) {
            _this.alert.error('Error in retrieving Localization info' + error.status);
        }, function () { });
    };
    LocalizationService.prototype.setLanguageFromAuthGuard = function (res) {
        this.languageList = res;
        if (this.languageList.length > 0) {
            var selectedLang = this.languageList.find(function (p) { return p.LangCode.toLowerCase().substring(0, 2) === 'en'; });
            if (selectedLang) {
                this.selectedLanguage = selectedLang;
            }
        }
    };
    LocalizationService.prototype.setResourcesByLangIdFromAuthGuard = function (res) {
        this.localizationResourcesList = res;
    };
    LocalizationService.prototype.getLocalizationLanguagesList = function () {
        return this.httpAbstract.fetch(this.localizationLanguageUrl);
    };
    LocalizationService.prototype.getResourcesByLanguageId = function () {
        var _this = this;
        var tempBaseUrl = this.httpAbstract.baseUrl;
        if (tempBaseUrl !== this.apiService.base) {
            this.httpAbstract.setBaseAddress(this.apiService.base);
        }
        this.httpAbstract.fetch(this.localizationLanguageValueUrl + '/' + this.selectedLanguage.Id).subscribe(function (res) {
            _this.localizationResourcesList = res;
            _this.localizationEventEmitter.emit(_this.selectedLanguage);
        }, function (error) {
            _this.alert.error('Error in retrieving Resources info' + error.status);
        }, function () { });
        this.httpAbstract.setBaseAddress(tempBaseUrl);
    };
    LocalizationService.prototype.toggleSelection = function (langId) {
        this.selectedLanguage = this.languageList.find(function (p) { return p.Id === langId; });
        this.getResourcesByLanguageId();
    };
    LocalizationService.prototype.getLocalizedValueDescription = function (valueSet) {
        if (this.localizationResourcesList.length) {
            var tempLocalizationValue = this.localizationResourcesList.find(function (p) { return p.ValueSetDescription.toLowerCase() === valueSet.toString().toLowerCase(); });
            if (tempLocalizationValue) {
                valueSet = tempLocalizationValue.ValueDescription;
            }
        }
        return valueSet;
    };
    LocalizationService.prototype.ExecutePageRefresh = function (pageName, id) {
        if (id === void 0) { id = null; }
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
    };
    LocalizationService.prototype.ExecuteInsert = function (obj, pageName) {
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
    };
    LocalizationService.prototype.ExecuteUpdate = function (obj, pageName) {
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
    };
    LocalizationService.prototype.ExecuteDelete = function (obj, pageName) {
        switch (pageName.toLowerCase()) {
            case 'valueset':
                return this.deleteValueSet(obj);
            case 'valueset_child':
                return this.deleteValueSetValue(obj);
            default:
                return null;
        }
    };
    LocalizationService.prototype.getLanguage = function (id) {
        if (id === void 0) { id = null; }
        if (id) {
            return this.httpAbstract.fetch(this.localizationLanguageUrl + '/' + id);
        }
        else {
            return this.httpAbstract.fetch(this.localizationLanguageUrl);
        }
    };
    LocalizationService.prototype.updateLanguage = function (obj) {
        return this.httpAbstract.updateWithHeader(this.localizationLanguageUrl + '/' + obj.Id, JSON.stringify(obj), '', '' // empty headers
        , this.contentType);
    };
    LocalizationService.prototype.createLanguage = function (obj) {
        return this.httpAbstract.insertWithHeader(this.localizationLanguageUrl, JSON.stringify(obj), '', '' // empty headers
        , this.contentType);
    };
    LocalizationService.prototype.getValueSet = function (id) {
        if (id === void 0) { id = null; }
        if (id) {
            return this.httpAbstract.fetch(this.localizationValueSetUrl + '/' + id);
        }
        else {
            return this.httpAbstract.fetch(this.localizationValueSetUrl);
        }
    };
    LocalizationService.prototype.updateValueSet = function (obj) {
        return this.httpAbstract.updateWithHeader(this.localizationValueSetUrl + '/' + obj.Id, JSON.stringify(obj), '', '' // empty headers
        , this.contentType);
    };
    LocalizationService.prototype.createValueSet = function (obj) {
        return this.httpAbstract.insertWithHeader(this.localizationValueSetUrl, JSON.stringify(obj), '', '' // empty headers
        , this.contentType);
    };
    LocalizationService.prototype.deleteValueSet = function (obj) {
        return this.httpAbstract.remove(this.localizationValueSetUrl + '/' + obj.Id);
    };
    LocalizationService.prototype.getValuesByValueSetId = function (id) {
        return this.httpAbstract.fetch(this.localizationValueSetUrl + '/' + id + '/value');
    };
    LocalizationService.prototype.updateValueSetValue = function (obj) {
        return this.httpAbstract.updateWithHeader(this.localizationValueUrl + '/' + obj.Id, JSON.stringify(obj), '', '' // empty headers
        , this.contentType);
    };
    LocalizationService.prototype.createValueSetValue = function (obj) {
        return this.httpAbstract.insertWithHeader(this.localizationValueUrl, JSON.stringify(obj), '', '' // empty headers
        , this.contentType);
    };
    LocalizationService.prototype.deleteValueSetValue = function (obj) {
        return this.httpAbstract.remove(this.localizationValueUrl + '/' + obj.Id);
    };
    LocalizationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [httpAbstract_1.HttpAbstract, apiService_1.ApiService, alertService_1.AlertService])
    ], LocalizationService);
    return LocalizationService;
}());
exports.LocalizationService = LocalizationService;
//# sourceMappingURL=localizationService.js.map