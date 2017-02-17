System.register(["@angular/core", "../../../../ReusableServices/httpAbstract", "../../../../ReusableServices/appSettingsService"], function(exports_1, context_1) {
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
    var core_1, httpAbstract_1, appSettingsService_1;
    var ToolsApiService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (httpAbstract_1_1) {
                httpAbstract_1 = httpAbstract_1_1;
            },
            function (appSettingsService_1_1) {
                appSettingsService_1 = appSettingsService_1_1;
            }],
        execute: function() {
            ToolsApiService = class ToolsApiService {
                constructor(abstractHttp, appSettingsService) {
                    this.abstractHttp = abstractHttp;
                    this.appSettingsService = appSettingsService;
                    this.prefixUrl = '/reports';
                    this.contentType = 'application/json; charset=utf-8';
                    this.filterObject = "";
                    this.base = this.appSettingsService.appSettings.apiSettings.apiURL_BASE + '/api/centraldb/ae';
                    this.httpAbs = abstractHttp;
                    this.httpAbs.setBaseAddress(this.base);
                }
                FilterObject(obj) {
                    this.filterObject = obj;
                }
                ExecutePageRefresh(pageName) {
                    switch (pageName) {
                        case "BenchMarkIndex":
                            return this.getBenchMarkIndexFiltered(this.filterObject);
                    }
                }
                //Start: BenchMarkIndex
                getBenchMarkIndexFiltered(filter) {
                    return this.httpAbs.fetchWithFilter(this.prefixUrl + '/GetArrayFromQuery', filter, this.contentType);
                }
            };
            ToolsApiService = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [httpAbstract_1.HttpAbstract, appSettingsService_1.AppSettingsService])
            ], ToolsApiService);
            exports_1("ToolsApiService", ToolsApiService);
        }
    }
});
//# sourceMappingURL=toolsService.js.map