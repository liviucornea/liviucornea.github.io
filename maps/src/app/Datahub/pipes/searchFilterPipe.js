"use strict";
var core_1 = require("@angular/core");
var MultiSelectSearchFilter = (function () {
    function MultiSelectSearchFilter() {
    }
    MultiSelectSearchFilter.prototype.transform = function (options, args) {
        return options.filter(function (option) {
            return option.Description
                .toLowerCase()
                .indexOf((args || '').toLowerCase()) > -1;
        });
    };
    MultiSelectSearchFilter = __decorate([
        core_1.Pipe({
            name: 'searchFilter'
        }), 
        __metadata('design:paramtypes', [])
    ], MultiSelectSearchFilter);
    return MultiSelectSearchFilter;
}());
exports.MultiSelectSearchFilter = MultiSelectSearchFilter;
//# sourceMappingURL=searchFilterPipe.js.map