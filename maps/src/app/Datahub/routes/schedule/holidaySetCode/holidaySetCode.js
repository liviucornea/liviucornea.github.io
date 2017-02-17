System.register(["@angular/core", "../../../../ReusableComponents/displayGrid/displayGrid", "../scheduleService", "../../../pipes/tokenFilter", "../../../../ReusableServices/alertService", "../../../../ReusableServices/componentsConfigService"], function(exports_1, context_1) {
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
    var core_1, displayGrid_1, scheduleService_1, tokenFilter_1, alertService_1, componentsConfigService_1;
    var HolidaySetCode;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (displayGrid_1_1) {
                displayGrid_1 = displayGrid_1_1;
            },
            function (scheduleService_1_1) {
                scheduleService_1 = scheduleService_1_1;
            },
            function (tokenFilter_1_1) {
                tokenFilter_1 = tokenFilter_1_1;
            },
            function (alertService_1_1) {
                alertService_1 = alertService_1_1;
            },
            function (componentsConfigService_1_1) {
                componentsConfigService_1 = componentsConfigService_1_1;
            }],
        execute: function() {
            HolidaySetCode = (function () {
                function HolidaySetCode(schedulesApi, alert, compConfigService) {
                    this.schedulesApi = schedulesApi;
                    this.alert = alert;
                    this.compConfigService = compConfigService;
                    this.newHolidaySetCode = {};
                    this.searchKey = "";
                    this.controlConfig = this.compConfigService.HolidaySetCodeControlConfig;
                }
                HolidaySetCode.prototype.ngAfterViewInit = function () {
                    this.refreshHolidaySetCodes();
                };
                HolidaySetCode.prototype.refreshHolidaySetCodes = function () {
                    this.dataTable.GetParentPageDetails(this.controlConfig, this.schedulesApi, "holidaysetcode");
                };
                __decorate([
                    core_1.ViewChild(displayGrid_1.DisplayGridComponent), 
                    __metadata('design:type', displayGrid_1.DisplayGridComponent)
                ], HolidaySetCode.prototype, "dataTable", void 0);
                HolidaySetCode = __decorate([
                    core_1.Component({
                        selector: 'schedule',
                        template: '<div><displayGrid></displayGrid></div>',
                        directives: [displayGrid_1.DisplayGridComponent],
                        pipes: [tokenFilter_1.TokenFilterPipe],
                        providers: [scheduleService_1.SchedulesApiService]
                    }), 
                    __metadata('design:paramtypes', [scheduleService_1.SchedulesApiService, alertService_1.AlertService, componentsConfigService_1.ComponentsConfigService])
                ], HolidaySetCode);
                return HolidaySetCode;
            }());
            exports_1("HolidaySetCode", HolidaySetCode);
        }
    }
});
//# sourceMappingURL=holidaySetCode.js.map