System.register(["@angular/core", "../../../ReusableServices/httpAbstract"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, httpAbstract_1;
    var SchedulesApiService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (httpAbstract_1_1) {
                httpAbstract_1 = httpAbstract_1_1;
            }],
        execute: function() {
            SchedulesApiService = (function () {
                function SchedulesApiService(httpAbstract) {
                    this.httpAbstract = httpAbstract;
                    this.prefixurl = '/schedules';
                    this.contentType = 'application/json; charset=utf-8';
                    this.HolidayCodeBaseUrl = this.prefixurl + '/holidayssetcode';
                    this.HolidayBaseUrl = this.prefixurl + '/holiday';
                    this.ConfigBaseUrl = this.prefixurl + '/config';
                    this.httpAbs = httpAbstract;
                }
                //Start: HolidaySetCode
                SchedulesApiService.prototype.getHolidaySetCodes = function () {
                    return this.httpAbs.fetch(this.HolidayCodeBaseUrl);
                };
                SchedulesApiService.prototype.getHolidaySetCodesById = function (id) {
                    return this.httpAbs.fetch(this.HolidayCodeBaseUrl + '/' + id);
                };
                SchedulesApiService.prototype.getHolidaySetCodesFiltered = function (filter) {
                    return this.httpAbs.fetchWithFilter(this.HolidayCodeBaseUrl + '/paged', filter, this.contentType);
                };
                SchedulesApiService.prototype.createHolidaySetCode = function (obj) {
                    return this.httpAbs.insertWithHeader(this.HolidayCodeBaseUrl, JSON.stringify(obj), '', '' //empty headers
                    , this.contentType);
                };
                SchedulesApiService.prototype.updateHolidaySetCode = function (obj) {
                    return this.httpAbs.updateWithHeader(this.HolidayCodeBaseUrl + '/' + obj.Id, JSON.stringify(obj), '', '' //empty headers
                    , this.contentType);
                };
                SchedulesApiService.prototype.deleteHolidaySetCode = function (obj) {
                    return this.httpAbs.remove(this.HolidayCodeBaseUrl + '/' + obj.Id);
                };
                //End: HolidaySetCode
                //Start:Holiday
                SchedulesApiService.prototype.getHolidays = function () {
                    return this.httpAbs.fetch(this.HolidayBaseUrl);
                };
                SchedulesApiService.prototype.getHolidaysById = function (id) {
                    return this.httpAbs.fetch(this.HolidayBaseUrl + '/' + id);
                };
                SchedulesApiService.prototype.getHolidaysFiltered = function (filter) {
                    return this.httpAbs.fetchWithFilter(this.HolidayBaseUrl + '/paged', filter, this.contentType);
                };
                SchedulesApiService.prototype.createHoliday = function (obj) {
                    return this.httpAbs.insertWithHeader(this.HolidayBaseUrl, JSON.stringify(obj), '', '' //empty headers
                    , this.contentType);
                };
                SchedulesApiService.prototype.updateHoliday = function (obj) {
                    return this.httpAbs.updateWithHeader(this.HolidayBaseUrl + '/' + obj.Id, JSON.stringify(obj), '', '' //empty headers
                    , this.contentType);
                };
                SchedulesApiService.prototype.deleteHoliday = function (obj) {
                    return this.httpAbs.remove(this.HolidayBaseUrl + '/' + obj.Id);
                };
                //End:Holiday
                //Start:Config
                SchedulesApiService.prototype.getConfigs = function () {
                    return this.httpAbs.fetch(this.ConfigBaseUrl);
                };
                SchedulesApiService.prototype.getConfigsById = function (id) {
                    return this.httpAbs.fetch(this.ConfigBaseUrl + '/' + id);
                };
                SchedulesApiService.prototype.getConfigsFiltered = function (filter) {
                    return this.httpAbs.fetchWithFilter(this.ConfigBaseUrl + '/paged', filter, this.contentType);
                };
                SchedulesApiService.prototype.createConfig = function (obj) {
                    return this.httpAbs.insertWithHeader(this.ConfigBaseUrl, JSON.stringify(obj), '', '' //empty headers
                    , this.contentType);
                };
                SchedulesApiService.prototype.updateConfig = function (obj) {
                    return this.httpAbs.updateWithHeader(this.ConfigBaseUrl + '/' + obj.Id, JSON.stringify(obj), '', '' //empty headers
                    , this.contentType);
                };
                SchedulesApiService.prototype.deleteConfig = function (obj) {
                    return this.httpAbs.remove(this.HolidayBaseUrl + '/' + obj.Id);
                };
                SchedulesApiService.prototype.ExecuteUpdate = function (obj, pagename) {
                    switch (pagename.toLowerCase()) {
                        case "holidaysetcode":
                            return this.updateHolidaySetCode(obj);
                        // break;
                        case "holiday":
                            return this.updateHoliday(obj);
                        //break;
                        case "config":
                            return this.updateConfig(obj);
                    }
                };
                SchedulesApiService.prototype.ExecuteInsert = function (obj, pagename) {
                    switch (pagename.toLowerCase()) {
                        case "holidaysetcode":
                            return this.createHolidaySetCode(obj);
                        // break;
                        case "holiday":
                            return this.createHoliday(obj);
                        //break;
                        case "config":
                            return this.createConfig(obj);
                    }
                };
                SchedulesApiService.prototype.ExecuteDelete = function (obj, pagename) {
                    switch (pagename.toLowerCase()) {
                        case "holidaysetcode":
                            return this.deleteHolidaySetCode(obj);
                        // break;
                        case "holiday":
                            return this.deleteHoliday(obj);
                        //break;
                        case "config":
                            return this.deleteConfig(obj);
                    }
                };
                SchedulesApiService.prototype.ExecutePageRefersh = function (pagename) {
                    switch (pagename.toLowerCase()) {
                        case "holidaysetcode":
                            return this.getHolidaySetCodes();
                        // break;
                        case "holiday":
                            return this.getHolidays();
                        //break;
                        case "config":
                            return this.getConfigs();
                    }
                };
                SchedulesApiService.prototype.ExecutePageFilter = function (pagename, filterObject) {
                    switch (pagename.toLowerCase()) {
                        case "holidaysetcode":
                            return this.getHolidaySetCodesFiltered(filterObject);
                        // break;
                        case "holiday":
                            return this.getHolidaysFiltered(filterObject);
                        //break;
                        case "config":
                            return this.getConfigsFiltered(filterObject);
                    }
                };
                SchedulesApiService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [httpAbstract_1.HttpAbstract])
                ], SchedulesApiService);
                return SchedulesApiService;
            }());
            exports_1("SchedulesApiService", SchedulesApiService);
        }
    }
});
//# sourceMappingURL=scheduleService.js.map