"use strict";
var core_1 = require('@angular/core');
var navigationService_1 = require("../../../../../ReusableServices/navigationService");
var alertService_1 = require("../../../../../ReusableServices/alertService");
var common_1 = require("@angular/common");
var GlobalLink = (function () {
    function GlobalLink(navigationService, alt, location) {
        this.navigationService = navigationService;
        this.alt = alt;
        this.location = location;
        this.childItems = [];
        this.alert = alt;
    }
    GlobalLink.prototype.ngOnInit = function () {
        this.childItems = this.navigationService.getChildMenusForTileView('GlobalLink');
    };
    GlobalLink = __decorate([
        core_1.Component({
            selector: 'globalLink',
            template: "<tileView [menuItemsList]=\"childItems\"></tileView>"
        }), 
        __metadata('design:paramtypes', [navigationService_1.NavigationService, alertService_1.AlertService, common_1.Location])
    ], GlobalLink);
    return GlobalLink;
}());
exports.GlobalLink = GlobalLink;
//# sourceMappingURL=globalLink.js.map