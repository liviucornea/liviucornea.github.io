"use strict";
var core_1 = require('@angular/core');
var navigationService_1 = require("../../../../../ReusableServices/navigationService");
var alertService_1 = require("../../../../../ReusableServices/alertService");
var common_1 = require("@angular/common");
var Settlement = (function () {
    function Settlement(navigationService, alt, location) {
        this.navigationService = navigationService;
        this.alt = alt;
        this.location = location;
        this.childItems = [];
        this.alert = alt;
    }
    Settlement.prototype.ngOnInit = function () {
        this.childItems = this.navigationService.getChildMenusForTileView('Settlement');
    };
    Settlement = __decorate([
        core_1.Component({
            selector: 'settlement',
            template: "<tileView [menuItemsList]=\"childItems\"></tileView>"
        }), 
        __metadata('design:paramtypes', [navigationService_1.NavigationService, alertService_1.AlertService, common_1.Location])
    ], Settlement);
    return Settlement;
}());
exports.Settlement = Settlement;
//# sourceMappingURL=settlement.js.map