"use strict";
var core_1 = require('@angular/core');
var navigationService_1 = require("../../../../../ReusableServices/navigationService");
var alertService_1 = require("../../../../../ReusableServices/alertService");
var common_1 = require("@angular/common");
var LateTrades = (function () {
    function LateTrades(navigationService, alt, location) {
        this.navigationService = navigationService;
        this.alt = alt;
        this.location = location;
        this.childItems = [];
        this.alert = alt;
    }
    LateTrades.prototype.ngOnInit = function () {
        this.childItems = this.navigationService.getChildMenusForTileView('LateTrades');
    };
    LateTrades = __decorate([
        core_1.Component({
            selector: 'lateTrades',
            template: "<tileView [menuItemsList]=\"childItems\"></tileView>"
        }), 
        __metadata('design:paramtypes', [navigationService_1.NavigationService, alertService_1.AlertService, common_1.Location])
    ], LateTrades);
    return LateTrades;
}());
exports.LateTrades = LateTrades;
//# sourceMappingURL=lateTrades.js.map