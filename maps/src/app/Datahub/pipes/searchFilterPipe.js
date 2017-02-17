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
var core_1 = require("@angular/core");
var _ = require('lodash');
var SearchFilterPipe = (function () {
    function SearchFilterPipe() {
    }
    SearchFilterPipe.prototype.transform = function (data, searchFilters) {
        if (data == null || !data.length) {
            return;
        }
        if (!searchFilters && !searchFilters[0]) {
            return data;
        }
        var filterValue = searchFilters[0];
        var finalArray = [];
        if (filterValue) {
            searchFilters[1].forEach(function (y) {
                var editViewRowDataTable = searchFilters[2].find(function (x) { return x.name == y; });
                var tempValue = y;
                if (editViewRowDataTable && !editViewRowDataTable.htmlControlType.startsWith('text')) {
                    tempValue = editViewRowDataTable.val;
                }
                var tempResult = data.filter(function (x) { return _.toString(x[tempValue]).toLowerCase().includes(filterValue.toLowerCase()); });
                finalArray = _.union(finalArray, tempResult);
            });
        }
        return finalArray;
    };
    SearchFilterPipe = __decorate([
        core_1.Pipe({
            name: 'searchFilter'
        }), 
        __metadata('design:paramtypes', [])
    ], SearchFilterPipe);
    return SearchFilterPipe;
}());
exports.SearchFilterPipe = SearchFilterPipe;
//# sourceMappingURL=searchFilterPipe.js.map