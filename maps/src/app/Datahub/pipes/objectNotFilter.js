"use strict";
var core_1 = require('@angular/core');
var ObjectNotFilterPipe = (function () {
    function ObjectNotFilterPipe() {
    }
    ObjectNotFilterPipe.prototype.transform = function (items, filter) {
        // null check
        if (items == null || filter[0] == null)
            return items;
        var filterObj = filter[0];
        // perform the filter
        return items.filter(function (item) {
            var match = true;
            for (var prop in filterObj) {
                match = match &&
                    item.hasOwnProperty(prop) &&
                    item[prop] == filterObj[prop];
            }
            return !match;
        });
    };
    ObjectNotFilterPipe = __decorate([
        core_1.Pipe({ name: 'objectNotFilter' }), 
        __metadata('design:paramtypes', [])
    ], ObjectNotFilterPipe);
    return ObjectNotFilterPipe;
}());
exports.ObjectNotFilterPipe = ObjectNotFilterPipe;
//# sourceMappingURL=objectNotFilter.js.map