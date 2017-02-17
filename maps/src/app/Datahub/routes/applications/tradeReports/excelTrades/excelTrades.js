"use strict";
var core_1 = require('@angular/core');
var navigationService_1 = require("../../../../../ReusableServices/navigationService");
var alertService_1 = require("../../../../../ReusableServices/alertService");
var common_1 = require("@angular/common");
var ExcelTrades = (function () {
    function ExcelTrades(navigationService, alt, location) {
        this.navigationService = navigationService;
        this.alt = alt;
        this.location = location;
        this.childItems = [];
        this.alert = alt;
    }
    ExcelTrades.prototype.ngOnInit = function () {
        this.childItems = this.navigationService.getChildMenusForTileView('ExcelTrades');
    };
    ExcelTrades = __decorate([
        core_1.Component({
            selector: 'excelTrades',
            template: "<tileView [menuItemsList]=\"childItems\"></tileView>"
        }), 
        __metadata('design:paramtypes', [navigationService_1.NavigationService, alertService_1.AlertService, common_1.Location])
    ], ExcelTrades);
    return ExcelTrades;
}());
exports.ExcelTrades = ExcelTrades;
//# sourceMappingURL=excelTrades.js.map