"use strict";
var core_1 = require('@angular/core');
var PortfolioFilter = (function () {
    function PortfolioFilter() {
    }
    PortfolioFilter.prototype.transform = function (portfolios, filterValue, number) {
        if (filterValue) {
            if (number) {
                return portfolios.filter(function (x) { return x.PortfolioNumber.includes(filterValue); });
            }
            else {
                return portfolios.filter(function (x) { return x.PortfolioName.includes(filterValue); });
            }
        }
        else {
            return [];
        }
    };
    PortfolioFilter = __decorate([
        core_1.Pipe({ name: 'portfoliosByNumberOrName' }), 
        __metadata('design:paramtypes', [])
    ], PortfolioFilter);
    return PortfolioFilter;
}());
exports.PortfolioFilter = PortfolioFilter;
//# sourceMappingURL=portfolio.pipe.js.map