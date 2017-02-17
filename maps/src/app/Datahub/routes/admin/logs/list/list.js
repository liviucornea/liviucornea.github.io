System.register(['@angular/core', "../../../../../ReusableComponents/displayGrid/displayGrid", "../../../../../ReusableServices/apiService", "./logsControlConfig", "@angular/common", "../../../../../ReusableServices/navigationService"], function(exports_1, context_1) {
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
    var core_1, core_2, displayGrid_1, apiService_1, logsControlConfig_1, common_1, navigationService_1;
    var List;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (displayGrid_1_1) {
                displayGrid_1 = displayGrid_1_1;
            },
            function (apiService_1_1) {
                apiService_1 = apiService_1_1;
            },
            function (logsControlConfig_1_1) {
                logsControlConfig_1 = logsControlConfig_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (navigationService_1_1) {
                navigationService_1 = navigationService_1_1;
            }],
        execute: function() {
            List = class List {
                constructor(_apiService, navService, location) {
                    this._apiService = _apiService;
                    this.navService = navService;
                    this.location = location;
                    this.controlConfig = logsControlConfig_1.LogsControlConfig;
                    navService.setCurrentPage(location.path(false));
                }
                ngAfterViewInit() {
                    this.refreshLogs();
                }
                refreshLogs() {
                    this.dataTable.GetParentPageDetails(this.controlConfig, this._apiService, "logs");
                }
            };
            __decorate([
                core_2.ViewChild(displayGrid_1.DisplayGridComponent), 
                __metadata('design:type', displayGrid_1.DisplayGridComponent)
            ], List.prototype, "dataTable", void 0);
            List = __decorate([
                core_1.Component({
                    selector: 'logs',
                    template: "<div><displayGrid></displayGrid></div>",
                }), 
                __metadata('design:paramtypes', [apiService_1.ApiService, navigationService_1.NavigationService, common_1.Location])
            ], List);
            exports_1("List", List);
        }
    }
});
//# sourceMappingURL=list.js.map