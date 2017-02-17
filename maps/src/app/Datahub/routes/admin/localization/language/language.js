"use strict";
var core_1 = require("@angular/core");
var displayGrid_1 = require("../../../../../ReusableComponents/displayGrid/displayGrid");
var alertService_1 = require("../../../../../ReusableServices/alertService");
var languageControlConfig_1 = require("./languageControlConfig");
var localizationService_1 = require("../../../../../ReusableServices/localizationService");
var navigationService_1 = require("../../../../../ReusableServices/navigationService");
var common_1 = require("@angular/common");
var Language = (function () {
    function Language(navService, localizationApi, alt, location) {
        this.navService = navService;
        this.localizationApi = localizationApi;
        this.alt = alt;
        this.location = location;
        this.searchKey = "";
        this.controlConfig = languageControlConfig_1.LanguageControlConfig;
        this.alert = alt;
        // navService.setCurrentPage(location.path(false));
    }
    Language.prototype.ngAfterViewInit = function () {
        this.refresh();
    };
    Language.prototype.refresh = function () {
        this.dataTable.GetParentPageDetails(this.controlConfig, this.localizationApi, "language");
    };
    __decorate([
        core_1.ViewChild(displayGrid_1.DisplayGridComponent), 
        __metadata('design:type', displayGrid_1.DisplayGridComponent)
    ], Language.prototype, "dataTable", void 0);
    Language = __decorate([
        core_1.Component({
            selector: 'language',
            template: "<div><displayGrid></displayGrid></div>",
        }), 
        __metadata('design:paramtypes', [navigationService_1.NavigationService, localizationService_1.LocalizationService, alertService_1.AlertService, common_1.Location])
    ], Language);
    return Language;
}());
exports.Language = Language;
//# sourceMappingURL=language.js.map