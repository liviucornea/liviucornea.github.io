"use strict";
var core_1 = require("@angular/core");
var displayGrid_1 = require("../../../../../ReusableComponents/displayGrid/displayGrid");
var alertService_1 = require("../../../../../ReusableServices/alertService");
var valueSetControlConfig_1 = require("./valueSetControlConfig");
var localizationService_1 = require("../../../../../ReusableServices/localizationService");
var navigationService_1 = require("../../../../../ReusableServices/navigationService");
var common_1 = require("@angular/common");
var ValueSet = (function () {
    function ValueSet(navService, localizationApi, alt, location) {
        this.navService = navService;
        this.localizationApi = localizationApi;
        this.alt = alt;
        this.location = location;
        this.searchKey = "";
        this.newValueSet = {};
        this.controlConfig = valueSetControlConfig_1.ValueSetControlConfig;
        this.alert = alt;
        // navService.setCurrentPage(location.path(false));
    }
    ValueSet.prototype.ngAfterViewInit = function () {
        this.refresh();
    };
    ValueSet.prototype.refresh = function () {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.localizationApi, "valueSet");
    };
    __decorate([
        core_1.ViewChild(displayGrid_1.DisplayGridComponent), 
        __metadata('design:type', displayGrid_1.DisplayGridComponent)
    ], ValueSet.prototype, "dataTable", void 0);
    ValueSet = __decorate([
        core_1.Component({
            selector: 'valueSet',
            template: "<div><displayGrid></displayGrid></div>",
        }), 
        __metadata('design:paramtypes', [navigationService_1.NavigationService, localizationService_1.LocalizationService, alertService_1.AlertService, common_1.Location])
    ], ValueSet);
    return ValueSet;
}());
exports.ValueSet = ValueSet;
//# sourceMappingURL=valueSet.js.map