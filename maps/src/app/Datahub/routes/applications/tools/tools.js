"use strict";
var core_1 = require("@angular/core");
var navigationService_1 = require("../../../../ReusableServices/navigationService");
var common_1 = require("@angular/common");
var Tools = (function () {
    function Tools(navService, location) {
        this.navService = navService;
        this.location = location;
        /*this.navService.getChildMenu(['Applications','Tools']);
        navService.setCurrentPage(location.path(false));
        let links= this.navService.getLeftMenuRoutes(['Tools']);
        this.navService.NavigateToPage(links,null);*/
    }
    Tools = __decorate([
        core_1.Component({
            selector: 'tools',
            template: ""
        }), 
        __metadata('design:paramtypes', [navigationService_1.NavigationService, common_1.Location])
    ], Tools);
    return Tools;
}());
exports.Tools = Tools;
//# sourceMappingURL=tools.js.map