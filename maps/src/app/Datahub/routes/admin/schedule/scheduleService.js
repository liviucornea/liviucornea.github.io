"use strict";
var core_1 = require("@angular/core");
var httpAbstract_1 = require("../../../../ReusableServices/httpAbstract");
var SchedulesApiService = (function () {
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
    SchedulesApiService.prototype.ExecutePageRefresh = function (pagename) {
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
exports.SchedulesApiService = SchedulesApiService;
//# sourceMappingURL=scheduleService.js.map