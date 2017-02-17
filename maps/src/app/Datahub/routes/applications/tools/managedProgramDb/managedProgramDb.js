"use strict";
var core_1 = require('@angular/core');
var navigationService_1 = require("../../../../../ReusableServices/navigationService");
var alertService_1 = require("../../../../../ReusableServices/alertService");
var common_1 = require("@angular/common");
var ManagedProgramDb = (function () {
    function ManagedProgramDb(navigationService, alt, location) {
        this.navigationService = navigationService;
        this.alt = alt;
        this.location = location;
        this.childItems = [];
        this.alert = alt;
        // navigationService.setCurrentPage(location.path(false));
    }
    ManagedProgramDb.prototype.ngOnInit = function () {
        this.childItems = this.navigationService.getChildMenusForTileView('ManagedProgramDb');
    };
    ManagedProgramDb = __decorate([
        core_1.Component({
            selector: 'managedProgramDb',
            template: "\n    <tileView [menuItemsList]=\"childItems\"></tileView>\n"
        }), 
        __metadata('design:paramtypes', [navigationService_1.NavigationService, alertService_1.AlertService, common_1.Location])
    ], ManagedProgramDb);
    return ManagedProgramDb;
}());
exports.ManagedProgramDb = ManagedProgramDb;
//# sourceMappingURL=managedProgramDb.js.map