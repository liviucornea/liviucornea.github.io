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
var schematicService_1 = require('../schematicService');
var core_2 = require("@angular/core");
var displayGrid_1 = require("../../../../../ReusableComponents/displayGrid/displayGrid");
var alertService_1 = require("../../../../../ReusableServices/alertService");
var configurationControlConfig_1 = require("./configurationControlConfig");
var common_1 = require("@angular/common");
var navigationService_1 = require("../../../../../ReusableServices/navigationService");
var Configuration = (function () {
    function Configuration(processApi, alert, navService, location) {
        //navService.setCurrentPage(location.path(false));
        this.processApi = processApi;
        this.alert = alert;
        this.navService = navService;
        this.location = location;
        this.newHoliday = {};
        this.searchKey = "";
        this.controlConfig = configurationControlConfig_1.ConfigUnitControlConfig;
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
            providers: [schematicService_1.SchematicApiService]
        }), 
        __metadata('design:paramtypes', [schematicService_1.SchematicApiService, alertService_1.AlertService, navigationService_1.NavigationService, common_1.Location])
    ], Configuration);
    return Configuration;
}());
exports.Configuration = Configuration;
//# sourceMappingURL=configuration.js.map