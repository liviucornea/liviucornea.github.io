"use strict";
var core_1 = require("@angular/core");
var navigationService_1 = require("../../../../ReusableServices/navigationService");
var common_1 = require("@angular/common");
var TradeReports = (function () {
    function TradeReports(navService, location) {
        this.navService = navService;
        this.location = location;
    }
    TradeReports = __decorate([
        core_1.Component({
            selector: 'tradeReports',
            template: ""
        }), 
        __metadata('design:paramtypes', [navigationService_1.NavigationService, common_1.Location])
    ], TradeReports);
    return TradeReports;
}());
exports.TradeReports = TradeReports;
//# sourceMappingURL=tradeReports.js.map