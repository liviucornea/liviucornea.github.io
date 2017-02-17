"use strict";
var core_1 = require('@angular/core');
var router_1 = require("@angular/router");
var navigationService_1 = require("../../ReusableServices/navigationService");
var TileView = (function () {
    function TileView(router, navigationService) {
        this.router = router;
        this.navigationService = navigationService;
        this.menuItemsList = [];
    }
    TileView.prototype.gotoChildItem = function (childItem) {
        this.router.navigate(childItem.RouteLink);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TileView.prototype, "menuItemsList", void 0);
    TileView = __decorate([
        core_1.Component({
            selector: 'tileView',
            //templateUrl: 'app/ReusableComponents/tabBuilder/tabBuilder.html',
            template: require('./tileView.html'),
        }), 
        __metadata('design:paramtypes', [router_1.Router, navigationService_1.NavigationService])
    ], TileView);
    return TileView;
}());
exports.TileView = TileView;
//# sourceMappingURL=tileView.js.map