"use strict";
var core_1 = require('@angular/core');
var theme_constants_1 = require('../../theme.constants');
var BaAppPicturePipe = (function () {
    function BaAppPicturePipe() {
    }
    BaAppPicturePipe.prototype.transform = function (input) {
        return theme_constants_1.layoutPaths.images.root + input;
    };
    BaAppPicturePipe = __decorate([
        core_1.Pipe({ name: 'baAppPicture' }), 
        __metadata('design:paramtypes', [])
    ], BaAppPicturePipe);
    return BaAppPicturePipe;
}());
exports.BaAppPicturePipe = BaAppPicturePipe;
//# sourceMappingURL=baAppPicture.pipe.js.map