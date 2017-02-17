"use strict";
var core_1 = require('@angular/core');
var navigationService_1 = require("../../../../../ReusableServices/navigationService");
var alertService_1 = require("../../../../../ReusableServices/alertService");
var common_1 = require("@angular/common");
var BloombergTrades = (function () {
    function BloombergTrades(navigationService, alt, location) {
        this.navigationService = navigationService;
        this.alt = alt;
        this.location = location;
        this.childItems = [];
        this.alert = alt;
    }
    BloombergTrades.prototype.ngOnInit = function () {
        this.childItems = this.navigationService.getChildMenusForTileView('BloombergTrades');
    };
    BloombergTrades = __decorate([
        core_1.Component({
            selector: 'bloombergTrades',
            template: "<tileView [menuItemsList]=\"childItems\"></tileView>"
        }), 
        __metadata('design:paramtypes', [navigationService_1.NavigationService, alertService_1.AlertService, common_1.Location])
    ], BloombergTrades);
    return BloombergTrades;
}());
exports.BloombergTrades = BloombergTrades;
//# sourceMappingURL=bloombergTrades.js.map