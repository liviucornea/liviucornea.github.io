"use strict";
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
var DisplayGridFilterService = (function () {
    function DisplayGridFilterService() {
        this.doFilterBy = new Subject_1.Subject();
    }
    DisplayGridFilterService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DisplayGridFilterService);
    return DisplayGridFilterService;
}());
exports.DisplayGridFilterService = DisplayGridFilterService;
//# sourceMappingURL=displayGridFilterService.js.map