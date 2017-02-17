System.register(['@angular/core', '../schematicService', '../../../pipes/tokenFilter', "../../../../ReusableComponents/displayGrid/displayGrid", "../../../../ReusableServices/alertService", "../../../../ReusableServices/componentsConfigService"], function(exports_1, context_1) {
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
    var core_1, schematicService_1, tokenFilter_1, core_2, displayGrid_1, alertService_1, componentsConfigService_1;
    var Configuration;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (schematicService_1_1) {
                schematicService_1 = schematicService_1_1;
            },
            function (tokenFilter_1_1) {
                tokenFilter_1 = tokenFilter_1_1;
            },
            function (displayGrid_1_1) {
                displayGrid_1 = displayGrid_1_1;
            },
            function (alertService_1_1) {
                alertService_1 = alertService_1_1;
            },
            function (componentsConfigService_1_1) {
                componentsConfigService_1 = componentsConfigService_1_1;
            }],
        execute: function() {
            Configuration = (function () {
                function Configuration(processApi, alert, compConfigService) {
                    this.processApi = processApi;
                    this.alert = alert;
                    this.compConfigService = compConfigService;
                    this.newHoliday = {};
                    this.searchKey = "";
                    this.controlConfig = this.compConfigService.ConfigunitControlConfig;
                }
                Configuration.prototype.ngAfterViewInit = function () {
                    this.refreshConfigurationUnits();
                };
                Configuration.prototype.refreshConfigurationUnits = function () {
                    this.dataTable.GetParentPageDetails(this.controlConfig, this.processApi, "unit");
                };
                __decorate([
                    core_2.ViewChild(displayGrid_1.DisplayGridComponent), 
                    __metadata('design:type', displayGrid_1.DisplayGridComponent)
                ], Configuration.prototype, "dataTable", void 0);
                Configuration = __decorate([
                    core_1.Component({
                        selector: 'process',
                        template: "<div><displayGrid></displayGrid></div>",
                        directives: [displayGrid_1.DisplayGridComponent],
                        pipes: [tokenFilter_1.TokenFilterPipe],
                        providers: [schematicService_1.SchematicApiService]
                    }), 
                    __metadata('design:paramtypes', [schematicService_1.SchematicApiService, alertService_1.AlertService, componentsConfigService_1.ComponentsConfigService])
                ], Configuration);
                return Configuration;
            }());
            exports_1("Configuration", Configuration);
        }
    }
});
//# sourceMappingURL=configuration.js.map