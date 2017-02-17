"use strict";
var core_1 = require('@angular/core');
var theme_constants_1 = require('../../theme.constants');
var BaProfilePicturePipe = (function () {
    function BaProfilePicturePipe() {
    }
    BaProfilePicturePipe.prototype.transform = function (input, ext) {
        if (ext === void 0) { ext = 'png'; }
        return theme_constants_1.layoutPaths.images.profile + input + '.' + ext;
    };
    BaProfilePicturePipe = __decorate([
        core_1.Pipe({ name: 'baProfilePicture' }), 
        __metadata('design:paramtypes', [])
    ], BaProfilePicturePipe);
    return BaProfilePicturePipe;
}());
exports.BaProfilePicturePipe = BaProfilePicturePipe;
//# sourceMappingURL=baProfilePicture.pipe.js.map