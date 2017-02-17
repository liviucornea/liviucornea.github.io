"use strict";
var core_1 = require('@angular/core');
var SchematicFilter = (function () {
    function SchematicFilter() {
    }
    SchematicFilter.prototype.transform = function (schematics, filterValue) {
        if (filterValue) {
            return schematics.filter(function (x) {
                return x.id == filterValue || x.description.toUpperCase().indexOf(filterValue.toUpperCase()) > -1;
            });
        }
        else {
            return schematics;
        }
    };
    SchematicFilter = __decorate([
        core_1.Pipe({ name: 'schematicsByIdOrDesc' }), 
        __metadata('design:paramtypes', [])
    ], SchematicFilter);
    return SchematicFilter;
}());
exports.SchematicFilter = SchematicFilter;
//# sourceMappingURL=Schematics.pipe.js.map