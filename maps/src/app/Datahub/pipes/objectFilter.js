"use strict";
var core_1 = require('@angular/core');
var ObjectFilterPipe = (function () {
    function ObjectFilterPipe() {
    }
    ObjectFilterPipe.prototype.transform = function (items, filter) {
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
            return match;
        });
    };
    ObjectFilterPipe = __decorate([
        core_1.Pipe({ name: 'objectFilter' }), 
        __metadata('design:paramtypes', [])
    ], ObjectFilterPipe);
    return ObjectFilterPipe;
}());
exports.ObjectFilterPipe = ObjectFilterPipe;
//# sourceMappingURL=objectFilter.js.map