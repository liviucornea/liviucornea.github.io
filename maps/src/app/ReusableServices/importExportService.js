"use strict";
var core_1 = require('@angular/core');
var httpAbstract_1 = require("./httpAbstract");
var appSettingsService_1 = require("./appSettingsService");
var ImportExportService = (function () {
    function ImportExportService(abstractHttp, appSettingsService) {
        this.abstractHttp = abstractHttp;
        this.appSettingsService = appSettingsService;
        this.contentType = 'application/json; charset=utf-8';
        this.base = this.appSettingsService.appSettings.apiSettings.apiURL_BASE + '/api/tdam/datahub/ae';
        this.importTextFileUrl = '/import/textfile';
        this.httpAbs = abstractHttp;
        this.httpAbs.setBaseAddress(this.base);
    }
    ImportExportService.prototype.setApplicationsBaseUrl = function () {
        this.httpAbs = this.abstractHttp;
        this.httpAbs.setBaseAddress(this.base);
    };
    ImportExportService.prototype.importTextFile = function (dataKey, id) {
        return this.httpAbs.fetchWithFilter(this.importTextFileUrl + '/' + dataKey + '/' + id, '', this.contentType);
    };
    ImportExportService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [httpAbstract_1.HttpAbstract, appSettingsService_1.AppSettingsService])
    ], ImportExportService);
    return ImportExportService;
}());
exports.ImportExportService = ImportExportService;
//# sourceMappingURL=importExportService.js.map