"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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