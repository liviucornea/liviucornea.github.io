"use strict";
var core_1 = require('@angular/core');
var BaImageLoaderService = (function () {
    function BaImageLoaderService() {
    }
    BaImageLoaderService.prototype.load = function (src) {
        return new Promise(function (resolve, reject) {
            var img = new Image();
            img.src = src;
            img.onload = function () {
                resolve('Image with src ' + src + ' loaded successfully.');
            };
        });
    };
    BaImageLoaderService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], BaImageLoaderService);
    return BaImageLoaderService;
}());
exports.BaImageLoaderService = BaImageLoaderService;
//# sourceMappingURL=baImageLoader.service.js.map