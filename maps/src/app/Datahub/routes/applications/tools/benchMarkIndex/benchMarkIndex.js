"use strict";
var core_1 = require('@angular/core');
var navigationService_1 = require("../../../../../ReusableServices/navigationService");
var alertService_1 = require("../../../../../ReusableServices/alertService");
var common_1 = require("@angular/common");
var BenchMarkIndex = (function () {
    function BenchMarkIndex(navigationService, alt, location) {
        this.navigationService = navigationService;
        this.alt = alt;
        this.location = location;
        this.childItems = [];
        this.alert = alt;
    }
    BenchMarkIndex.prototype.ngOnInit = function () {
        this.childItems = this.navigationService.getChildMenusForTileView('BenchMarkIndex');
    };
    BenchMarkIndex = __decorate([
        core_1.Component({
            selector: 'benchMarkIndex',
            template: "\n    <tileView [menuItemsList]=\"childItems\"></tileView>\n"
        }), 
        __metadata('design:paramtypes', [navigationService_1.NavigationService, alertService_1.AlertService, common_1.Location])
    ], BenchMarkIndex);
    return BenchMarkIndex;
}());
exports.BenchMarkIndex = BenchMarkIndex;
//# sourceMappingURL=benchMarkIndex.js.map