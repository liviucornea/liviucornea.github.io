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