"use strict";
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