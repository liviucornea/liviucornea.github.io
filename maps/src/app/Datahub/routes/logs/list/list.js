System.register(['@angular/core', '../../../pipes/tokenFilter', "../../../../ReusableComponents/displayGrid/displayGrid", "../../../../ReusableServices/apiService", "../../../../ReusableServices/componentsConfigService"], function(exports_1, context_1) {
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
    var core_1, tokenFilter_1, core_2, displayGrid_1, apiService_1, componentsConfigService_1;
    var List;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (tokenFilter_1_1) {
                tokenFilter_1 = tokenFilter_1_1;
            },
            function (displayGrid_1_1) {
                displayGrid_1 = displayGrid_1_1;
            },
            function (apiService_1_1) {
                apiService_1 = apiService_1_1;
            },
            function (componentsConfigService_1_1) {
                componentsConfigService_1 = componentsConfigService_1_1;
            }],
        execute: function() {
            //import {RouterLink} from "@angular/router";
            List = (function () {
                function List(_apiService, compConfigService) {
                    this._apiService = _apiService;
                    this.compConfigService = compConfigService;
                    this.controlConfig = this.compConfigService.LogsControlConfig.theParent;
                    //private _api: ApiService,
                }
                List.prototype.ngAfterViewInit = function () {
                    this.refreshLogs();
                };
                List.prototype.refreshLogs = function () {
                    this.dataTable.GetParentPageDetails(this.controlConfig, this._apiService, "logs");
                };
                __decorate([
                    core_2.ViewChild(displayGrid_1.DisplayGridComponent), 
                    __metadata('design:type', displayGrid_1.DisplayGridComponent)
                ], List.prototype, "dataTable", void 0);
                List = __decorate([
                    core_1.Component({
                        selector: 'logs',
                        template: "<div><displayGrid></displayGrid></div>",
                        directives: [displayGrid_1.DisplayGridComponent],
                        pipes: [tokenFilter_1.TokenFilterPipe],
                    }), 
                    __metadata('design:paramtypes', [apiService_1.ApiService, componentsConfigService_1.ComponentsConfigService])
                ], List);
                return List;
            }());
            exports_1("List", List);
        }
    }
});
//# sourceMappingURL=list.js.map