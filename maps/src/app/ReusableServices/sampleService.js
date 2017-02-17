"use strict";
var core_1 = require('@angular/core');
var SampleService = (function () {
    function SampleService() {
    }
    SampleService.prototype.getData = function () {
        return 'call from sample service returned';
    };
    SampleService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SampleService);
    return SampleService;
}());
exports.SampleService = SampleService;
//# sourceMappingURL=sampleService.js.map